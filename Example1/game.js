<<<<<<< Updated upstream
=======
var player;
var slime;
var block;
var cursors;
var timer = 0;
var currEnemyX = 0;
var currEnemyY = 0;
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
var currentBlockName = null;
var isTouching =false;
var temp;
var bgMusic;
var slimePush;
var monsterDeath;
var timeScale ;
var health =100;
var healthBarText;

var healthBarGreen;
var spacebar;
var multi = 4;
var path;
var bounds;
var graphics;
var greenFlask;
var greenFlask2;
var greenFlask3;
var sec = 1000;
var healthBarRed;
var StartGame = new Phaser.Class({
    Extends:Phaser.Scene,
    initialize: function BootScene(){
        Phaser.Scene.call(this,{
            key:'StartGame',
            active:false
        })
    },




preload:function  ()
{
>>>>>>> Stashed changes


var config = {
        type: Phaser.AUTO,
        parent: 'element',
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
    var currentBlockName = null;
    var isTouching =false;
    var temp;
    var bgMusic;
    var slimePush;
    var monsterDeath;
    var timeScale ;
    var health =100;
    var healthBarText;

    var healthBarGreen;
    var spacebar;
    var multi = 4;
    var path;
    var bounds;
    var graphics;
    var greenFlask;
    var sec = 1000;
	 var game = new Phaser.Game(config);

function preload ()
{

  var healthBarRed;
       this.load.image('sky','background.png');
       //this.load.image('slime', 'slime.png');
       this.load.image('block', 'trail.png');
       this.load.image('enemy', 'enemySkeleton.png');
       this.load.image('GameOver','GameOver.png');
       this.load.image('health', 'GreenFlask.png');
       //this.load.image('redPortal', 'Vortex-red.png');
       //spirte loading
      this.load.spritesheet('hazmat', 'playerRed.png',{ frameWidth:32, frameHeight:32});
      this.load.spritesheet('enemyAnimation', 'Skeleton-A.png',{ frameWidth:38, frameHeight:38});
      //color change blocks
      this.load.spritesheet('slime', 'slime.png',{ frameWidth:32, frameHeight:32}) ;

      //Audio sprites
      this.load.audio('backGroundAudio', 'backGroundAudio.mp3');
      this.load.audio('deathMonster', 'deathMonster.mp3');
      this.load.audio('slimePush', 'slimePush.mp3');
      this.load.image('greenBar', 'TeleMeterGreen.png');
      this.load.image('redBar', 'TeleMeter.png');
}

function create ()
{
    	//19 width boxes, 22 height boxes

      game.scene.add('endGame', GameOver);

        this.add.image(304,352,'sky');

        // greenFlask = this.physics.add.group();
        // greenFlask.create(500,500,'health');
        //   greenFlask.create(100,670,'health');
        //     greenFlask.create(400,270,'health');
        greenFlask =this.physics.add.image(500,500,'health').setScale(1.5);
        greenFlask2  =this.physics.add.image(100,670,'health').setScale(1.5);
      //  greenFlask3  =this.physics.add.image(400,270,'health').setScale(1.5);

  //Health bar
  {
    healthBarGreen = this.add.image(400,10,'greenBar');
    healthBarRed = this.add.image(400,10,'redBar');
    healthBarRed.fixedToCamera = true;
  }
        //audio
    bgMusic = this.sound.add('backGroundAudio');
      bgMusic.loop = true;
        bgMusic.play();
        //audio
        //death audio
        monsterDeath = this.sound.add('deathMonster');
        //pushing audio
        slimePush = this.sound.add('slimePush');
        //enemy delcaration
{
        enemy = this.physics.add.sprite(240,608, 'enemySkeleton');
        enemy.setCollideWorldBounds(true);
        enemy.setSize(32,32,true);
        enemy1 = this.physics.add.sprite(400,400, 'enemySkeleton');
        enemy1.setCollideWorldBounds(true);
        enemy1.setSize(32,32,true);
        enemy2 = this.physics.add.sprite(592,48, 'enemySkeleton');
        enemy2.setCollideWorldBounds(true);
        enemy2.setSize(32,32,true);
}
                // playercollision
               player = this.physics.add.sprite(16,16,'hazmat');
                //player.setBounce(0.1);
                player.setCollideWorldBounds(true);
                player.setSize(25,25 ,true);

//block
//  block.setCollideWorldBounds(true);
  //Creating Slimes and blocks
      slime =this.physics.add.group();


//level design for the slime
{
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
    }

        //player score text
        //healthBarText= this.add.text(300, 16, 'health: 100', { fontSize: '32px', fill: '#000' });
       scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
//All Animation;
{
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
     this.anims.create({
      key: 'turnRed',
      frames: [ { key: 'hazmat', frame: 46 } ],
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
}
//all physics setColliders
{
            cursors = this.input.keyboard.createCursorKeys();
            //portal
            portal = this.physics.add.staticGroup();
           //setting destroy button
            this.keyA = this.input.keyboard.addKey('A');
            //key for pushing blocks
          spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            //Collision with the player
       this.physics.add.collider(player, slime);


        this.physics.add.collider(enemy, slime, killEnemy, null , this);
        //adding colliders to game objects
        this.physics.add.collider(enemy2, slime, killEnemy, null , this);
        this.physics.add.collider(enemy1, slime, killEnemy, null , this);
        this.physics.add.collider(slime, slime);
      this.physics.add.collider(player,enemy , killPlayer , null , this);
      this.physics.add.collider(player,enemy1 , killPlayer , null , this);
      this.physics.add.collider(player,enemy2 , killPlayer , null , this);
      this.physics.add.collider(greenFlask,player, addHealth, null ,this);
      this.physics.add.collider(greenFlask2,player, addHealth, null ,this);
    //  this.physics.add.collider(greenFlask3,player, addHealth, null ,this);
       this.physics.add.collider(slime , slime);

}
inGameTime = this.time.addEvent(
  {
    delay:sec,
    callback: reduceHealth,
    callbackScope:this,
    loop : true
  }
);

}


function update (time , delta)
{
  healthBarRed.scaleX = health/100;
  healthBarRed.scaleY = 1;

//console.debug(slime);
 check++;
//enemy Ai
{
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
}
//move player
move(player);

 //no idea about this function
  if(this.keyA.isDown)
  {
   	console.log('Key Pressed');
    if(player.x < slime.x || player.x > slime.x)
   {
       	DestroyBlock(player,slime);
   }
}
if(score == 60)
{
  this.scene.stop('StartGame');
this.scene.start('WinGame');
}
  if (Phaser.Input.Keyboard.JustDown(spacebar) )
  {
    isPressing = !isPressing;
  }
//go thro each slime block
  slime.children.iterate(function (child)
    {
      if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), child.getBounds())) {
          //console.debug("Contact");
          currentBlockName = child.name;
       }

      if(child.name == currentBlockName)
      {

         //test(child);
         if(isPressing == false)
         {
           child.setTint(0xff0000);
           move(player);

         }
         else
         {
   child.setImmovable(false);
           player.setVelocityX (0);
           player.setVelocityY(0);
           player.anims.play('turnRed');
         moveMonster(child);
           health = health - .05;
       }
      }
       else
       {


         child.setTint(0xffffff);
       }
       if(child.body.velocity.x ==0 && child.body.velocity.y ==0 )
       {
         child.setImmovable(true);
       }
    },this);
    if(health <=0)
    {
      killPlayer(player);
    }

}

//block movement
function blockPush(player , slime)
{
isTouching = true;
// currentBlockName = slime.name;
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
function move(player)
{
  //console.debug(player);
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
}
function moveMonster(slime)
{
  slime.setImmovable(false);
  if (cursors.left.isDown)
{
slime.setVelocityX(-32*multi);
   slime.setVelocityY(0);
  // slime.anims.play('turnLeftPlayer', true);
   playerRight = 0;
   playerUp = -1;
}
else if (cursors.right.isDown)
{
   slime.setVelocityX(32*multi);
   slime.setVelocityY(0);
   //player.anims.play('turnRightPlayer', true);
   playerRight = 1;
   playerUp = -1;
}
else if (cursors.up.isDown)
{

   slime.setVelocityY(-32*multi);
   slime.setVelocityX(0);
   //player.anims.play('turnUpPlayer', true);
   playerRight = -1;
   playerUp = 0;
}
else if (cursors.down.isDown)
{
   slime.setVelocityY(32*multi);
   slime.setVelocityX(0);
   //player.anims.play('turnDownPlayer', true);
   playerRight = -1;
   playerRight = -1;
   playerUp = 1;
}
else
{
       slime.setVelocityX(0);
       slime.setVelocityY(0);
      // player.anims.play('idlePlayer');
 }

}
function addHealth(greenFlask)
{

    greenFlask.disableBody(true,true);
    health = health +20;
}
function addHealth(greenFlask2)
{

    greenFlask2.disableBody(true,true);
    health = health +20;
}
function addHealth(greenFlask3)
{

    greenFlask3.disableBody(true,true);
    health = health +20;
}
function reduceHealth()
{
  health =health - 2;
//  console.debug(health);

}
function killPlayer(player)
{


    player.setTint(0xff0000);

    player.anims.play('turn');

this.scene.start('GameOver');
  //  console.debug(this.scene.isActive(endgame));
}
