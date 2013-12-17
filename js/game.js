// Create the canvas
(function() {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);

// Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function() {
    bgReady = true;
  };
  bgImage.src = "image/background.png";

// Hero image
  var heroReady = false;
  var heroImage = new Image();
  heroImage.onload = function() {
    heroReady = true;
  };
  heroImage.src = "image/hero.png";

// Monster image
  var monsterReady = false;
  var monsterImage = new Image();
  monsterImage.onload = function() {
    monsterReady = true;
  };
  monsterImage.src = "image/monster.png";

// Reep image
  var reepReady = false;
  var reepImage = new Image();
  reepImage.onload = function() {
    reepReady = true;
  };
  reepImage.src = "image/reep.png";

// Game objects
  var hero = {
    speed: 256 // movement in pixels per second
  };
  var monsters = new Array(new Monster(256, 1, 0));
  var reeps = new Array(new Reep(256, 1, 0));
  //var monster = new Monster(256, 1, 0);
  //var monster1 = new Monster(256, 1, 0);
  //var reep1 = new Reep(256, 1, 0);
  //var reep2 = new Reep(256, 1, 0);
  //var reep3 = new Reep(256, 1, 0);


  var monstersCaught = 0;
  var gameover = 0;
  var gamestart = 0;
  var addReep = 0;
  var modifier;
// Handle keyboard controls
  var keysDown = {};


  addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  }, false);


// Reset the game when the player catches a monster
  var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    gamestart = 0;
    monstersCaught = 0;
    addReep = 0;
    // Throw the monster somewhere on the screen randomly
    monsters = new Array(new Monster(180, 1, 0));
    reeps = new Array(new Reep(150, 1, 0));
    //for (i = 0; i < monsters.length; i++) {
      monsters[0].x = 32 + (Math.random() * (canvas.width - 64));
      monsters[0].y = 32 + (Math.random() * (canvas.height - 64));
    //}


    reeps[0].x = 32 + (Math.random() * (canvas.width - 64));
    reeps[0].y = 32 + (Math.random() * (canvas.height - 64));


  };

// Update game objects
//  var moveReep = function() {
//    
//      if (addReep === 2) {
//
//
//        addReep = 0;
//        var reep = new Reep(256, 1, 0);
//        reep.x = 32 + (Math.random() * (canvas.width - 64));
//        reep.y = 32 + (Math.random() * (canvas.width - 64));
//        reeps.push(reep);
//
//      }
//      for (i = 0; i < reeps.length; i++) {
//        gameover = reeps[i].move(hero.x, hero.y, modifier);    
//    }
//  };
  var update = function() {
    if (13 in keysDown) {
      gamestart = 1;

    }
    if (gamestart === 1) {

      if (38 in keysDown && hero.y >= 0) { // Player holding up
        hero.y -= hero.speed * modifier;
      }
      
      if (40 in keysDown && hero.y <= 448) { // Player holding down
        hero.y += hero.speed * modifier;
      }
      
      if (37 in keysDown && hero.x >= 0) { // Player holding left
        hero.x -= hero.speed * modifier;
      }
      
      if (39 in keysDown && hero.x <= 480) { // Player holding right
        hero.x += hero.speed * modifier;

      }
      

      if (addReep === 5) {
        addReep = 0;
        var reep = new Reep(150, 1, 0);
        do{
        reep.x = 32 + (Math.random() * (canvas.width - 64));
        reep.y = 32 + (Math.random() * (canvas.width - 64));
        }while(reep.check(hero.x, hero.y, 32));
        reeps.push(reep);
      }
      
      for (i = 0; i < reeps.length && gameover !== 1; i++) {
        gameover = reeps[i].move(hero.x, hero.y, modifier);     
      }

      //for (i = 0; i < monsters.length; i++) {
        var a = monsters[0].move(hero.x, hero.y, modifier, canvas);
        monstersCaught += a;
        addReep += a;
      //}
      
    }
  };


// Draw everything
  var render = function() {
    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
      ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (reepReady) {
      for (i = 0; i < reeps.length; i++) {

        ctx.drawImage(reepImage, reeps[i].x, reeps[i].y);
      }
    }

    if (monsterReady) {
      for (i = 0; i < monsters.length; i++) {

        ctx.drawImage(monsterImage, monsters[i].x, monsters[i].y);
      }
    }




    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
  };

// The main game loop
  var main = function() {
    var now = Date.now();
    var delta = now - then;
    if (32 in keysDown) {
      gameover = 0;
      reset();
    }
    if (gameover !== 1) {
      modifier = delta / 1000;

      update();

    }
    then = now;

  };

// Let's play this game!
  reset();
  //render();
  var then = Date.now();

  setInterval(render, 1); // Execute as fast as possible
  //main();
//setInterval(moveReep, 1);
  setInterval(main, 5);

})();