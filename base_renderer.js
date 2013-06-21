BaseRenderer = function(canvas) {
  this.initCanvas(canvas);
};

BaseRenderer.prototype.initCanvas = function(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext("2d");
};

BaseRenderer.prototype.drawEye = function(eyePosition) {
  this.ctx.beginPath();
  this.ctx.strokeStyle = "white";
  this.ctx.moveTo(eyePosition.x-30, eyePosition.y-30);
  this.ctx.lineTo(eyePosition.x, eyePosition.y);
  this.ctx.lineTo(eyePosition.x+30, eyePosition.y-30);
  this.ctx.moveTo(eyePosition.x, eyePosition.y);
  this.ctx.arc(eyePosition.x, eyePosition.y, 30, -3*Math.PI/4, -Math.PI/4);
  this.ctx.stroke();
};

BaseRenderer.prototype.toScreenSpace = function(x) {
  return (x+1)/2 * this.width; // shift from -1..1 to 0..2 then squeeze to 0..1
};

BaseRenderer.prototype.drawName = function(name) {
  this.ctx.save();
  this.ctx.globalAlpha = 0.2;
  this.ctx.font = "40px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(name, 0, this.height*0.98);
  this.ctx.restore();
};

BaseRenderer.prototype.clear = function() {
  this.ctx.save();
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.restore();
};
