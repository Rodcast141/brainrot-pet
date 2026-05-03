import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../../lib/gameStore.jsx';
import { CRYSTAL_TYPES } from '../../lib/gameConstants';

function pickCrystalType() {
  const r = Math.random();
  let cumulative = 0;
  for (const ct of CRYSTAL_TYPES) {
    cumulative += ct.rarity;
    if (r <= cumulative) return ct;
  }
  return CRYSTAL_TYPES[0];
}

function createCrystalGeometry() {
  const height = 0.6 + Math.random() * 0.8;
  const radius = 0.1 + Math.random() * 0.15;
  const segments = 5 + Math.floor(Math.random() * 3);
  return new THREE.ConeGeometry(radius, height, segments);
}

function createCrystalCluster(scene, position, crystalObjects) {
  const group = new THREE.Group();
  group.position.copy(position);
  const numCrystals = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < numCrystals; i++) {
    const type = pickCrystalType();
    const geo = createCrystalGeometry();
    const mat = new THREE.MeshPhongMaterial({
      color: type.color,
      emissive: type.emissive,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85,
      shininess: 100,
      specular: 0xffffff,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - 0.5) * 0.5, Math.random() * 0.3, (Math.random() - 0.5) * 0.5);
    mesh.rotation.set((Math.random() - 0.5) * 0.5, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.5);
    mesh.userData = { type: type.name, value: type.value, isCrystal: true };
    const light = new THREE.PointLight(type.color, 0.3, 3);
    light.position.copy(mesh.position);
    group.add(light);
    group.add(mesh);
    crystalObjects.push(mesh);
  }
  scene.add(group);
  return group;
}

function createCaveEnvironment(scene) {
  const groundGeo = new THREE.PlaneGeometry(60, 60, 30, 30);
  const posAttr = groundGeo.getAttribute('position');
  for (let i = 0; i < posAttr.count; i++) posAttr.setZ(i, (Math.random() - 0.5) * 0.8);
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeo, new THREE.MeshPhongMaterial({ color: 0x1a1a2e, specular: 0x111122, shininess: 5 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const ceilGeo = new THREE.PlaneGeometry(60, 60, 20, 20);
  const ceilPos = ceilGeo.getAttribute('position');
  for (let i = 0; i < ceilPos.count; i++) ceilPos.setZ(i, (Math.random() - 0.5) * 1.5);
  ceilGeo.computeVertexNormals();
  const ceiling = new THREE.Mesh(ceilGeo, new THREE.MeshPhongMaterial({ color: 0x0d0d1a, side: THREE.DoubleSide }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 6;
  scene.add(ceiling);

  const rockMat = new THREE.MeshPhongMaterial({ color: 0x16213e, specular: 0x0a0a20, shininess: 3 });
  for (let i = 0; i < 40; i++) {
    const h = 1 + Math.random() * 3;
    const r = 0.3 + Math.random() * 0.6;
    const rock = new THREE.Mesh(new THREE.ConeGeometry(r, h, 5 + Math.floor(Math.random() * 4)), rockMat);
    const angle = Math.random() * Math.PI * 2;
    const dist = 5 + Math.random() * 22;
    rock.position.set(Math.cos(angle) * dist, h / 2, Math.sin(angle) * dist);
    scene.add(rock);
    if (Math.random() > 0.5) {
      const s = rock.clone();
      s.position.y = 6 - h / 2;
      s.rotation.z = Math.PI;
      scene.add(s);
    }
  }
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const dist = 25 + Math.random() * 5;
    const h = 4 + Math.random() * 3;
    const wall = new THREE.Mesh(new THREE.BoxGeometry(2 + Math.random() * 3, h, 2 + Math.random() * 2), rockMat);
    wall.position.set(Math.cos(angle) * dist, h / 2, Math.sin(angle) * dist);
    wall.lookAt(0, h / 2, 0);
    scene.add(wall);
  }
}

function createParticles(scene) {
  const count = 200;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = Math.random() * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    const c = new THREE.Color().setHSL(0.7 + Math.random() * 0.3, 0.6, 0.6);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);
  return particles;
}

function createMiningBurst(scene, position, color) {
  const count = 15;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const velocities = [];
  for (let i = 0; i < count; i++) {
    pos[i * 3] = position.x; pos[i * 3 + 1] = position.y; pos[i * 3 + 2] = position.z;
    velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.15, Math.random() * 0.15, (Math.random() - 0.5) * 0.15));
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color, size: 0.1, transparent: true, opacity: 1, blending: THREE.AdditiveBlending });
  const burst = new THREE.Points(geo, mat);
  scene.add(burst);
  let frame = 0;
  const anim = () => {
    frame++;
    const p = burst.geometry.getAttribute('position');
    for (let i = 0; i < count; i++) {
      p.setX(i, p.getX(i) + velocities[i].x);
      p.setY(i, p.getY(i) + velocities[i].y);
      p.setZ(i, p.getZ(i) + velocities[i].z);
      velocities[i].y -= 0.003;
    }
    p.needsUpdate = true;
    mat.opacity = 1 - frame / 40;
    if (frame < 40) requestAnimationFrame(anim);
    else { scene.remove(burst); geo.dispose(); mat.dispose(); }
  };
  anim();
}

export default function CrystalScene({ spawnSignal, worldSignal }) {
  const containerRef = useRef(null);
  const keysRef = useRef({});
  const sceneDataRef = useRef({});
  const { mineCrystal, activePotions, equippedPickaxe, combo, turnMode } = useGameStore();
