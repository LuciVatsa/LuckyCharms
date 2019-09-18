

var config = {
        type: Phaser.AUTO,
        width: 608,
        height: 704,
        key: 'main',
        physics: {
            default: 'arcade',

            arcade: {
                gravity: { y: 0},
                debug: false
            }
          },
          audio: {
      disableWebAudio: true
  },
        scene: {
            preload: preload,
            create: create,
            update: update

        }

    };



    var player;
    var slime;
    var block;
    var cursors;
    var key;
    var check=0;
    var score = 0;
    var scoreText;
    var enemy;
    var keyA;
    var keyX;
    var X= 100;
    var Y= 500;
    var follower;
    var portal;
    var isRight =-1;
    var playerRight =-1;
    var playerUp= -1;
    var isUp = -1;
    var isRed = false;
    var isBlue = false;
    var staticslime;
    var isPressing = false;
    var name = 0;
    var blockCount=0;
    var currentBlockName;
    var isTouching;
    var temp;
    var bgMusic;
    var slimePush;
    var monsterDeath;
  var timeScale ;
    var health =100;

var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);

function preload ()
{


       this.load.image('sky','background.png');
       //this.load.image('slime', 'slime.png');
       this.load.image('block', 'trail.png');
       this.load.image('enemy', 'enemySkeleton.png');
       this.load.image('GameOver','GameOver.png');
       //this.load.image('redPortal', 'Vortex-red.png');
       //spirte loading
      this.load.spritesheet('hazmat', 'Hazmat-A.png',{ frameWidth:38, frameHeight:38});
      this.load.spritesheet('enemyAnimation', 'Skeleton-A.png',{ frameWidth:38, frameHeight:38});
      //color change blocks
      this.load.spritesheet('slime', 'slime.png',{ frameWidth:32, frameHeight:32}) ;

      //Audio sprites
      this.load.audio('backGroundAudio', 'backGroundAudio.mp3');
      this.load.audio('deathMonster', 'deathMonster.mp3');
      this.load.audio('slimePush', 'slimePush.mp3');


}

