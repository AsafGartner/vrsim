function FirstPersonRenderer(canvas) {
  this.initCanvas(canvas);
};

FirstPersonRenderer.prototype = $.extend({}, BaseRenderer.prototype);

FirstPersonRenderer.prototype.render = function(scenes) {
  this.clear();
  this.drawName("First-Person");
  var scene = scenes[scenes.length-1];
  var objectOffsetFromTracking = (scene.objectPosition - scene.trackingPosition) * this.width/2 + this.width/2;
  this.ctx.save();
  this.ctx.fillStyle = scene.objectColor;
  this.ctx.beginPath();
  this.ctx.arc(objectOffsetFromTracking, this.height/2, 40, 0, Math.PI*2);
  this.ctx.fill();
  this.ctx.restore();
  this.drawName("First-Person");
};

