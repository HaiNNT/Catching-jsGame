
function Monster(speed, a1, a2) {
  this.speed = speed;
  this.a1 = a1;
  this.a2 = a2;
}
;

Monster.prototype.check = function(herox, heroy, a) {
  return (herox <= (this.x + a)
          && this.x <= (herox + a)
          && heroy <= (this.y + a)
          && this.y <= (heroy + a));
};

Monster.prototype.move = function(herox, heroy, modifier, canvas) {


  if (this.check(herox, heroy, 60) && this.x <= 480 && this.x >= 0 && this.y <= 448 && this.y >= 0) {

    if (herox > this.x && this.x <= 480 && this.x >= 0) {
      this.x -= this.speed * modifier;
    }
    if (herox < this.x && this.x <= 480 && this.x >= 0) {
      this.x += this.speed * modifier;
    }
    if (heroy > this.y && this.y <= 480 && this.y >= 0) {
      this.y -= this.speed * modifier;
    }
    if (heroy < this.y && this.y <= 480 && this.y >= 0) {
      this.y += this.speed * modifier;
    }


  }
  else
  {
    if (this.a2 === 70)
    {

      this.a1 = Math.floor((Math.random() * 4) + 1);
      this.a2 = 0;
    }

    this.a2 = this.a2 + 1;

    if (this.a1 === 1)
    {
      this.x += this.speed * modifier;
      this.y += this.speed * modifier;

    }
    if (this.a1 === 2)
    {
      this.x += this.speed * modifier;
      this.y -= this.speed * modifier;
    }
    if (this.a1 === 3)
    {
      this.x -= this.speed * modifier;
      this.y -= this.speed * modifier;
    }
    if (this.a1 === 4)
    {
      this.x -= this.speed * modifier;
      this.y += this.speed * modifier;
    }


    if (this.x >= 480)
    {
      if (this.a1 === 2) {
        this.a1 = 3;
      }
      else
      {
        this.a1 = 4;
      }
    }
    if (this.x <= 0)
    {
      if (this.a1 === 3) {
        this.a1 = 2;
      }
      else
      {
        this.a1 = 1;
      }
    }
    if (this.y >= 448)
    {
      if (this.a1 === 4) {
        this.a1 = 3;
      }
      else
      {
        this.a1 = 2;
      }
    }
    if (this.y <= 0)
    {
      if (this.a1 === 3) {
        this.a1 = 4;
      }
      else
      {
        this.a1 = 1;
      }
    }
  }
  if (this.check(herox, heroy, 32)) {
    do {
      this.x = 32 + (Math.random() * (canvas.width - 64));
      this.y = 32 + (Math.random() * (canvas.height - 64));
    } while (this.check(herox, heroy));
    return 1;
  }
  return 0;
};
