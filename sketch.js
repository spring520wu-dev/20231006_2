// 定義測驗題目與選項資料結構（陣列包含 5 物件）
let questions = [
  {
    // 題目 1 內文
    question: "1. 在 p5.js 中，設定畫布大小的指令是什麼？",
    // 題目 1 的 4 個選項內容
    options: ["A) resizeCanvas()", "B) createCanvas()", "C) setCanvas()", "D) newCanvas()"],
    // 題目 1 的正確答案索引 (0 代表第一個選項，1 代表第二個)
    correct: 1
  },
  {
    // 題目 2 內文
    question: "2. 哪一個函式會在程式啟動時「只執行一次」？",
    // 題目 2 的 4 個選項內容
    options: ["A) draw()", "B) start()", "C) setup()", "D) init()"],
    // 題目 2 的正確答案索引
    correct: 2
  },
  {
    // 題目 3 內文
    question: "3. 若要繪製一個圓形，應該使用哪一個指令？",
    // 題目 3 的 4 個選項內容
    options: ["A) circle()", "B) rect()", "C) line()", "D) square()"],
    // 題目 3 的正確答案索引
    correct: 0
  },
  {
    // 題目 4 內文
    question: "4. 設定填滿顏色的指令是哪一個？",
    // 題目 4 的 4 個選項內容
    options: ["A) stroke()", "B) color()", "C) background()", "D) fill()"],
    // 題目 4 的正確答案索引
    correct: 3
  },
  {
    // 題目 5 內文
    question: "5. 哪一個系統變數可以取得目前滑鼠的 X 軸座標？",
    // 題目 5 的 4 個選項內容
    options: ["A) mouseX", "B) mouseY", "C) posX", "D) clickX"],
    // 題目 5 的正確答案索引
    correct: 0
  }
];

// 宣告變數：記錄目前正在回答第幾題 (從 0 開始累加)
let currentQuestionIndex = 0;
// 宣告變數：記錄玩家獲得的總分數
let score = 0;
// 宣告變數：記錄玩家目前點擊了哪個選項 (-1 表示尚未選擇)
let selectedOption = -1;
// 宣告變數：記錄目前題目是否已經完成作答
let isAnswered = false;
// 宣告變數：記錄正確選項答錯時上下跳動的 Y 軸偏移像素
let jumpOffset = 0;

// p5.js 初始化設定函式 (程式啟動時執行一次)
function setup() {
  // 建立與目前瀏覽器視窗同寬同高的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 設定畫布上的文字對齊方式為「水平居中、垂直居中」
  textAlign(CENTER, CENTER);
  // 全域設定文字樣式為粗體 (BOLD)
  textStyle(BOLD);
}

// p5.js 主繪圖循環函式 (每秒自動重複執行約 60 次)
function draw() {
  // 設定畫布背景顏色為淺灰色 (#F5F5F5)
  background(245);

  // 檢查是否已經做完所有 5 個題目
  if (currentQuestionIndex >= questions.length) {
    // 若題目已全部做完，呼叫繪製最終結算畫面的函式
    drawScoreScreen();
  } else {
    // 若還有題目未完成，呼叫繪製測驗題目的函式
    drawQuizScreen();
  }
}

