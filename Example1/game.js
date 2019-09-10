
var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 800,
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
    var platform;
    var cursors;
    var score = 0;
    var scoreText;
    var enemy;
    var X= 100;
    var Y= 500;
    var follower;
var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);
function preload ()
{
	

       this.load.image('sky','sky.png');
       this.load.image('platform', 'block.png');
       this.load.image('enemy', 'Cowboy_man.png');
       //spirte loading
       this.load.spritesheet('dude', 'dude.png',{ frameWidth:32, frameHeight:48});
}

function create ()
    {
        
        this.add.image(400,300,'sky').setScale(1.7);
        //enemy collision
        enemy= this.physics.add.group();
        enemy.create(100,600,'enemy');
        enemy.create(X,Y , 'enemy');
//platform collision
        platform =this.physics.add.group(); 
        platform.create(100,300,'platform');
        platform.create(300,500,'platform');
       
        //enemy movement
      //enemyMovement();
    // var path = new Phaser.Curves.Path(50, 500);

    // path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
    // path.lineTo(700, 300);
    // path.lineTo(600, 350);
    // path.ellipseTo(200, 100, 100, 250, false, 0);
    // path.cubicBezierTo(222, 119, 308, 107, 208, 368);
    // path.ellipseTo(60, 60, 0, 360, true);

    // var graphics = this.add.graphics();

    // graphics.lineStyle(1, 0xffffff, 1);

    // path.draw(graphics, 128);

    // var lemming = this.add.follower(path, 50, 500, enemy);

    // lemming.startFollow({
    //     duration: 10000,
    //     yoyo: true,
    //     repeat: -1,
    //     rotateToPath: true,
    //     verticalAdjust: true
    // });
        // playercollision 
        player = this.physics.add.sprite(100,100,'dude');
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
        
        this.physics.add.collider(player, platform);
        this.physics.add.collider(player, platform, blockPush, null, null);
        this.physics.add.overlap(enemy, platform, killEnemy, null , null);
        //Collision with the player
        
    }

function update ()
{
   
    if(this.input.keyboard.checkDown(cursors.left, 250))
    {
        player.x -= 16;
        player.anims.play('left', true);
    }
    else if(this.input.keyboard.checkDown(cursors.right, 250))
    {
        player.x += 16;
        player.anims.play('right', true);
    }
   else if(this.input.keyboard.checkDown(cursors.up, 250))
    {
        player.y -= 16;
    }
    else if(this.input.keyboard.checkDown(cursors.down, 250))
    {
        player.y += 16;
    }
    else{
                player.setVelocityX(0);
              player.setVelocityY(0);
                player.anims.play('turn');
         }
             


	
}
function blockPush(player , platform)
{
    	 platform.setCollideWorldBounds(true);

   var diff = 0;
   var maxDiff= 50;
   if(player.x < platform.x )
    {
       
        platform.setVelocityX(160);
   }
  else if(player.x > platform.x )
  {
      
        platform.setVelocityX(-160);
   }
   else if(player.y < platform.y )
    {
      // platform.setActiveCollision();
        platform.setVelocityY(160);
   }
  else if(player.y > platform.y )
  {
       
        platform.setVelocityY(160);
   }
}
function killEnemy(enemy, platform)
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