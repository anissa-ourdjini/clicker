let score = 0;
let pointsPerClick = 1;

const scoreEl = document.getElementById('score');
const moshi = document.getElementById('moshi');
const floatingContainer = document.getElementById('floating-container');

const normalImg = "./asset/images/moshi_normal.png";
const squeezedImg = "./asset/images/moshi_squeezed.png";
const coloredImg = "./asset/images/moshi_colored.png";
let isColored = false;

moshi.addEventListener('click', (e) => {
  score += pointsPerClick;
  scoreEl.textContent = `${score} Points`;

  if (score >= 60 && !isColored) {
    isColored = true;
    moshi.src = coloredImg;
  } else {
    moshi.src = squeezedImg;
  }

  const floatText = document.createElement('div');
  floatText.className = 'floating-text';
  floatText.style.left = `${e.clientX - 10}px`;
  floatText.style.top = `${e.clientY - 30}px`;
  floatText.textContent = `+${pointsPerClick}`;
  document.body.appendChild(floatText);

  setTimeout(() => {
    document.body.removeChild(floatText);
    if (isColored) {
      moshi.src = coloredImg;
    } else {
      moshi.src = normalImg;
    }
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
