/* global utils,PVector */
(function (exports) {
  var Pipeline = function (x, velocity, paper) {
    this.height = 150;
    this.width = 80;
    this.top = utils.random(200, paper.height - 200);
    this.bottom = this.top + this.height;

    this.x = x;
    this.velocity = velocity;
    this.paper = paper;
    this._initBody();
    this.passed = false;
  };

  Pipeline.prototype._initBody = function () {
    this.paper.setStart();

    this.topBody = this.paper.rect(0, 0, this.width, this.top);
    this.bottomBody = this.paper.rect(0, this.bottom,
      this.width, this.paper.height - this.bottom);
    this.body = this.paper.setFinish();
    this.body.attr({ fill: '#0e0', 'stroke': '#050' });

    this.move();
  };

  Pipeline.prototype.update = function () {
    this.x -= this.velocity;
    return this;
  };

  Pipeline.prototype.move = function () {
    this.body.transform('t' + this.x + ' 0');
    return this;
  };

  Pipeline.prototype.isDead = function () {
    return this.x < -100;
  };

  Pipeline.prototype.checkTouch = function (bird) {
    var p = bird.location;
    var r = bird.r;
    if (p.x < this.x) {
      var leftTop = new PVector(this.x, this.top);
      var leftBottom = new PVector(this.x, this.bottom);
      if (PVector.dist(p, leftTop) < r || PVector.dist(p, leftBottom < r)) {
        return true;
      }
    } else if (p.x > this.x + this.width) {
      var rightTop = new PVector(this.x + this.width, this.top);
      var rightBottom = new PVector(this.x + this.width, this.bottom);
      if (PVector.dist(p, rightTop) < r || PVector.dist(p, rightBottom < r)) {
        return true;
      }
    } else {
      if (p.y + r > this.bottom || p.y - r < this.top) {
        return true;
      }
    }
    return false;
  };

  Pipeline.prototype.checkPass = function (bird) {
    var pass = bird.location.x > this.x + this.width / 2;
    this.passed = pass;
    return pass;
  };

  Pipeline.prototype.destroy = function () {
    this.topBody.remove();
    this.bottomBody.remove();
    this.body.clear();
    return this;
  };

  exports.Pipeline = Pipeline;

})(this);
