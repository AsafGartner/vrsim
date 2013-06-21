function Timer() {
  this.time = 0;
  this.speed = 1;
}

Timer.prototype.start = function(currentTime) {
  this.time = 0;
  this.lastTime = currentTime;
};

Timer.prototype.update = function(currentTime) {
  this.time += (currentTime - this.lastTime) * this.speed;
  this.lastTime = currentTime;
};
