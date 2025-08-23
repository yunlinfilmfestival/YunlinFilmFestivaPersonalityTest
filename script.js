let currentQuestion = 0;
const score = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

// 縮放比例
const questionScale = 0.7;
const optionScale = 0.6;

// 基準寬度
let baseCoverWidth = null;

// 🚩 新增：處理視口高度，避免被瀏覽器分頁列遮住
function adjustCoverHeight() {
  const cover = document.getElementById('cover');
  if (window.visualViewport) {
    cover.style.height = window.visualViewport.height + "px";
  } else {
    cover.style.height = window.innerHeight + "px";
  }
}

// ====== 下面是原本的程式 ======

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

function resizeResultImage() {
  const resultImage = document.getElementById('resultImage');
  if (!baseCoverWidth) return;
  const newWidth = baseCoverWidth;
  resultImage.style.width = newWidth + 'px';
  resultImage.style.height = 'auto';
  resultImage.style.display = 'block';
  resultImage.style.margin = '0 auto';
}

function resizeQuestionImage() {
  const questionImg = document.getElementById('questionImage');
  if (!baseCoverWidth) return;
  const newWidth = baseCoverWidth * questionScale;
  questionImg.style.width = newWidth + 'px';
  questionImg.style.height = 'auto';
  questionImg.onload = () => {
    const ratio = questionImg.naturalHeight / questionImg.naturalWidth;
    questionImg.style.height = (newWidth * ratio) + 'px';
  };
}

function resizeOptionImages() {
  if (!baseCoverWidth) return;
  const optionImgs = document.getElementsByClassName('option-img');
  for (const img of optionImgs) {
    const newWidth = baseCoverWidth * optionScale;
    img.style.width = newWidth + 'px';
    img.style.height = 'auto';
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth;
      img.style.height = (newWidth * ratio) + 'px';
    };
  }
}

function startTest() {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('questionBox').style.display = 'block';
  showQuestion(currentQuestion);
}

function showQuestion(index) {
  const q = questions[index];
  const cover = document.getElementById('cover');
  cover.style.backgroundImage = `url('${q.bgImg}')`;

  const questionImg = document.getElementById('questionImage');
  questionImg.src = q.questionImg;
  resizeQuestionImage();

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  if ([1, 2, 3, 5].includes(index)) {
    container.classList.add('grid-layout');
  } else {
    container.classList.remove('grid-layout');
  }

  q.options.forEach((opt, i) => {
    const img = document.createElement('img');
    img.src = opt.img;
    img.alt = `選項${i + 1}`;
    img.className = 'option-img';

    let width = baseCoverWidth * optionScale;
    if ([1, 2, 3, 5].includes(index)) {
      width = baseCoverWidth * 0.4;
    }
    img.style.width = width + 'px';
    img.style.height = 'auto';

    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth;
      img.style.height = (width * ratio) + 'px';
    };

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

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    const maxScore = Math.max(...Object.values(score));
    const resultKeys = Object.keys(score).filter(key => score[key] === maxScore);
    const finalResult = resultKeys.length > 0 ? resultKeys[0] : '1';

    console.log("完成！最終分數：", score, "結果：", finalResult);

    // 隱藏題目與選項
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('optionsContainer').style.display = 'none';

    // 清空或改掉 cover 背景
    const cover = document.getElementById('cover');
    cover.style.backgroundImage = 'none'; // 或者 cover.style.backgroundImage = `url('PIC/${finalResult}.png')`;

    // 顯示結果圖片
    const resultBox = document.getElementById('resultBox');
    const resultImage = document.getElementById('resultImage');
    resultImage.src = `PIC/${finalResult}.png`;
    resultBox.style.display = 'block';

    resizeResultImage();
  }
}

window.addEventListener('load', () => {
  adjustCoverHeight(); // 🚩 一開始就算高度
  const cover = document.getElementById('cover');
  const startBtn = document.getElementById('startBtn');
  const bgUrl = getComputedStyle(cover).backgroundImage.slice(5, -2);
  const bgImg = new Image();
  bgImg.src = bgUrl;
  bgImg.onload = () => {
    baseCoverWidth = cover.clientWidth;
    resizeButton();
    resizeResultImage();
    startBtn.style.visibility = 'visible';
  };
});

// 🚩 視口變動時，也重新調整高度
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', adjustCoverHeight);
  window.visualViewport.addEventListener('scroll', adjustCoverHeight);
} else {
  window.addEventListener('resize', adjustCoverHeight);
}