// 繪製測驗題目與選項介面的函式
function drawQuizScreen() {
  // 取得目前索引對應的題目資料物件
  let q = questions[currentQuestionIndex];

  // 設定題目文字顏色為深灰色
  fill(30);
  // 設定題目文字大小為放大後的 32px
  textSize(32);
  // 在畫布水平中央、高度 18% 處繪製題目文字
  text(q.question, width / 2, height * 0.18);

  // 計算選項按鈕的寬度 (取視窗寬度的 70% 或最大 550px)
  let optionWidth = min(width * 0.7, 550);
  // 設定選項按鈕的高度為 60px (加大按鈕區塊)
  let optionHeight = 60;
  // 設定第一個選項按鈕的起始 Y 軸座標位置
  let startY = height * 0.32;
  // 設定各選項按鈕之間的垂直間距為 75px
  let spacing = 75;

  // 判斷玩家如果已作答且答錯了
  if (isAnswered && selectedOption !== q.correct) {
    // 利用正弦波函式 sin() 與 frameCount 產生幅度為 10px 的連續平滑跳動效果
    jumpOffset = sin(frameCount * 0.2) * 10;
  } else {
    // 若未作答或答對，跳動偏移量歸零
    jumpOffset = 0;
  }

  // 利用迴圈巡覽繪製 4 個選項按鈕
  for (let i = 0; i < q.options.length; i++) {
    // 計算當前選項按鈕的 X 軸左上角座標
    let x = width / 2 - optionWidth / 2;
    // 計算當前選項按鈕的 Y 軸左上角座標
    let y = startY + i * spacing;

    // 宣告變數用於計算加上跳動後的最終 Y 軸位置
    let currentY = y;

    // 判斷是否已經按下答案進行檢驗
    if (isAnswered) {
      // 判斷當前巡覽到的選項是否為「正確答案」
      if (i === q.correct) {
        // 判斷玩家選擇的是否就是正確答案
        if (selectedOption === q.correct) {
          // 答對時：正確答案顯示柔和綠色背景
          fill("#a8e6cf");
        } else {
          // 答錯時：正確答案顯示指定的背景顏色 #caf0f8
          fill("#caf0f8");
          // 答錯時：將跳動偏移量加進 Y 座標，使正確選項產生上下跳動
          currentY += jumpOffset;
        }
      } else if (i === selectedOption) {
        // 若當前選項是玩家選錯的選項：填滿粉紅色背景
        fill("#ffaaa5");
      } else {
        // 其餘未被選中的錯誤選項：保持白色背景
        fill(255);
      }
    } else {
      // 尚未作答狀態：所有選項按鈕維持白色背景
      fill(255);
    }

    // 設定選項按鈕邊框顏色為淺灰色
    stroke(200);
    // 設定選項按鈕邊框粗細為 2px
    strokeWeight(2);
    // 繪製圓角矩形作為選項按鈕 (最後一個參數 12 為圓角半徑)
    rect(x, currentY, optionWidth, optionHeight, 12);

    // 取消繪製文字邊框線
    noStroke();
    // 設定選項文字顏色為深灰色
    fill(40);
    // 設定選項文字大小為放大後的 24px
    textSize(24);
    // 在選項按鈕的正中央繪製選項文字
    text(q.options[i], width / 2, currentY + optionHeight / 2);
  }

  // 判斷作答完成後，顯示「下一題」按鈕
  if (isAnswered) {
    // 設定下一題按鈕寬度為 180px
    let btnW = 180;
    // 設定下一題按鈕高度為 55px
    let btnH = 55;
    // 計算下一題按鈕的 X 軸左上角座標
    let btnX = width / 2 - btnW / 2;
    // 計算下一題按鈕的 Y 軸左上角座標
    let btnY = startY + 4 * spacing + 15;

    // 設定下一題按鈕背景填滿顏色為藍色
    fill("#4d96ff");
    // 繪製下一題按鈕圓角矩形
    rect(btnX, btnY, btnW, btnH, 10);

    // 設定按鈕內文字顏色為白色
    fill(255);
    // 設定按鈕內文字大小為放大後的 22px
    textSize(22);
    // 在按鈕正中央繪製「下一題」文字
    text("下一題", width / 2, btnY + btnH / 2);
  }
}

