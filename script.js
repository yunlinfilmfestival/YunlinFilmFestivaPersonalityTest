let currentQuestion = 0;
const score = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

// 縮放比例，可自由調整
const questionScale = 0.7; // 題目圖縮小比例
const optionScale = 0.6;   // 選項圖縮小比例

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

  // ✅ 用 cover 的寬度作為基準
  const newWidth = cover.clientWidth;

  resultImage.style.width = newWidth + 'px';
  resultImage.style.height = 'auto';  // ✅ 自動維持比例
  resultImage.style.display = 'block';
  resultImage.style.margin = '0 auto';
}

// 問題圖片等比縮放（動態讀尺寸）
function resizeQuestionImage() {
  const questionImg = document.getElementById('questionImage');
  const cover = document.getElementById('cover');
  const coverWidth = cover.clientWidth;

  questionImg.style.width = (coverWidth * questionScale) + 'px';
  questionImg.style.height = 'auto';

  questionImg.onload = () => {
    const naturalWidth = questionImg.naturalWidth;
    const naturalHeight = questionImg.naturalHeight;
    const ratio = naturalHeight / naturalWidth;
    const newWidth = cover.clientWidth * questionScale;
    questionImg.style.width = newWidth + 'px';
    questionImg.style.height = newWidth * ratio + 'px';
  };
}

// 選項圖片等比縮放（動態讀尺寸）
function resizeOptionImages() {
  const cover = document.getElementById('cover');
  const coverWidth = cover.clientWidth;
  const optionImgs = document.getElementsByClassName('option-img');

  for (const img of optionImgs) {
    img.style.width = (coverWidth * optionScale) + 'px';
    img.style.height = 'auto';

    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const ratio = naturalHeight / naturalWidth;
      const newWidth = cover.clientWidth * optionScale;
      img.style.width = newWidth + 'px';
      img.style.height = newWidth * ratio + 'px';
    };
  }
}

function startTest() {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('questionBox').style.display = 'block';
  showQuestion(currentQuestion);
}

// 顯示題目與選項
function showQuestion(index) {
  const q = questions[index];
  const cover = document.getElementById('cover');
  cover.style.backgroundImage = `url('${q.bgImg}')`;

  const questionImg = document.getElementById('questionImage');
  questionImg.src = q.questionImg;
  resizeQuestionImage();

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  // ✅ 僅針對第2,3,4,6題改為 grid 兩行兩列
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

    const coverWidth = cover.clientWidth;
    let width = coverWidth * optionScale;
    let height = 'auto';

    // ✅ 控制第2、3、4、6題的選項圖片寬度
    if ([1, 2, 3, 5].includes(index)) {
      width = coverWidth * 0.4; // 小一點才能兩張並排
    }

    img.style.width = width + 'px';
    img.style.height = height;

    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const ratio = naturalHeight / naturalWidth;
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
    document.getElementById('optionsContainer').style.display = 'none';  // 新增這行，隱藏選項

    const resultBox = document.getElementById('resultBox');
    const resultImage = document.getElementById('resultImage');
    resultImage.src = `PIC/${finalResult}.png`;
    resultBox.style.display = 'block';

    resizeResultImage();
  }
}

// 初始載入時調整按鈕和結果圖片大小
window.addEventListener('load', () => {
  const cover = document.getElementById('cover');
  const startBtn = document.getElementById('startBtn');

  const bgUrl = getComputedStyle(cover).backgroundImage.slice(5, -2);
  const bgImg = new Image();
  bgImg.src = bgUrl;

  bgImg.onload = () => {
    resizeButton();
    resizeResultImage();
    startBtn.style.visibility = 'visible';
  };
});

// 視窗大小改變時也調整圖片大小
window.addEventListener('resize', () => {
  resizeButton();
  resizeQuestionImage();
  resizeOptionImages();
  resizeResultImage();
});
