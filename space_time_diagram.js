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
  mainTimer = new Timer();
  cycleTimer = new Timer();
  headset = new Headset();
  simulation = new Simulation(headset);
  topViewRenderer = new TopViewRenderer($(".top_view")[0]);
  spaceTimeRenderer = new SpaceTimeRenderer($(".space_time")[0]);
  //firstPersonRenderer = new FirstPersonRenderer($(".first_person")[0], simulation);
  mainTimer.start(getTimestamp());
  headset.start(mainTimer.time);
  runStep();
});

function runStep() {
  onFrame(function() {
    var time = getTimestamp();
    mainTimer.update(time);

    $(".fps").text(calculateFps(time).toFixed(0));
    $(".time").text((mainTimer.time/1000).toFixed((3)));
    $(".sample_rate").text(headset.frameRate);
    $(".color_fringing").text(headset.colorFringing ? "On" : "Off");

    var desiredObjectPosition = simulation.motion_function(mainTimer.time);
    headset.update(mainTimer.time);
    headset.setObject(desiredObjectPosition);

    var scene = {
      timestamp: mainTimer.time,
      objectPosition: headset.position,
      objectColor: headset.color,
      trackingPosition: desiredObjectPosition
    };
    topViewRenderer.render(scene);
    spaceTimeRenderer.render(scene);
    //firstPersonRenderer.render(timer.time);
    runStep();
  });
}

function calculateFps(currentTime) {
  var frameTime = currentTime - window.lastTime;
  window.lastTime = currentTime;
  return 1000/frameTime;
}
