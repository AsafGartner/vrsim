function Headset() {
  this.colorFringing = false;
  this.position = 0;
  this.setFrameRate(10);
  this.frameTimer = new Timer();
  this.frameCount = 0;
  this.colors = ["red", "green", "blue"];
}

Headset.prototype.setFrameRate = function(frameRate) {
  this.frameRate = frameRate;
  this.msPerFrame = 1.0/this.frameRate*1000;
};

Headset.prototype.setObject = function(position) {
  this.nextPosition = position;
};

Headset.prototype.start = function(time) {
  this.frameTimer.start(time);
};

Headset.prototype.update = function(time) {
  this.frameTimer.update(time);
  if (this.frameTimer.time > this.msPerFrame) {
    this.frameCount++;
    this.position = this.nextPosition;

    while (this.frameTimer.time > this.msPerFrame) {
      this.frameTimer.time -= this.msPerFrame;
    }
  }

  if (this.colorFringing) {
    this.color = this.colors[Math.floor(this.frameTimer.time/(this.msPerFrame/3))];
  } else {
    this.color = "white";
  }
};
