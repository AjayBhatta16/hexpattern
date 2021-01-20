let rid = null;
const ctx = canvas.getContext("2d");
let cw = (canvas.width = window.innerWidth);
let ch = (canvas.height = window.innerHeight);

let r = Math.min(cw,ch) / 20;
let h = r * Math.cos(Math.PI / 6);

let red = 255;
let green = 0;
let blue = 0;

function circle(c, r, x1,x2,y1,y2) {
  ctx.globalCompositeOperation = "lighter";
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, 2 * Math.PI);
  //let red = Math.floor(Math.random()*255);
  //let green = Math.floor(Math.random()*255);
  //let blue = Math.floor(Math.random()*255);
  ctx.strokeStyle = "rgb("+red+","+green+","+blue+")";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function HEX(r, n, R) {
  let ry = [];
  for(var i = 1; i <= 6; i++) {
    let o = {};
    o.x1 = r * Math.cos(((i - 1) * Math.PI) / 3);
    o.y1 = r * Math.sin(((i - 1) * Math.PI) / 3);
    o.x2 = r * Math.cos((i * Math.PI) / 3);
    o.y2 = r * Math.sin((i * Math.PI) / 3);
    ry.push(o);
  }

  ry.map((l) => {divideLine(l,n,R);});
}

function divideLine(o,n,R) {
  let ry = divide(o,n);
  ry.map((p) => {circle(p,R,o.x1,o.x2,o.y1,o.y2);});
}

function divide(o,n) {
  let ry = [];
  for(var i = 0; i < n; i++) {
    ry.push({x:((o.x2 - o.x1) * i) / n + o.x1, 
      y: ((o.y2 - o.y1) * i) / n + o.y1});
  }
  return ry;
}

let baseR = 80;
let frames = 0;
let colorChangeSpeed = 2.5;
function Draw() {
  rid = requestAnimationFrame(Draw);
  frames += 0.02;
  if(red == 255 && green != 255 && blue == 0) {
    green += colorChangeSpeed;
  } // red to yellow
  if(green == 255 && red != 0 && blue == 0){
    red -= colorChangeSpeed;
  } // yellow to green
  if(green == 255 && blue != 255 && red == 0) {
    blue += colorChangeSpeed;
  } // green to aqua
  if(blue == 255 && green != 0 && red == 0) {
    green -= colorChangeSpeed;
  } // aqua to blue
  if(blue == 255 && red != 255 && green == 0){
    red += colorChangeSpeed;
  } // blue to purple
  if(red == 255 && blue != 0 && green == 0){
    blue -= colorChangeSpeed;
  } // purple to red
  let R = h + Math.abs(baseR*Math.sin(frames)*Math.sin(frames));
  ctx.clearRect(-cw,-ch, 2 * cw, 2 * ch);
  circle({x:0, y:0}, R);
  for(let i = 1; i < 6; i++){
    HEX(2*i*h,i,R);
  }
}

function Init() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
  r = Math.min(cw,ch) / 26;
  h = r * Math.cos(Math.PI / 6);
  if(rid) {
    cancelAnimationFrame(rid);
    rid = null;
  }
  ctx.translate(cw/2, ch/2);
  Draw();
}

window.setTimeout(function() {
  Init();
  window.addEventListener("resize", Init, false);
});