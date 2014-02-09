/* global PVector */
(function (exports) {
  var Bird = function (location, paper) {
    this.location = location.clone();
    this.width = paper.width;
    this.height = paper.height;
    this.paper = paper;

    this.r = 30;
    this._initBody();

    this.velocity = new PVector();
    this.acceleration = new PVector();

    this.jumpVelocity = new PVector(0, -6);
  };

  Bird.prototype._initBody = function () {
    this.body = this.paper.circle(this.location.x, this.location.y, this.r);
    this.body.attr({fill: '#777', 'stroke-width': 0});
  };

  Bird.prototype.applyForce = function (force) {
    // ignore mass
    this.acceleration.add(force);
    return this;
  };

  Bird.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Bird.prototype.border = function () {
    if (this.location.y > this.height - this.r) {
      this.location.y = this.height - this.r;
      return true;
    }
  };

  Bird.prototype.move = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
    return this;
  };

  Bird.prototype.jump = function () {
    this.velocity = this.jumpVelocity.clone();
    return this;
  };

  Bird.prototype.destroy = function () {
    this.body.remove();
    return this;
  };

  exports.Bird = Bird;
})(this);
