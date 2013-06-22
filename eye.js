function Eye() {
  timer = new Timer();
}

Eye.prototype.start = function(time) {
  timer.start(time);
};

Eye.prototype.update = function(time) {
  timer.update(time);
};

Eye.prototype.setObjectPosition = function(position) {
  this.position = position;
  this.position = 0;
};
