// —— Parameters for all code ——

const bgPalette = ['#f2f2f2','#ad011a','#cccccc','#F7DF4D',]; // Color palette for subsequent backgrounds
const colorWeights = [  0.9,       0.05,       0.1,       0.05   ]; 
/*
Since in the original artwork yellow, blue is the accent or main part. 
The visual effect is controlled by adjusting the weights in the background.
where yellow and blue are less likely to be weighted.
*/


  let   regionQuarterColors = [];      
  /*
As I want to divide the background by a fixed yellow background 
and divide the divided background again.
By asking chatgpt, I was prompted to use arrays to 
store the color index of the colors. 

The contents of which are：regionQuarterColors[xi][yj] = [c0,c1,c2,c3]
*/
  let   colorZoneLastSwitch = 0;
  const colorZoneInterval   = 2500;  

/*
In order to make the background toggle color blocks, the background 
sub-area toggle interval is set (milliseconds/unit)
*/

// Set a fixed number of rows and columns and animation time for the upper square.
const COLS1     = 25;
const ROWS1     = 25;
const DURATION1 = 100;
// Set a fixed number of rows and columns and animation time for the lower square.
const COLS2     = 10;
const ROWS2     = 10;
const DURATION2 = 20;

/*
For the two subsequent dynamic stochastic images：
serve as the “who moves and when” controller in the sketch:
delays1/2 assign a random start offset to each cell’s pop-out animation.
active1/2 flag which cells should appear (true) and which remain blank (false).
Together they create an asynchronous, sparse pop-out rhythm that resets each cycle, 
keeping the animation lively and non-uniform.

*/
let delays1 = [], active1 = [];
let delays2 = [], active2 = [];

/*
To allow each square to change with the screen size of different users. 
The parameters related to the layout are set at the top of the file. 
Will set the stage for the subsequent responsive design.
*/
let gap, cellSize1, cellSize2;

// Set t for subsequent timers and delays with Maxbelay's parameters.
let t = 0;
let maxDelay = 0;


const yellowCols = [1, 3, 5, 11, 23, 33, 35, 45]; 
// List of yellow column positions (i based on upper grid, vertical coordinate)
const yellowRows = [2, 4, 12, 20, 33]; 
// List of yellow row positions (j based on upper grid, horizontal coordinates)

// List of red block locations (i, j are based on the upper grid)
const redBlocks = [
  { i: 1, j: 1 },
  { i: 1, j: 3 },
  { i:1, j: 15},

  { i: 1, j: 23 },
  { i: 1, j: 35 },
  { i: 3, j: 0 },
  { i: 3, j: 2 },
  { i: 3, j: 4 },
  { i: 3, j: 8 },
  { i: 3, j: 12 },
  { i: 3, j: 16 },
  { i: 3, j: 18 },
  { i: 3, j: 20 },
  { i: 5, j: 1 },
  { i: 5, j: 3 },
  { i: 5, j: 0 },
  {i: 8, j: 4 },
  
  { i: 11, j: 7 },
  { i: 11, j: 9 },
  { i: 11, j: 11 },
  { i: 11, j: 13 },
  { i: 11, j: 17 },
  { i: 11, j: 30 },
  { i: 11, j: 19 },
  { i: 11, j: 21 },
  { i: 11, j: 34 },
  { i: 11, j: 24 },
  
  { i: 11, j: 3 },
  { i: 11, j: 12 },
  { i: 11, j: 1 },
  { i: 11, j: 5 },
  { i: 11, j: 2 },
  
  { i: 23, j: 0 },
  { i: 23, j: 4 },
  { i: 23, j: 7 },
  { i: 23, j: 9 },
  { i: 23, j: 13 },
  { i: 23, j: 16 },
  { i: 23, j: 22 },
  { i: 23, j: 19 },
  
  { i: 19, j: 4 },
  { i: 15, j: 4 },
  { i:10, j: 4 },
  { i: 28, j: 4 },
  { i : 30, j: 4 },
  { i : 33, j: 4 },
  { i : 38, j: 4 },
  { i : 43, j: 4 },
  { i : 47, j: 4 },
  { i : 50, j: 4 },
  

  { i: 19, j: 2 },
  { i: 15, j: 12 },
  { i:10, j: 12 },
  { i: 28, j: 12 },
  { i : 30, j: 12 },
  { i : 33, j: 12 },
  { i : 33, j: 16 },
  { i : 23, j: 16 },
  { i : 17, j: 20 },
  { i : 100, j: 20 },
  

  { i: 33, j: 0 },
  { i: 33, j: 2 },
  { i: 33, j: 4 },
  { i: 33, j: 6 },
  { i: 33, j: 8 },
  { i: 33, j: 12 },
  { i: 33, j: 16 },
  { i: 33, j: 18 },
  { i: 33, j: 22 },
  
  { i: 45, j: 0 },
  { i: 45, j: 2 },
  { i: 45, j: 4 },
  { i: 45, j: 6 },
  
  { i: 45, j: 1 },
  
  
  { i: 20, j: 2 },
  { i: 23, j: 2 },
  { i: 33, j: 9 },
  { i: 23, j: 6 },
  { i: 23, j: 22 },
  { i: 20, j: 12 },
  { i: 33, j: 22 },
  { i: 45, j: 15 },
  { i: 45, j: 5 },
  { i: 45, j: 25 },
  { i: 45, j: 35 },
  { i: 45, j: 30 },
  { i: 45, j: 22 },
  { i: 45, j: 10 },
  {i :45, j: 13},
  { i: 45, j: 40 },
  { i: 45, j: 15 },

  
];


