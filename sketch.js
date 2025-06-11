let grids =[];
let noiseSpeed = 0.2;
let bgNoiseOffset = 0;
let bgNoiseSpeed = 0.01;

//draw the static Mondrian-style composition
//Remove the 'noloop()' function.
function setup() {
  createCanvas(windowWidth, windowHeight); //canvas size
  drawComposition();
}

//main drawing function
function drawComposition(){
  grids = [];
  let y = 0;
  let lastColor = null;

  while (y < height) {
    let x = 0;
    let rowHeight = Math.round(random(60, 150));

    while (x < width) {
      let w = Math.round(random(60, 150));
      let h = rowHeight;

      if (x + w > width) {
        w = width - x;
      }
      if (y + h > height) {
        h = height - y;
      }

      let colorList = [
        [255, 255, 255],     //white
        [255, 255, 255],     //higher probability for white
        [255, 255, 255],
        [255, 255, 255],
        [255, 0, 0],         //red
        [255, 230, 90],      //yellow
        [0, 102, 255],       //blue
        [0, 0, 0]            //black
      ];

      let chosenColor = null;

      //select a color that is not same as the previous one
      while (true) {
        let index = Math.floor(random(colorList.length));
        let candidate = colorList[index];

        let isWhite = candidate[0] === 255 && candidate[1] === 255 && candidate[2] === 255;

        if (lastColor == null || isWhite || !colorsEqual(candidate, lastColor)) {
          chosenColor = candidate;
          break;
        }
      }

      grids.push({
        x: x,
        y: y,
        w: w,
        h: h,
        baseW: w,
        baseH: h,
        color: chosenColor,
        noiseOffset: random(100)
      });

      if (!(chosenColor[0] === 255 && chosenColor[1] === 255 && chosenColor[2] === 255)) {
        lastColor = chosenColor;
      }
      x += w;
    }
    y += rowHeight;
  }
}

function draw(){
  //noise background colour
  let n = noise(bgNoiseOffset);
  let g = n * 255;
  background(g, g, g);

  bgNoiseOffset +=bgNoiseSpeed;

  //The breathing grid
  for(let grid of grids){
    let scaleFactor = noise(frameCount * noiseSpeed + grid.noiseOffset) * 0.2 + 0.8;
    let w = grid.baseW * scaleFactor;
    let h = grid.baseH * scaleFactor;

    let dx = (grid.baseW - w) / 2;
    let dy = (grid.baseH - h) / 2;

    fill(grid.color[0], grid.color[1], grid.color[2]);
    noStroke();
    rect(grid.x + dx, grid.y + dy, w, h);
  }
}

//automatically called when the browser window is resized
//resizes the canvas and redraws the composition
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawComposition();
}

//check whether two colors are the same
function colorsEqual(c1, c2) {
  return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
}


