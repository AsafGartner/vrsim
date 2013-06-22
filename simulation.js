function Simulation(headset) {
  this.headset = headset;
}

Simulation.prototype.getScene = function(time) {
  return {
    objectPosition: headset.position,
    color: headset.color,
    trackingPosition: this.getTrackingPosition(this.motion_function(time))
  };
};

Simulation.prototype.motion_function = function(time) {
  return (time % 1000)/1000 * 2 - 1;
  //return Math.sin((time/1000)*Math.PI);
};

Simulation.prototype.getTrackingPosition = function(x) {
  return 0;
};
