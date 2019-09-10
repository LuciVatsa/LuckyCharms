
var config = {
        type: Phaser.AUTO,
        width: 608,
        height: 704,
        physics: {
            default: 'arcade',
            
            arcade: {
                gravity: { y: 0},
                debug: true
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
            
        }
    };
	
	
    var player;
    var slime;
    var cursors;
    var score = 0;
    var scoreText;
    var enemy;
    var X= 100;
    var Y= 500;
    var follower;
    var portal;
var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);
function preload ()
{
	

       this.load.image('sky','background.png');
       this.load.image('slime', 'slime.png');
       this.load.image('enemy', 'enemySkeleton.png');
       this.load.image('portal', 'tempPortal.png');
       //spirte loading
     //  this.load.spritesheet('dude', 'dude.png',{ frameWidth:32, frameHeight:48});
     this.load.image('dude', 'Player.png');
}

function create ()
    {
    	//19 width boxes, 22 height boxes
        
        this.add.image(304,400,'sky');
        //enemy collision
        enemy= this.physics.add.group();
        enemy.create(48,208,'enemy');
        enemy.create(240,608 , 'enemy');
        //slime collision 
        slime =this.physics.add.group(); 
        slime.create(48,48,'slime');
        slime.create(48,80,'slime');
        slime.create(48,112,'slime');
        slime.create(48,144,'slime');
        slime.create(48,176,'slime');
        slime.create(80,176,'slime');
        slime.create(112,240,'slime');
        slime.create(144,304,'slime');
        slime.create(176,16,'slime');
        slime.create(240,80,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        // slime.create(48,16,'slime');
        slime.create(48,608,'slime');
       //
 
        // playercollision 
        player = this.physics.add.sprite(288,320,'dude');
        player.setCollideWorldBounds(true);
        //player score text
       scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
            cursors = this.input.keyboard.createCursorKeys();
        
            this.physics.add.collider(player, slime);
            //Collision with the player
        this.physics.add.collider(player, slime, blockPush, null, null);
        //Collision bet block and enemy
        this.physics.add.overlap(enemy, slime, killEnemy, null , null);
        
    }

function update ()
{
   
    if(this.input.keyboard.checkDown(cursors.left, 250))
    {
        player.x -= 32;
       // player.anims.play('left', true);
    }
    else if(this.input.keyboard.checkDown(cursors.right, 250))
    {
        player.x += 32;
       // player.anims.play('right', true);
    }
   else if(this.input.keyboard.checkDown(cursors.up, 250))
    {
        player.y -= 32;
    }
    else if(this.input.keyboard.checkDown(cursors.down, 250))
    {
        player.y += 32;
    }
    else{
                player.setVelocityX(0);
              player.setVelocityY(0);
                player.anims.play('turn');
         }
             


	
}
function blockPush(player , slime)
{
    	 slime.setCollideWorldBounds(true);

   var diff = 0;
   var maxDiff= 50;
   if(player.x < slime.x )
    {
       
        slime.setVelocityX(160);
   }
  else if(player.x > slime.x )
  {
      
        slime.setVelocityX(-160);
   }
   else if(player.y < slime.y )
    {
      // slime.setActiveCollision();
        slime.setVelocityY(160);
   }
  else if(player.y > slime.y )
  {
       
        slime.setVelocityY(160);
   }
}
function killEnemy(enemy, slime)
{
 enemy.disableBody(true, true);
  //enemy.destory();
  
     score += 10;
    scoreText.setText('Score: ' + score);
}
function enemyMovement()
{
  graphics = this.add.graphics();

    follower = { t: 0, vec: new Phaser.Math.Vector2() };

    path = new Phaser.Curves.Path(50, 500);

    path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);

    path.lineTo(700, 300);

    path.lineTo(600, 350);

    path.ellipseTo(200, 100, 100, 250, false, 0);

    path.cubicBezierTo(222, 119, 308, 107, 208, 368);

    path.ellipseTo(60, 60, 0, 360, true);

    bounds = new Phaser.Geom.Rectangle();

    path.getBounds(bounds);

    this.tweens.add({
        targets: follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 4000,
        yoyo: true,
        repeat: -1
    });
}








 //       enemy movement
 //      enemyMovement();
 //    var path = new Phaser.Curves.Path(50, 500);

 //    path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
 //    path.lineTo(700, 300);
 //    path.lineTo(600, 350);
 //    path.ellipseTo(200, 100, 100, 250, false, 0);
 //    path.cubicBezierTo(222, 119, 308, 107, 208, 368);
 //    path.ellipseTo(60, 60, 0, 360, true);

 //    var graphics = this.add.graphics();

 //    //graphics.lineStyle(1, 0xffffff, 1);

 //    //path.draw(graphics, 128);

 // enemy = this.add.follower(path, 50, 500, 'enemy');

 //    enemy.startFollow({
 //        duration: 10000,
 //        yoyo: true,
 //        repeat: -1,
 //        rotateToPath: true,
 //        verticalAdjust: true
 //    });