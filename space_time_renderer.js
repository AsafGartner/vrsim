function SpaceTimeRenderer(canvas) {
  this.initCanvas(canvas);
  this.ctx.lineWidth = 2;
  this.clear();
  this.drawName("Space-Time");
  this.drawEye({ x: this.width/2, y: this.height*0.95 });
  this.currentPosition = 0;
  this.clearAmount = 100;
  this.bottom = this.height*0.8;
};

SpaceTimeRenderer.prototype = $.extend({}, BaseRenderer.prototype);

SpaceTimeRenderer.prototype.render = function(scene) {
  this.ctx.save();

  var toClear = Math.min(this.clearAmount, this.bottom - this.currentPosition);
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, this.currentPosition, this.width, toClear);
  if (toClear < this.clearAmount) {
    this.ctx.fillRect(0, 0, this.width, this.clearAmount - toClear);
  }

  var objectOffsetFromTracking = (scene.objectPosition - scene.trackingPosition) * this.width/2 + this.width/2;

  this.ctx.fillStyle = scene.objectColor;
  this.ctx.fillRect(objectOffsetFromTracking, this.currentPosition, 1, 1);
  this.ctx.restore();
  if (this.lastPosition &&
      this.lastObjectPosition == scene.objectPosition &&
      this.lastPosition.y < this.currentPosition) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
    this.ctx.lineTo(objectOffsetFromTracking, this.currentPosition);
    this.ctx.stroke();
  }
  this.lastPosition = {
    x: objectOffsetFromTracking,
    y: this.currentPosition
  };
  this.lastObjectPosition = scene.objectPosition;
  this.currentPosition++;
  if (this.currentPosition >= this.bottom) {
    this.currentPosition = 0;
  }
};