// List of white block locations (i, j are based on the upper grid)
const whiteBlocks = [
  { i: 1, j: 0 },
  { i: 5, j: 5 },
  { i: 3, j: 3 },
  { i: 3, j: 7 },
  { i: 5, j: 9 },
  { i: 1, j: 13 },
  { i: 1, j: 5 },
  { i: 1, j: 11 },
  { i: 1, j: 9 },
  
  { i: 3, j: 5 },
  { i: 3, j: 9 },
  
  { i: 5, j: 11 },
  
  { i: 5, j: 13 },
  
  { i: 5, j: 7 },
  
  { i: 1, j: 17 },
  { i: 5, j: 15 },
  
  { i: 1, j: 14 },
  { i: 1, j: 20 },
  
  { i: 1, j: 24 },
  
  { i: 3, j: 13 },
  { i: 3, j: 15 },
  { i: 3, j: 17 },
  
  { i: 3, j: 19 },
  
  { i: 3, j: 21 },
  
  { i: 3, j: 23 },
  
  { i: 3, j: 19 },
  
  { i: 1, j: 21 },
  { i: 1, j: 7 },
  { i: 5, j: 15 },
  { i: 5, j: 17 },
  { i: 3, j: 19 },
  
  { i: 3, j: 21 },
  { i: 3, j: 23 },
  { i: 11, j: 22 },
  { i: 11, j: 23 },
  { i: 11, j: 25 },
  
  { i: 11, j: 18 },
  { i: 11, j: 16 },
  
  { i: 11, j: 27 },
  
  { i: 11, j: 14 },
  
  { i: 11, j: 10 },
  { i: 11, j: 8 },

  {i:23, j: 10 },
  {i:23, j: 12 },
  {i:23, j: 14 },
  {i:23, j: 18 },
  {i:23, j: 20 },
  {i:33, j: 3 },
  {i:33, j: 14 },
  {i:33, j: 5 },
  {i:33, j: 10 },
  {i:33, j: 17 },
  {i:33, j: 20 },
  {i:33, j: 24 },
  {i:35, j: 0 },
  {i:35, j: 2 },
  {i:35, j: 4 },
  {i:35, j: 6 },
  {i:35, j: 8 },
  {i:35, j: 12 },
  {i:35, j: 16 },
  {i:35, j: 20 },
  {i:45, j: 3 },
  {i:45, j: 7 },
  {i:45, j: 11 },
  {i:45, j: 8 },
  {i:45, j: 12 },
  {i:45, j: 16 },
  {i:45, j: 20 },
  {i:4, j: 2 },
  {i:6, j: 2 },
  {i:10, j: 2 },
  {i:14, j: 2 },
  {i:16, j: 2 },
  {i:22, j: 2 },
  {i:26, j: 2 },
  {i:28, j: 2 },
  {i:32, j: 2 },
  {i:36, j: 2 },
  {i:40, j: 2 },
  {i:44, j: 2 },
  {i:7, j: 4 },
  {i:6, j: 4 },
  {i:11, j: 4 },
  {i:12, j: 4 },
  {i:14, j: 4 },
  {i:20, j: 4 },
  {i:24, j: 4 },
  {i:27, j: 4 },
  {i:34, j: 4 },
  {i:37, j: 4 },
  {i:42, j: 4 },
  {i:48, j: 4 },
  {i:4, j: 12 },
  {i:6, j: 12 },
  {i:8, j: 12 },
  {i:14, j: 12 },
  {i:16, j: 12 },
  {i:21, j: 12 },
  {i:26, j: 12 },
  {i:29, j: 12 },
  {i:32, j: 12 },
  {i:36, j: 12 },
  {i:40, j: 12 },
  {i:44, j: 12 },
  {i:4, j: 20 },
  {i:6, j: 20 },
  {i:8, j: 20 },
  {i:14, j: 20 },
  {i:16, j: 20 },
  {i:21, j: 20 },
  {i:26, j: 20 },
  {i:29, j: 20 },
  {i:32, j: 20 },
  {i:36, j: 20 },
  {i:40, j: 20 },
  {i:44, j: 20 },

];