function create ()
    {
    	//19 width boxes, 22 height boxes

game.scene.add('endGame', GameOver);
//endgame.isvisible = false;
        this.add.image(304,352,'sky');
        //enemy collision

        //audio
    bgMusic = this.sound.add('backGroundAudio');
      bgMusic.loop = true;
        bgMusic.play();
        //audio
        //death audio
        monsterDeath = this.sound.add('deathMonster');
        //pushing audio
        slimePush = this.sound.add('slimePush');

        enemy = this.physics.add.sprite(240,608, 'enemySkeleton');
        enemy.setCollideWorldBounds(true);
        enemy.setSize(32,32,true);
        enemy1 = this.physics.add.sprite(400,400, 'enemySkeleton');
        enemy1.setCollideWorldBounds(true);
        enemy1.setSize(32,32,true);
        enemy2 = this.physics.add.sprite(592,48, 'enemySkeleton');
        enemy2.setCollideWorldBounds(true);
        enemy2.setSize(32,32,true);

                // playercollision
               player = this.physics.add.sprite(16,16,'hazmat');
                //player.setBounce(0.1);
                player.setCollideWorldBounds(true);
                player.setSize(25,25 ,true);

//block

//  block.setCollideWorldBounds(true);

        //Creating Slimes and blocks
      slime =this.physics.add.group();




for(i = 48; i <= 21*32; i+=32)
    {
    	if(i != 16 + 15*32&&i != 16 + 14*32)
    	{
    		slime.create(16+3*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
    	if(i == 16 + 12*32||i == 16 + 13*32||i == 16 + 14*32||i == 16 + 15*32||i == 16 + 16*32||i == 16 + 17*32||i == 16 + 18*32)
    	{
    		slime.create(16+6*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
    	if(i == 16 + 9*32||i == 16 + 10*32||i == 16 + 11*32||i == 16 + 12*32||i == 16 + 13*32)
    	{
    		slime.create(16+9*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
        if(i!=16+13*32&&i!=16+14*32)
        {
        	slime.create(16+16*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
        }
        if(i == 16 + 5*32||i == 16 + 9*32||i == 16 + 10*32||i == 16 + 11*32||i == 16 + 12*32||i == 16 + 13*32)
        {
        	slime.create(16+13*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
        }
        if(i==16+15*32||i==16+16*32||i==16+17*32||i==16+18*32)
        {
        	slime.create(16+11*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);

        }
        if(i==16+1*32||i==16+2*32)
        {
        	slime.create(16+10*32,i,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);

        }
    }
    for(i=48; i<=18*32;i+=32)
    {
    	if(i==16+7*32||i==16+8*32||i==16+9*32||i==16+9*32||i==16+10*32)
    	{
    		slime.create(i,16+3*32,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);

    	}
    	if(i==16+13*32)
    	{
    		slime.create(i,16+4*32,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
    	if(i!=16+1*32&&i!=16+2*32&&i!=16+3*32&&i!=16+14*32&&i!=16+15*32&&i!=16+16*32&&i!=16+17*32)
    	{
    		slime.create(i,16+6*32,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
    	if(i==16+6*32||i==16+7*32||i==16+8*32||i==16+10*32||i==16+11*32||i==16+12*32||i==16+14*32||i==16+15*32)
    	{
    		slime.create(i,16+9*32,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}
    	if(i==16+9*32||i==16+10*32||i==16+11*32||i==16+12*32||i==16+13*32)
    	{
    		slime.create(i,16+19*32,'slime').setCollideWorldBounds(true).setImmovable(true).setName('block' + blockCount++);
    	}

    }

    // var points = [];

    // points.push(new Phaser.Math.Vector2(16+11*32, 16+8*32));
    // points.push(new Phaser.Math.Vector2(16+12*32, 16+12*32));
    // points.push(new Phaser.Math.Vector2(16+14*32, 16+17*32));
    // points.push(new Phaser.Math.Vector2(16+17*32, 16+6*32));
    // points.push(new Phaser.Math.Vector2(16+1*32, 16+3*32));

    // var curve = new Phaser.Curves.Spline(points);

    // var playerFollow = this.add.follower(curve, 50, 400, 'enemy');

    // playerFollow.startFollow({
    //     duration: 6000,
    //     yoyo: true,
    //     repeat: -1,
    //     rotateToPath: true,
    //     startAt: 0.5
    // });

    // this.input.on('pointerdown', function () {

    //     if (playerFollow.isFollowing())
    //     {
    //         playerFollow.pauseFollow();
    //     }
    //     else
    //     {
    //         playerFollow.resumeFollow();
    //     }

    // });
        // enemy= this.physics.add.group();
        // enemy.create(400,400,'enemy');
        // enemy.create(240,608 , 'enemy');



        //player score text
       scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
       //animation for redPortal
        this.anims.create({
            key: 'turnRightPlayer',
            frames: this.anims.generateFrameNumbers('hazmat', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
        //Player Animation
        this.anims.create({
         key: 'idlePlayer',
         frames: [ { key: 'hazmat', frame: 13 } ],
         frameRate: 20
     });
        this.anims.create({
            key: 'turnLeftPlayer',
            frames: this.anims.generateFrameNumbers('hazmat', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnDownPlayer',
            frames: this.anims.generateFrameNumbers('hazmat', { start: 12, end: 17}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnUpPlayer',
            frames: this.anims.generateFrameNumbers('hazmat', { start: 18, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnRightPlayer',
            frames: this.anims.generateFrameNumbers('hazmat', { start: 1, end: 6 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
         key: 'idlePlayer',
         frames: [ { key: 'hazmat', frame: 13 } ],
         frameRate: 20
     });
        //animation for enemySkeleton
        this.anims.create({
         key: 'idleSkeleton',
         frames: [ { key: 'enemyAnimation', frame: 13 } ],
         frameRate: 20
     });
        this.anims.create({
            key: 'turnLeftSkeleton',
            frames: this.anims.generateFrameNumbers('enemyAnimation', { start: 6, end: 12 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnUpSkeleton',
            frames: this.anims.generateFrameNumbers('enemyAnimation', { start: 13, end: 18}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnDownSkeleton',
            frames: this.anims.generateFrameNumbers('enemyAnimation', { start: 18, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnRightSkeleton',
            frames: this.anims.generateFrameNumbers('enemyAnimation', { start: 1, end: 6 }),
            frameRate: 15,
            repeat: -1
        });
//block change Animation
this.anims.create({
    key: 'turnBlockColorRed',
    frames: [ { key: 'slime', frame: 1 } ],
    frameRate: 15,
    repeat: -1
});
this.anims.create({
    key: 'turnBlockColorGreen',
    frames: [ { key: 'slime', frame: 0 } ],
    frameRate: 15,
    repeat: -1
});

            cursors = this.input.keyboard.createCursorKeys();
            //portal
            portal = this.physics.add.staticGroup();
           //setting destroy button
                  this.keyA = this.input.keyboard.addKey('A');
            //key for pushing blocks
            this.keyX = this.input.keyboard.addKey('X');

            //Collision with the player
       this.physics.add.collider(player, slime, blockPush, null, null);

        // this.isTocuhing = this.physics.add.collider(player, slime);
        this.physics.add.collider(enemy, slime, killEnemy, null , this);
        //adding colliders to game objects
        this.physics.add.collider(enemy2, slime, killEnemy, null , this);
        this.physics.add.collider(enemy1, slime, killEnemy, null , this);
        this.physics.add.collider(slime, slime);
      this.physics.add.collider(player,enemy , killPlayer , null , this);
      this.physics.add.collider(player,enemy1 , killPlayer , null , this);
      this.physics.add.collider(player,enemy2 , killPlayer , null , this);
        //this.physics.add.collider(enemy,player);
        //this.physics.add.collider(block,slime);
       this.physics.add.collider(slime , slime, stopBlock , null , null);
//this.physics.add.collider(player, slime);
    // this.physics.add.collider(slime,portal , portalShift ,null , null);

//endGame=this.add.image(304,352,'GameOver');

this.input.keyboard.on("keyup_X",  function(event)
{

    isPressing =!isPressing;
console.debug(isTouching);

},this);
inGameTime = this.time.addEvent(
  {
    delay:1000,
    callback: reduceHealth,
    callbackScope:this,
    loop : true
  }
);
}
function update (time , delta)
{
//console.debug(slime);
 check++;

 if(enemy.x > player.x&&check>=1*60&&check<2*60)
 {
  enemy.setVelocityX(-64);
  enemy.anims.play('turnLeftSkeleton', true);
 }
 if(enemy.y > player.y&&check>=2*60&&check<3*60)
 {
  enemy.setVelocityY(-64);
  enemy.anims.play('turnUpSkeleton', true);
 }
 if(enemy.x<player.x && check>=3*60&&check<4*60)
 {
  enemy.setVelocityX(64);
  enemy.anims.play('turnRightSkeleton',true);
 }
 if(enemy.y<player.y && check>=4*60&&check<5*60)
 {
  enemy.setVelocityY(64);
  enemy.anims.play('turnDownSkeleton', true);
 }
 if(check>5*60)
 {
  check=0;
 }
 if(enemy1.x > player.x&&check>=1*60&&check<2*60)
 {
  enemy1.setVelocityX(-64);
  enemy1.anims.play('turnLeftSkeleton', true);
 }
 if(enemy1.y > player.y&&check>=2*60&&check<3*60)
 {
  enemy1.setVelocityY(-64);
  enemy1.anims.play('turnUpSkeleton', true);
 }
 if(enemy1.x<player.x && check>=3*60&&check<4*60)
 {
  enemy1.setVelocityX(64);
  enemy1.anims.play('turnRightSkeleton',true);
 }
 if(enemy1.y<player.y && check>=4*60&&check<5*60)
 {
  enemy1.setVelocityY(64);
  enemy1.anims.play('turnDownSkeleton', true);
 }
 if(check>5*60)
 {
  check=0;
 }
 if(enemy2.x > player.x&&check>=1*60&&check<2*60)
 {
  enemy2.setVelocityX(-64);
  enemy2.anims.play('turnLeftSkeleton', true);
 }
 if(enemy2.y > player.y&&check>=2*60&&check<3*60)
 {
  enemy2.setVelocityY(-64);
  enemy2.anims.play('turnUpSkeleton', true);
 }
 if(enemy2.x<player.x && check>=3*60&&check<4*60)
 {
  enemy2.setVelocityX(64);
  enemy2.anims.play('turnRightSkeleton',true);
}
 if(enemy2.y<player.y && check>=4*60&&check<5*60)
 {
  enemy2.setVelocityY(64);
  enemy2.anims.play('turnDownSkeleton', true);
 }
 if(check>5*60)
 {
  check=0;
 }





 var multi = 4;
 if (cursors.left.isDown)
 {
	player.setVelocityX(-32*multi);
    player.setVelocityY(0);
    player.anims.play('turnLeftPlayer', true);
    playerRight = 0;
    playerUp = -1;
 }
 else if (cursors.right.isDown)
 {
    player.setVelocityX(32*multi);
    player.setVelocityY(0);
    player.anims.play('turnRightPlayer', true);
    playerRight = 1;
    playerUp = -1;
 }
 else if (cursors.up.isDown)
 {

    player.setVelocityY(-32*multi);
    player.setVelocityX(0);
    player.anims.play('turnUpPlayer', true);
    playerRight = -1;
    playerUp = 0;
 }
 else if (cursors.down.isDown)
 {
    player.setVelocityY(32*multi);
    player.setVelocityX(0);
    player.anims.play('turnDownPlayer', true);
    playerRight = -1;
    playerRight = -1;
    playerUp = 1;
 }
 else
 {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('idlePlayer');
  }
  if(this.keyA.isDown)
  {
   	console.log('Key Pressed');
    if(player.x < slime.x || player.x > slime.x)
   {
       	DestroyBlock(player,slime);
   }
}


    slime.children.iterate(function (child)
    {
      if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), child.getBounds())) {
          //console.debug("works");
          isTouching = true;
       }
       else
       {
         isTouching = false;
       }
      if(child.name == currentBlockName)
      {
        child.setTint(0xff0000);
         test(child);
       }
       else
       {
         child.setTint(0xffffff);
       }
    },this);


// let inGameTime = Phaser.Math.Snap.To(this.time.now/1000, 1);
// if(inGameTime == this.time.now/1000)
//   console.debug(health);
//console.debug(playerUp);

}

//block movement
function blockPush(player , slime)
{

currentBlockName = slime.name;
//test(slime);
}
//Kill Function
function killEnemy(enemy, slime)
{

//  monsterDeath.play();
if(slime.name == currentBlockName)
{
 enemy.disableBody(true, true);
 score += 10;
scoreText.setText('Score: ' + score);
}
//  enemy.destory();


}

// Destroy Blocks
function DestroyBlock(player, slime)
{
	this.slime.disableBody(true,true);
}
//stop the block after hitting a blocks
function stopBlock(slime, slime )
{

}

function test(slime)
{

  if(playerRight == 1 && isPressing == true)
  {

  slime.setImmovable(false);
      slime.setVelocityX(160);
       slime.setVelocityY(0);
       slimePush.play();
      //slime.anims.play('turnBlockColorRed');
      isRight = 1;
      isUp=-1

  }
  else if(playerRight == 0 && isPressing == true)
  {

  slime.setImmovable(false);
    slime.setVelocityX(-160);
    slime.setVelocityY(0);
    slimePush.play();
    //slime.anims.play('turnBlockColorRed',true);
    isRight = 0;
    isUp=-1;
  }
  //  //down to top
  else if(playerUp ==1 &&isPressing == true)
  {

    // slime.setActiveCollision();

  slime.setImmovable(false);
    slime.setVelocityY(160);
    slime.setVelocityX(0);
    //slime.anims.play('turnBlockColorRed',true);
    slimePush.play();


    isUp=  0;
    isRight = -1;
  }
  //up to down
  else if( playerUp ==0 && isPressing == true)
  {


  slime.setImmovable(false);
      slime.setVelocityY(-160);
      slime.setVelocityX(0);
      //slime.anims.play('turnBlockColorRed',true);
      slimePush.play();

      isUp=  1;
      isRight = -1;
    }

  if(slime.body.velocity.x ==0 && slime.body.velocity.y ==0)
  {
    slime.setTint(0xffffff);
    slime.setImmovable(true);
  }
  else if (slime.body.velocity.x ==160 && slime.body.velocity.y ==0 )
  {

    slime.setImmovable(false);

}
  else if(slime.body.velocity.y ==160 && slime.body.velocity.x ==0)
  {

    slime.setImmovable(false);

  }



    //best feature in the game
//currentBlockName = null;
  // isPressing =false;
}


function reduceHealth()
{
  health =health - 1;
//  console.debug(health);

}
function killPlayer(player,enemy)
{
  this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

this.scene.start('GameOver');
  //  console.debug(this.scene.isActive(endgame));
}
