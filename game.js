window.addEventListener('load', () => {
    const status = document.getElementById('status-text');
    const menu = document.getElementById('menu-actions');
    const devUnlockStatus = document.getElementById('dev-unlock-status');

    const requiredRebirths = 100;
    const rebirths = Number(localStorage.getItem('rebirths') || 0);
    const hasDevUnlock = rebirths >= requiredRebirths;

    if (hasDevUnlock) {
        devUnlockStatus.innerText = `Unlocked! (${rebirths}/${requiredRebirths} rebirths)`;
        devUnlockStatus.style.color = '#00ff00';
    } else {
        const remaining = requiredRebirths - rebirths;
        devUnlockStatus.innerText = `Locked - ${remaining} more rebirths needed (${rebirths}/${requiredRebirths}).`;
        devUnlockStatus.style.color = '#ff6b6b';
    }

    // Fake connection sequence to satisfy the "Brainrot" feel
    setTimeout(() => {
        status.innerText = 'BYPASSING JUNGLE HUB...';
    }, 1000);
    setTimeout(() => {
        status.innerText = 'DOWNLOADING PET DATA...';
    }, 2500);
    setTimeout(() => {
        status.innerText = 'CONNECTION ESTABLISHED';
        status.style.color = '#00ff00';
        menu.style.display = 'block';
    }, 4000);

    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('loading-screen').style.display = 'none';
        // Logic to start VR scene
    });
});

// Basic mining tool logic
AFRAME.registerComponent('pickaxe-tool', {
    init: function () {
        this.el.addEventListener('triggerdown', () => {
            // This is where we'll add the "Thwack" sound and crystal breaking
            console.log('Mined 1 Crystal!');
        });
    }
});
