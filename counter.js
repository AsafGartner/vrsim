function Counter() {
  this.duration = 1000;
}

Counter.prototype.start = function(time) {
  this.lastTime = time;
  this.count = 0;
  this.sum = 0;
  this.value = 0;
};

Counter.prototype.update = function(time) {
  this.sum += time - this.lastTime;
  this.lastTime = time;

  if (this.sum > this.duration) {
    this.value = this.count;
    this.count = 0;
    while (this.sum > this.duration) {
      this.sum -= this.duration;
    }
  }
  this.count++;
};
