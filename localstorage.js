document.addEventListener("DOMContentLoaded", () => {
    let score = parseInt(localStorage.getItem('score')) || 0;
    let pointsPerClick = parseInt(localStorage.getItem('pointsPerClick')) || 1;
    let currentSkin = localStorage.getItem('currentSkin') || 'default';

    const scoreEl = document.getElementById('score');
    const moshi = document.getElementById('moshi');
    const floatingContainer = document.getElementById('floating-container');
    const musicPlayer = document.getElementById('bg-music');

    const skins = {
        default: { normal: './assets/skins/moshi_normal.png', squeezed: './assets/skins/moshi_squeezed.png' },
        rose: { normal: './assets/skins/moshi_rose_normal.png', squeezed: './assets/skins/moshi_rose_squeezed.png' },
        rainbow: { normal: './assets/skins/moshi_rainbow_normal.png', squeezed: './assets/skins/moshi_rainbow_squeezed.png' },
        rocker: { normal: './assets/skins/moshi_rocker_normal.png', squeezed: './assets/skins/moshi_rocker_squeezed.png' },
        wizard: { normal: './assets/skins/moshi_potter_normal.png', squeezed: './assets/skins/moshi_potter_squeezed.png' },
        anissa: { normal: './assets/skins/moshi_anissa_normal.png', squeezed: './assets/skins/moshi_anissa_squeezed.png' },
        gold: { normal: './assets/skins/moshi_gold_normal.png', squeezed: './assets/skins/moshi_gold_squeezed.png' }
    };

    // Update UI with initial values
    scoreEl.textContent = `${score} Points`;
    moshi.src = skins[currentSkin].normal;

    moshi.addEventListener('click', (e) => {
        score += pointsPerClick;
        scoreEl.textContent = `${score} Points`;
        localStorage.setItem('score', score); // Save score to localStorage

        moshi.src = skins[currentSkin].squeezed;

        const floatText = document.createElement('div');
        floatText.className = 'floating-text';
        floatText.style.left = `${e.clientX - 10}px`;
        floatText.style.top = `${e.clientY - 30}px`;
        floatText.textContent = `+${pointsPerClick}`;
        document.body.appendChild(floatText);

        setTimeout(() => {
            document.body.removeChild(floatText);
            moshi.src = skins[currentSkin].normal;
        }, 300);
    });

    window.buyUpgrade = function(increase, cost) {
        if (score >= cost) {
            pointsPerClick += increase;
            score -= cost;
            scoreEl.textContent = `${score} Points`;
            localStorage.setItem('score', score); // Save score to localStorage
            localStorage.setItem('pointsPerClick', pointsPerClick); // Save pointsPerClick to localStorage
        } else {
            alert("Not enough points!");
        }
    };

    window.buySkin = function(skinName, cost) {
        if (score >= cost) {
            currentSkin = skinName;
            score -= cost;
            scoreEl.textContent = `${score} Points`;
            moshi.src = skins[currentSkin].normal;
            localStorage.setItem('score', score); // Save score to localStorage
            localStorage.setItem('currentSkin', currentSkin); // Save currentSkin to localStorage
        } else {
            alert("Not enough points to buy this skin!");
        }
    };

    window.changeMusic = function(track) {
        musicPlayer.src = track;
        musicPlayer.play();
    };
});