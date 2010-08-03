// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
goog.require('eightball.PoolTable');
goog.require('eightball.Music');
goog.require('eightball.SoundEffect');
goog.require('eightball.SoundEffectManager');
goog.require('pixelLab.ImagePreloader');
goog.require('pixelLab.Debug');

var poolTable;
var musicManager;

$(window).load(function () {
  pixelLab.Debug.enable();
  pixelLab.ImagePreloader.preload("images/bestscore.png, images/cue.png, images/progressbg.png, images/progressunit.png, images/score.png, images/table.jpg, images/tableborder.png, images/timeremaining.png, images/wood.jpg");

  // create our music manager
  musicManager = new eightball.Music("sounds/theme.mp4");

  // create our sounds manager
  soundManager = new eightball.SoundEffectManager();

  // add sounds
  soundManager.add("blip1", new eightball.SoundEffect("sounds/blip1.mp3", 3));
  soundManager.add("blip2", new eightball.SoundEffect("sounds/blip2.mp3", 3));
  soundManager.add("blip3", new eightball.SoundEffect("sounds/blip3.mp3", 3));
  soundManager.add("blip4", new eightball.SoundEffect("sounds/blip4.mp3", 3));
  soundManager.add("bounce01", new eightball.SoundEffect("sounds/bounce01.mp3", 3));
  soundManager.add("pocket01", new eightball.SoundEffect("sounds/pocket01.mp3", 3));
  soundManager.add("shot05", new eightball.SoundEffect("sounds/shot05.mp3", 3));
  soundManager.add("shotsingle01", new eightball.SoundEffect("sounds/shotsingle01.mp3", 3));

  var canvasElement = $('canvas#demo_canvas');
  var cueCanvasElement = $('canvas#cue_canvas');
  if (canvasElement[0]) {
    poolTable = new eightball.PoolTable(canvasElement, cueCanvasElement);

    width = window.innerWidth;
    height = window.innerHeight;
    poolTable.updateLayout(width, height);
  }

  var updateMusicButton = function () {
    if (musicManager.isMusicOn()) {
      $("#musicbuttonon").fadeIn("fast");
    } else {
      $("#musicbuttonon").fadeOut("fast");
    } 
  };

  var updateSoundButton = function () {
    if (soundManager.isSoundOn()) {
      $("#soundsbuttonon").fadeIn("fast");
    } else {
      $("#soundsbuttonon").fadeOut("fast");
    }
  };

  // music on/off
  $("#musicbutton").click(function () {
    musicManager.toggleMusic();
    updateMusicButton();
  });

  // sound effects on/off
  $("#soundsbutton").click(function () {
    soundManager.toggleSound();
    updateSoundButton();
  });

  updateMusicButton();
  updateSoundButton();

  // sound effects test code
  $(".soundtest").click(function () {
    soundManager.play(this.id);
  });

});

$(window).resize(function(e) {
  width = window.innerWidth;
  height = window.innerHeight;
  poolTable.updateLayout(width, height);
});