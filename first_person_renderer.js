function FirstPersonRenderer(canvas, simulation) {
  this.initCanvas(canvas);
  this.simulation = simulation;
};

FirstPersonRenderer.prototype = $.extend({}, BaseRenderer.prototype);

FirstPersonRenderer.prototype.render = function(time) {
  this.ctx.clearRect(0, 0, this.width, this.height);
  var scene = this.simulation.getScene(time);
  var objectOffsetFromTracking = (scene.objectPosition - scene.trackingPosition) * this.width/2 + this.width/2;
  this.ctx.beginPath();
  this.ctx.arc(objectOffsetFromTracking, this.height/2, 40, 0, Math.PI*2);
  this.ctx.fill();
  this.drawName("First-Person");
};

