let currentQuestion = 0;
const score = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

// 按鈕等比縮放
function resizeButton() {
  const cover = document.getElementById('cover');
  const btn = document.getElementById('startBtn');

  const btnOriginalWidth = 3347;
  const btnOriginalHeight = 1321;
  const btnRatio = btnOriginalHeight / btnOriginalWidth;
  const bgOriginalWidth = 4500;

  const btnWidth = cover.clientWidth * (btnOriginalWidth / bgOriginalWidth);
  const btnHeight = btnWidth * btnRatio;

  btn.style.width = btnWidth + 'px';
  btn.style.height = btnHeight + 'px';
  btn.style.left = '50%';
  btn.style.top = '70%';
  btn.style.transform = 'translate(-50%, -50%)';
}

// 結果圖等比縮放
function resizeResultImage() {
  const resultImage = document.getElementById('resultImage');
  const cover = document.getElementById('cover');

  const originalWidth = 1081;
  const originalHeight = 1980;
  const ratio = originalHeight / originalWidth;

  const newWidth = cover.clientWidth;
  const newHeight = newWidth * ratio;

  resultImage.style.width = newWidth + 'px';
  resultImage.style.height = newHeight + 'px';
}

function startTest() {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('questionBox').style.display = 'block';
  showQuestion(currentQuestion);
}

// 顯示題目與選項
function showQuestion(index) {
  const q = questions[index];
  document.getElementById('cover').style.backgroundImage = `url('${q.bgImg}')`;
  document.getElementById('questionImage').src = q.questionImg;

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const img = document.createElement('img');
    img.src = opt.img;
    img.alt = `選項${i + 1}`;
    img.className = 'option-img';
    img.onclick = () => {
      for (const key in opt.score) {
        if (score.hasOwnProperty(key)) {
          score[key] += opt.score[key];
        }
      }
      nextQuestion();
    };
    container.appendChild(img);
  });
}

// 下一題或顯示結果
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    const maxScore = Math.max(...Object.values(score));
    const resultKeys = Object.keys(score).filter(key => score[key] === maxScore);
    const finalResult = resultKeys.length > 0 ? resultKeys[0] : '1';

    console.log("完成！最終分數：", score, "結果：", finalResult);

    document.getElementById('questionBox').style.display = 'none';
    const resultBox = document.getElementById('resultBox');
    const resultImage = document.getElementById('resultImage');
    resultImage.src = `PIC/${finalResult}.png`;
    resultBox.style.display = 'block';

    resizeResultImage();
  }
}
window.addEventListener('load', () => {
  const cover = document.getElementById('cover');
  const startBtn = document.getElementById('startBtn');

  // 取得背景圖 URL
  const bgUrl = getComputedStyle(cover).backgroundImage.slice(5, -2);
  const bgImg = new Image();
  bgImg.src = bgUrl;

  bgImg.onload = () => {
    // 背景圖載入完成，開始縮放按鈕
    resizeButton();
    resizeResultImage();

    // 顯示按鈕
    startBtn.style.visibility = 'visible';
  };
});

