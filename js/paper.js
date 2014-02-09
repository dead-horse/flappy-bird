/* global Bird,Pipeline,utils,PVector */
(function () {
  var paper = utils.setup(640, 640);
  var width = paper.width;
  var height = paper.height;

  var G = new PVector(0, 0.3);

  var center = new PVector(width / 2, height / 2);
  var bird = new Bird(center, paper);
  var score = 0;
  var pipelines = [];
  var pv = 3;

  var frame = 0;
  var timer;

  var started = false;

  var startHint = paper.text(320, 400, 'click `space` to jump!');
  var scoreText = paper.text(30, 20, 'SCORE: 0').toFront();

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      !started && startGame();
      bird && bird.jump();
      break;
    }
  };

  function gameover() {
    utils.stopDraw(timer);
    started = false;
    startHint = paper.text(320, 400, 'click `space` to restrt!');
  }

  function reset() {
    bird && bird.destroy();
    bird = new Bird(center, paper);

    pipelines.forEach(function (p) {
      p.destroy();
    });
    pipelines = [];

    frame = 0;
    score = 0;
    scoreText.attr({text: 'SCORE: 0'});
    utils.stopDraw(timer);
  }

  function startGame() {
    if (started) {
      return;
    }
    startHint.remove();
    started = true;
    reset();

    timer = utils.draw(60, function () {
      frame++;
      bird.applyForce(G)
        .update();

      if (bird.border()) {
        return gameover();
      }

      bird.move();

      pipelines.forEach(function (p, index) {
        p.update().move();
        if (p.checkTouch(bird)) {
          return gameover();
        }
        if (!p.passed && p.checkPass(bird)) {
          score++;
        }
        if (p.isDead()) {
          p.destroy();
          pipelines.splice(index, 1);
        }
      });

      if (frame % 120 === 0) {
        pipelines.push(new Pipeline(width, pv + score / 10, paper));
      }
      scoreText.attr({text: 'SCORE: ' + score}).toFront();
    });
  }
})();
