TopViewRenderer = function(canvas) {
  this.initCanvas(canvas);
  //this.ctx.lineWidth = 2;
};

TopViewRenderer.prototype = $.extend({}, BaseRenderer.prototype);

TopViewRenderer.prototype.render = function(scenes) {
  var scene = scenes[scenes.length-1];
  var eyePosition = {
    x: this.width/2,
    y: this.height*0.95
  };

  var objectPosition = {
    x: this.toScreenSpace(scene.objectPosition),
    y: 10
  };

  var trackingPosition = {
    x: this.toScreenSpace(scene.trackingPosition),
    y: 10
  };

  this.clear();
  this.drawEyeTracking(eyePosition, trackingPosition);
  this.drawEye(eyePosition);
  this.drawObject(objectPosition, scene.objectColor);
  this.drawName("Top View");
};

TopViewRenderer.prototype.drawEyeTracking = function(eyePosition, trackingPosition) {
  this.ctx.save();
  this.ctx.globalAlpha = 0.4;

  // Target
  this.ctx.beginPath();
  this.ctx.fillStyle = "white";
  this.ctx.arc(trackingPosition.x, trackingPosition.y, 5, 0, 2*Math.PI);
  this.ctx.fill();

  // Line from eye to target
  this.ctx.beginPath();
  this.ctx.setLineDash([10, 8]);
  this.ctx.strokeStyle = "lightblue";
  this.ctx.moveTo(trackingPosition.x, trackingPosition.y);
  this.ctx.lineTo(eyePosition.x, eyePosition.y);
  this.ctx.stroke();

  this.ctx.restore();
};

TopViewRenderer.prototype.drawObject = function(objectPosition, objectColor) {
  this.ctx.beginPath();
  this.ctx.fillStyle = objectColor;
  this.ctx.moveTo(objectPosition.x, objectPosition.y);
  this.ctx.arc(objectPosition.x, objectPosition.y, 10, 0, Math.PI*2);
  this.ctx.fill();
};
