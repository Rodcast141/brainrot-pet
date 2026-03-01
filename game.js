window.addEventListener('load', () => {
    const status = document.getElementById('status-text');
    const menu = document.getElementById('menu-actions');

    // Fake connection sequence to satisfy the "Brainrot" feel
    setTimeout(() => { status.innerText = "BYPASSING JUNGLE HUB..."; }, 1000);
    setTimeout(() => { status.innerText = "DOWNLOADING PET DATA..."; }, 2500);
    setTimeout(() => { 
        status.innerText = "CONNECTION ESTABLISHED"; 
        status.style.color = "#00ff00";
        menu.style.display = "block";
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
            console.log("Mined 1 Crystal!");
        });
    }
});
