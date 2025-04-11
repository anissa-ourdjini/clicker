    let score = 0;
    let pointsPerClick = 1;

    const scoreEl = document.getElementById('score');
    const moshi = document.getElementById('moshi');
    const floatingContainer = document.getElementById('floating-container');

    let currentSkin = 'default';
    const skins = {
      default: {
        normal: './asset/images/moshi_normal.png',
        squeezed: './asset/images/moshi_squeezed.png'
       

      },
      rose: {
        normal: './asset/images/moshi_rose_normal.png',
        squeezed: './asset/images/moshi_rose_squeezed.png'
      }
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

    function buyUpgrade(increase, cost) {
      if (score >= cost) {
        pointsPerClick += increase;
        score -= cost;
        scoreEl.textContent = `${score} Points`;
      } else {
        alert("Not enough points!");
      }
    }

    function buySkin(skinName, cost) {
      if (score >= cost) {
        currentSkin = skinName;
        score -= cost;
        scoreEl.textContent = `${score} Points`;
        moshi.src = skins[currentSkin].normal;
      } else {
        alert("Not enough points to buy this skin!");
      }
    }
  
    
    