// 繪製 5 題全部回答完畢後的結算畫面函式
function drawScoreScreen() {
  // 設定文字填滿顏色為深灰色
  fill(30);
  // 取消繪製邊框
  noStroke();

  // 設定結算標題文字大小為放大後的 44px
  textSize(44);
  // 在畫布上方繪製「測驗結束！」標題
  text("測驗結束！", width / 2, height * 0.35);

  // 設定得分顯示文字大小為放大後的 32px
  textSize(32);
  // 繪製最終答對題數結果
  text(`您的總得分為：${score} / ${questions.length} 題`, width / 2, height * 0.48);

  // 設定重新開始按鈕寬度為 200px
  let btnW = 200;
  // 設定重新開始按鈕高度為 60px
  let btnH = 60;
  // 計算重新開始按鈕的 X 軸左上角座標
  let btnX = width / 2 - btnW / 2;
  // 計算重新開始按鈕的 Y 軸左上角座標
  let btnY = height * 0.62;

  // 設定重新開始按鈕背景顏色為紫色 (#6c5ce7)
  fill("#6c5ce7");
  // 繪製重新開始按鈕圓角矩形
  rect(btnX, btnY, btnW, btnH, 10);

  // 設定按鈕文字顏色為白色
  fill(255);
  // 設定按鈕文字大小為放大後的 22px
  textSize(22);
  // 在按鈕正中央繪製「再測驗一次」文字
  text("再測驗一次", width / 2, btnY + btnH / 2);
}

// 滑鼠點擊觸發事件處理函式
function mousePressed() {
  // 判斷是否在測驗結束結算畫面
  if (currentQuestionIndex >= questions.length) {
    // 定義重新開始按鈕尺寸與範圍
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height * 0.62;

    // 檢查滑鼠點擊座標是否落在「再測驗一次」按鈕範圍內
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      // 重置當前題目索引為 0
      currentQuestionIndex = 0;
      // 重置得分為 0
      score = 0;
      // 重置所選選項狀態
      selectedOption = -1;
      // 重置作答狀態為未作答
      isAnswered = false;
    }
    // 處理完畢後直接結束 function
    return;
  }

  // 計算選項按鈕的尺寸與位置範圍
  let optionWidth = min(width * 0.7, 550);
  let optionHeight = 60;
  let startY = height * 0.32;
  let spacing = 75;

  // 判斷當前題目是否還「尚未作答」
  if (!isAnswered) {
    // 利用迴圈檢查滑鼠點擊的是哪一個選項按鈕
    for (let i = 0; i < 4; i++) {
      // 計算第 i 個選項按鈕的 X 軸左上角座標
      let x = width / 2 - optionWidth / 2;
      // 計算第 i 個選項按鈕的 Y 軸左上角座標
      let y = startY + i * spacing;

      // 判斷滑鼠座標 X 與 Y 是否點擊在該選項按鈕矩形區域內
      if (mouseX > x && mouseX < x + optionWidth && mouseY > y && mouseY < y + optionHeight) {
        // 紀錄玩家所選擇的選項索引 (0~3)
        selectedOption = i;
        // 將作答狀態標記為已作答
        isAnswered = true;

        // 判斷選擇的選項是否等於正確答案索引
        if (selectedOption === questions[currentQuestionIndex].correct) {
          // 若答對則總分加 1
          score++;
        }
        // 已經找到點擊的選項，跳出迴圈
        break;
      }
    }
  } else {
    // 若已經作答，則檢查是否點擊了「下一題」按鈕
    let btnW = 180;
    let btnH = 55;
    let btnX = width / 2 - btnW / 2;
    let btnY = startY + 4 * spacing + 15;

    // 判斷滑鼠座標是否點擊在「下一題」按鈕區域內
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      // 切換至下一題 (索引加 1)
      currentQuestionIndex++;
      // 重置選擇選項狀態為 -1
      selectedOption = -1;
      // 重置作答狀態為 false
      isAnswered = false;
    }
  }
}

// 當使用者調整瀏覽器視窗大小時自動觸發的函式
function windowResized() {
  // 自動將畫布重新調整為新的視窗寬高，確保全螢幕適應
  resizeCanvas(windowWidth, windowHeight);
}