/**
 * setup()：Initialize canvas, layout & frame rate
 */

function setup() {
  createCanvas(windowWidth, windowHeight); //Responsive canvas
  initLayout(); //Initialize layout
  frameRate(60); 
  /*
  sets the “tempo” of the animation so that the code keeps refreshing the frame at 60 times per second, 
  which makes the animation look smoother and more natural.
  */
}


/*
draw(): the main loop of rendering is divided into several main layouts
 * 1) Draw the background color area of the bottom layer that changes over time.
 * 2) Render the bottom layer of randomly popping rectangular animations.
 * 3) Render the middle layer of static gridlines with red and white squares (wiggling at different frequencies in response to the theme)
 * 4) Render top level small square animation
 * 5) Set update time and loop animation
*/
function draw() {
  background(240);
  drawColorZones();
  // —— Lower: rectangular pop-up —— 

  // The lower layer is a grid of rectangles that pop up asynchronously
  // Each rectangle has a random delay before it starts popping up
  // The animation uses an elastic easing function for a bouncy effect
  for (let j = 0; j < ROWS2; j++) {
    for (let i = 0; i < COLS2; i++) {
      if (!active2[j][i]) continue;
      let start    = delays2[j][i];
      let progress = constrain((t - start) / DURATION2, 0, 1);
      let s        = easeOutElastic(progress);

      // Calculate the rectangle position and size
      // gap is the space between the rectangles
      // cellSize2 is the size of each rectangle
    
      // s is the scale factor based on the progress of the animation
      // i,j are the column and row indices of the rectangle
      // t is the time counter that increases each frame
      // gap is the space between the rectangles

      let x0 = gap  + i * (cellSize2 + gap);
      let y0 = gap + j * (cellSize2 + gap);
      let cx = x0 + cellSize2 / 2;
      let cy = y0 + cellSize2 / 2;
      // rectangle width and height
      let w  = cellSize2 * 2. * s;
      let h  = cellSize2 * 1.4 * s;
      // noise for random offset
      // t*0.01 Controls the speed of noise, +300 Ensures that x,y noise is different
      // i,j are used to ensure that the noise is different for each cell
      // i*0.5, j*1, t*0.01 + 300 Ensures that the noise is different for each cell
      // i*0.5, j*0.1, t*0.01 + 150 Ensures that the noise is different for each cell
      // dx, dy are used to offset the rectangle position
      let n1 = noise(i * 0.5, j * 1, t * 0.01 + 300);
      let n2 = noise(i * 0.5, j * 0.1, t * 0.01 + 150);
      let dx = (n1 - 0.5) * cellSize2 * 0.2;
      let dy = (n2 - 0.5) * cellSize2 * 0.2;

      push();
      translate(cx + dx, cy + dy);

      noStroke();
      fill(0, 74, 150);
      rectMode(CENTER);
      rect(cx, cy, w, h, );

      pop();
    }
  }

  // —— Middle layer: static grid lines and red and white blocks ——

  drawStaticBackground();

  // —— Upper: Cube Pop —— 
  // Same principle as above
  for (let j = 0; j < ROWS1; j++) {
    for (let i = 0; i < COLS1; i++) {
      if (!active1[j][i]) continue;
      let start    = delays1[j][i];
      let progress = constrain((t - start) / DURATION1, 0, 1);
      let s        = easeOutElastic(progress);

      let x0 = gap + i * (cellSize1 + gap);
      let y0 = gap + j * (cellSize1 + gap);
      let cx = x0 + cellSize1 / 2;
      let cy = y0 + cellSize1 / 2;
      let d  = cellSize1 * 1.5 * s;

      let n = noise(i * 0.5, j * 0.5, t * 0.2);
      s *= lerp(0.59, 1.1, n);

      push();
      translate(cx, cy);

      noStroke();
      fill(0, 53, 122);
      rectMode(CENTER);
      rect(cx, cy, d, d, );
      pop();
    }
  }

  // Advance the timer and cycle through the resets
  // t is the global timer that increases each frame
  // maxDelay is the maximum delay time for the animations
  // If t exceeds the maximum delay plus the longest animation duration, reset the layout
  // This ensures the animations loop seamlessly
  t++;
  if (t > maxDelay + max(DURATION1, DURATION2)) {
    initLayout();
    t = 0;
  }
}


