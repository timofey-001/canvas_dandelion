const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};
	
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const degToRad = Math.PI / 180;
const step = 15;
const slopeAngle = 25;

const drawLine = (x1, y1, x2, y2) => {
	ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
};

const drawHead = (x1, y1, angle, depth) => {
  if (depth) {
    const x2 = x1 + Math.cos(angle * degToRad) * depth * step;
    const y2 = y1 + Math.sin(angle * degToRad) * depth * step;
    drawLine(x1, y1, x2, y2);
    const countChildNodes = getRandomArbitrary(4, 5);
    for (let i = 1; i <= countChildNodes; i++) {
      const currentSlopeAngle = i % 2 ? -slopeAngle * i : slopeAngle * i;
      drawHead(x2, y2, angle - currentSlopeAngle, depth - 1);
    }
  }
};

const drawTrunk = (x1, y1, angle, trunk_length) => {
  if (trunk_length) {
    const x2 = x1 + Math.cos(angle * degToRad) * trunk_length * step;
    const y2 = y1 + Math.sin(angle * degToRad) * trunk_length * step;
    drawLine(x1, y1, x2, y2);
    drawTrunk(x2, y2, angle + 5, trunk_length - 1);
  } else {
    return { x1, y1 };
  }
};

const startDraw = (depth, trunk_length) => {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(30, 130, 76, 1)";
  drawTrunk(500, 500, 90, trunk_length);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(247, 202, 24, 0.6)";
  drawHead(500, 500, -90, depth);
  ctx.closePath();
  ctx.stroke();
};

const form = document.getElementById("settingsForm");
form.onchange = (event) => {
  const depth = form.elements.inputDepth.value;
  const trunk_length = form.elements.inputTrunk.value;
  if (depth && trunk_length) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startDraw(depth, trunk_length);
  }
};
startDraw(6, 7);
