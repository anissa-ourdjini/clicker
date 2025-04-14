document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let pointsPerClick = 1;
  
    const scoreEl = document.getElementById('score');
    const moshi = document.getElementById('moshi');
    const floatingContainer = document.getElementById('floating-container');
    const musicPlayer = document.getElementById('bg-music');
  
    let currentSkin = 'default';
  
    const skins = {
      default: { normal: './assets/skins/moshi_normal.png', squeezed: './assets/skins/moshi_squeezed.png' },
      rose: { normal: './assets/skins/moshi_rose_normal.png', squeezed: './assets/skins/moshi_rose_squeezed.png' },
      rainbow: { normal: './assets/skins/moshi_rainbow_normal.png', squeezed: './assets/skins/moshi_rainbow_squeezed.png' },
      rocker: { normal: './assets/skins/moshi_rocker_normal.png', squeezed: './assets/skins/moshi_rocker_squeezed.png' },
      wizard: { normal: './assets/skins/moshi_potter_normal.png', squeezed: './assets/skins/moshi_potter_squeezed.png' },
      anissa: { normal: './assets/skins/moshi_anissa_normal.png', squeezed: './assets/skins/moshi_anissa_squeezed.png' },
      gold: { normal: './assets/skins/moshi_gold_normal.png', squeezed: './assets/skins/moshi_gold_squeezed.png' }
    };
  
    moshi.addEventListener('click', (e) => {
      score += pointsPerClick;
      scoreEl.textContent = `${score} Points`;
  
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
      } else {
        alert("Not enough points to buy this skin!");
      }
    };
  
    window.changeMusic = function(track) {
      musicPlayer.src = track;
      musicPlayer.play();
    };
  });

  
  