//// —— Static background drawing function ——
/**
 * drawStaticBackground()：Draws the static background with grid lines and red/white blocks
 * It calculates the total drawing area size, draws yellow lines, red blocks with noise jitter, and white blocks.
 */

function drawStaticBackground() {


  // —— Static background ——
  // Calculate the size of the total upper drawing area
  strokeCap(SQUARE);
  
  // Calculate the total width and height of the drawing area
  const totalW = COLS1 * cellSize1 + (COLS1 + 1) * gap;
  const totalH = ROWS1 * cellSize1 + (ROWS1 + 1) * gap;

  // yellow line
  // Vertical lines: from top to bottom
  stroke('#F7DF4D');
  strokeWeight(gap * 1.3);
  yellowCols.forEach(i => {
    let x = gap + i * (cellSize1 + gap) + cellSize1 / 2;
    line(x, 0, x, height);
  });

  // Horizontal line: from the leftmost to the rightmost part of the canvas
  /*
  This “yellow line” drawing feature actually evolved from the responsive grid layout in the course:
Initially, we used gap and cellSize to dynamically generate the entire checkerboard grid, but later, 
in order to draw lines only in the specified rows and columns, I collected the row numbers [i] 
and column numbers [j] into the yellowRows/yellowCols array, 
and then traversed these indices to calculate the corresponding pixel positions (gap + i*(cellSize+gap) + cellSize/2), 
and then used line() to draw on-demand. ), and line() is used to draw on-demand. 
This preserves the ability to make responsive adjustments,
but also gives you the flexibility to control which grid lines appear.
  */
  

  yellowRows.forEach(j => {
    let y = gap + j * (cellSize1 + gap) + cellSize1 / 2;
    line(0, y, width, y);
  });

  // Solid red blocks
  strokeCap(SQUARE);
  stroke('#F7DF4D');
  strokeWeight(gap * 0.8);
  yellowCols.forEach(i => {
    let x = gap + i * (cellSize1 + gap) + cellSize1 / 2;
    line(x, 0, x, height);
  });
  yellowRows.forEach(j => {
    let y = gap + j * (cellSize1 + gap) + cellSize1 / 2;
    line(0, y, width, y);
  });

  // —— Red block plus noise jitter —— 
  const redScale = 1.3;      // Enlarge the square to fit the background grid size
  const amp      = gap * 0.6;      // Maximum offset = one gap
  noStroke();
  fill('#D12E2E');
  rectMode(CENTER);
  redBlocks.forEach(({i, j}) => {
    // 格子中心
    const x0 = gap + i * (cellSize1 + gap);
    const y0 = gap + j * (cellSize1 + gap);
    const cx = x0 + cellSize1 / 2;
    const cy = y0 + cellSize1 / 2;

    // 用噪声生成偏移
    // t*0.01 控制抖动速度，+100 保证 x,y 噪声不一样
    const dx = map(noise(i * 0.01, j * 0.01, t * 0.05), 0, 1, -amp, amp);
    const dy = map(noise(i * 0.04, j * 0.01, t * 0.05 + 100), 0, 1, -amp, amp);

    // 计算放大后的大小
    const w = cellSize1 * redScale;
    const h = cellSize1 * redScale;

    // 绘制抖动红块
    rect(cx + dx, cy + dy, w, h);
  });
  
  const whiteScale = 1.3;
const whiteAmp   = gap * 0.3;     // 只抖动 20% 的 gap
const whiteSpeed = 0.05;          // 速度是红块的 0.4 倍左右

noStroke();
fill('#d9dde2');
rectMode(CENTER);
whiteBlocks.forEach(({ i, j }) => {
  const x0 = gap + i * (cellSize1 + gap);
  const y0 = gap + j * (cellSize1 + gap);
  const cx = x0 + cellSize1/2;
  const cy = y0 + cellSize1/2;
  const w  = cellSize1 * whiteScale;
  const h  = cellSize1 * whiteScale;

  // 用较慢的噪声生成微小偏移
  const dx = map(noise(i * 0.02, j * 0.02, t * whiteSpeed+200),      0,1, -whiteAmp, whiteAmp);
  const dy = map(noise(i * 0.02, j * 0.02, t * whiteSpeed + 500), 0,1, -whiteAmp, whiteAmp);

  rect(cx + dx, cy + dy, w, h);
});

  
  rectMode(CORNER);
}



