function Eye() {
  this.timer = new Timer();
  this.tracking = false;
}

Eye.prototype.start = function(time) {
  this.timer.start(time);
};

Eye.prototype.update = function(time) {
  this.timer.update(time);
};

Eye.prototype.setObjectPosition = function(position) {
  this.position = this.tracking ? position : 0;
};
