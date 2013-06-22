function SpaceTimeRenderer(canvas) {
  this.initCanvas(canvas);
  this.ctx.lineWidth = 2;
  this.clear();
  this.drawName("Space-Time");
  this.drawEye({ x: this.width/2, y: this.height*0.95 });

  this.lastPosition = this.lastOffset = 0;
  this.lastObjectPosition = 0;
  this.clearAmount = this.height;
  this.graphHeight = this.height*0.8;
  this.range = 1400;
};

SpaceTimeRenderer.prototype = $.extend({}, BaseRenderer.prototype);

SpaceTimeRenderer.prototype.render = function(scenes) {
  var scene = scenes[scenes.length-1];
  for (var i = 0; i < scenes.length; ++i) {
    var scene = scenes[i];

    this.drawOffset(scene.timestamp,
                    (scene.objectPosition - scene.trackingPosition) * this.width/2 + this.width/2,
                    scene.objectColor,
                    scene.objectPosition != this.lastObjectPosition);

    this.lastObjectPosition = scene.objectPosition;
  }
};

SpaceTimeRenderer.prototype.drawOffset = function(time, offset, color, objectMoved, saccade) {
  this.ctx.save();
  this.ctx.strokeStyle = color;
  this.ctx.fillStyle = color;
  this.ctx.beginPath();
  var newPosition = this.timeToPosition(time);
  offset = Math.floor(offset);
  this.clearY(this.lastPosition, newPosition);
  if (!objectMoved && !saccade) {
    this.prepareLine(this.lastOffset, this.lastPosition, offset, newPosition);
  }

  this.ctx.stroke();

  this.lastPosition = newPosition;
  this.lastOffset = offset;

  this.ctx.restore();
};

SpaceTimeRenderer.prototype.timeToPosition = function(time) {
  return Math.floor((time % this.range) / this.range * this.graphHeight);
};

SpaceTimeRenderer.prototype.prepareLine = function(x1, y1, x2, y2) {
  if (y2 < y1) {
    y2 = this.graphHeight;
  }
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, Math.min(this.graphHeight-1, y2));
};

SpaceTimeRenderer.prototype.clearY = function(startY, endY) {
  startY = Math.floor(startY);
  endY = Math.floor(endY);
  this.ctx.save();
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, startY, this.width, Math.max(0, Math.min(endY - startY + this.clearAmount, this.graphHeight - startY)));
  this.ctx.restore();
};