function initLayout() {
  // 计算响应式尺寸
  let m = min(windowWidth, windowHeight);
  gap        = m * 0.02;
  cellSize1  = (m - (COLS1 + 1) * gap) / COLS1;
  cellSize2  = (m - (COLS2 + 1) * gap) / COLS2;

  // 初始化 delays、active，并记录 maxDelay
  delays1 = []; active1 = [];
  delays2 = []; active2 = [];
  maxDelay = 0;

  // 上层：方块
  for (let j = 0; j < ROWS1; j++) {
    delays1[j] = []; active1[j] = [];
    for (let i = 0; i < COLS1; i++) {
      let d = floor(random(0, 30));
      delays1[j][i] = d;
      active1[j][i] = random()  > 0.8;
      maxDelay = max(maxDelay, d);
    }
  }
  // 下层：长方形
  for (let j = 0; j < ROWS2; j++) {
    delays2[j] = []; active2[j] = [];
    for (let i = 0; i < COLS2; i++) {
      let d = floor(random(0, 50));
      delays2[j][i] = d;
      active2[j][i] = random() < 0.1;
      maxDelay = max(maxDelay, d);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initLayout();
}

// 弹性缓动函数
function easeOutElastic(t) {
  const c4 = (2 * PI) / 3;
  if (t === 0) {
    return 0;
  } else if (t === 1) {
    return 1;
  } else {
    return pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1;
  }
}
function drawColorZones() {
  // 1. 计算所有分割线坐标
  const xCuts = [0];
  yellowCols.forEach(i => {
    xCuts.push(gap + i * (cellSize1 + gap) + cellSize1 / 2);
  });
  xCuts.push(width);

  const yCuts = [0];
  yellowRows.forEach(j => {
    yCuts.push(gap + j * (cellSize1 + gap) + cellSize1 / 2);
  });
  yCuts.push(height);

  // 2. 定时或首次随机生成每个 region 的四个小块颜色索引
  const now = millis();
  if (
    now - colorZoneLastSwitch > colorZoneInterval ||
    regionQuarterColors.length !== xCuts.length - 1
  ) {
    colorZoneLastSwitch = now;
    regionQuarterColors = [];
    for (let xi = 0; xi < xCuts.length - 1; xi++) {
      regionQuarterColors[xi] = [];
      for (let yj = 0; yj < yCuts.length - 1; yj++) {
        // 为当前大区生成 4 个随机颜色索引
        regionQuarterColors[xi][yj] = [
          weightedRandomIndex(colorWeights),
          weightedRandomIndex(colorWeights),
          weightedRandomIndex(colorWeights),
          weightedRandomIndex(colorWeights),
        ];
      }
    }
  }

  // 3. 绘制每个大区的 4 块小区域
  noStroke();
  rectMode(CORNER);
  for (let xi = 0; xi < xCuts.length - 1; xi++) {
    for (let yj = 0; yj < yCuts.length - 1; yj++) {
      const x0 = xCuts[xi];
      const y0 = yCuts[yj];
      const w  = xCuts[xi + 1] - x0;
      const h  = yCuts[yj + 1] - y0;
      const cols = regionQuarterColors[xi][yj];

      // 四个象限：0=左上, 1=右上, 2=左下, 3=右下
      // 左上
      fill(bgPalette[cols[0]]);
      rect(x0,       y0,     w/2, h/2);
      // 右上
      fill(bgPalette[cols[1]]);
      rect(x0 + w/2, y0,     w/2, h/2);
      // 左下
      fill(bgPalette[cols[2]]);
      rect(x0,       y0 + h/2, w/2, h/2);
      // 右下
      fill(bgPalette[cols[3]]);
      rect(x0 + w/2, y0 + h/2, w/2, h/2);
    }
  }
}
function weightedRandomIndex(weights) {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let r = random(total);
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return i;
    r -= weights[i];
  }
  return weights.length - 1;
}
