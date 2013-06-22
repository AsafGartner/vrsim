if (window.performance.now) {
    console.log("Using high performance timer");
    getTimestamp = function() { return window.performance.now(); };
} else {
    if (window.performance.webkitNow) {
        console.log("Using webkit high performance timer");
        getTimestamp = function() { return window.performance.webkitNow(); };
    } else {
        console.log("Using low performance timer");
        getTimestamp = function() { return new Date().getTime(); };
    }
}

if (window.requestAnimationFrame) {
  onFrame = window.requestAnimationFrame;
} else {
  if (window.webkitRequestAnimationFrame) {
    onFrame = window.webkitRequestAnimationFrame;
  }
}

$(function() {
  cycleLength = 1000;
  scenesToProcess = [];
  fpsCounter = new Counter();
  updateCounter = new Counter();
  mainTimer = new Timer();
  cycleTimer = new Timer();
  headset = new Headset();
  eye = new Eye();
  simulation = new Simulation(headset);
  topViewRenderer = new TopViewRenderer($(".top_view")[0]);
  spaceTimeRenderer = new SpaceTimeRenderer($(".space_time")[0]);
  firstPersonRenderer = new FirstPersonRenderer($(".first_person")[0]);
  mainTimer.start(getTimestamp());
  headset.start(mainTimer.time);
  eye.start(mainTimer.time);
  fpsCounter.start(mainTimer.time);
  updateCounter.start(mainTimer.time);
  update();
  runStep();

  $("input.timer_speed").change(function() {
    mainTimer.speed = parseFloat(this.value);
    $(".timer_speed_value").text(mainTimer.speed);
  }).change();

  $("input.sample_rate").change(function() {
    headset.setFrameRate(parseInt(this.value));
    $(".sample_rate_value").text(headset.frameRate);
  }).change();

  $("input.space_time_range").change(function() {
    spaceTimeRenderer.range = parseInt(this.value);
    $(".space_time_range_value").text(spaceTimeRenderer.range/1000);
  }).change();

  $("input.color_fringing").change(function() {
    headset.colorFringing = this.checked;
  }).change();

  $("input.eye_tracking").change(function() {
    eye.tracking = this.checked;
  }).change();
});

function runStep() {
  onFrame(function() {
    fpsCounter.update(getTimestamp());
    $(".fps").text(fpsCounter.value);
    $(".update_rate").text(updateCounter.value);
    updateSum = updateCount = 0;
    $(".time").text((mainTimer.time/1000).toFixed((3)));

    if (scenesToProcess.length > 0) {
      topViewRenderer.render(scenesToProcess);
      spaceTimeRenderer.render(scenesToProcess);
      firstPersonRenderer.render(scenesToProcess);
    }

    scenesToProcess = [];
    runStep();
  });
}

function update() {
  var time = getTimestamp();
  mainTimer.update(time);
  updateCounter.update(time);

  var desiredObjectPosition = simulation.motion_function(mainTimer.time);
  headset.setObject(desiredObjectPosition);
  eye.setObjectPosition(desiredObjectPosition);
  headset.update(mainTimer.time);
  eye.update(mainTimer.time);

  var scene = {
    timestamp: mainTimer.time,
    objectPosition: headset.position,
    objectColor: headset.color,
    trackingPosition: eye.position
  };

  scenesToProcess.push(scene);
  setTimeout(update, 0);
}
