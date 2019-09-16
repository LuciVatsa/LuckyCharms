
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
    var block;
    var cursors;
    var key;
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
    var isPressing;
    var name = 0;
    var blockCount=0;
    var currentBlockName;
    var isTouching = false;
    var temp;
;
var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);
function preload ()
{


       this.load.image('sky','background.png');
       this.load.image('slime', 'slime.png');
       this.load.image('block', 'trail.png');
       this.load.image('enemy', 'enemySkeleton.png');
       //this.load.image('redPortal', 'Vortex-red.png');
       //spirte loading
      this.load.spritesheet('redPortal', 'Vortex-Red.png',{ frameWidth:96, frameHeight:64});

      this.load.spritesheet('bluePortal', 'Vortex-Blue.png',{ frameWidth:96, frameHeight:64});
      //player loading
     this.load.image('player', 'Player.png');
}

function create ()
    {
    	//19 width boxes, 22 height boxes

        this.add.image(304,400,'sky');
        //enemy collision
        enemy = this.physics.add.group();

                // playercollision
                player = this.physics.add.sprite(16,16,'player');
                //player.setBounce(0.1);
                player.setCollideWorldBounds(true);

//block
  block = this.physics.add.sprite(X,Y,'block');
  block.visible = false;
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
        enemy= this.physics.add.group();
        enemy.create(400,400,'enemy');
        enemy.create(240,608 , 'enemy');



        //player score text
       scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
       //animation for redPortal
        this.anims.create({
            key: 'turnRed',
            frames: this.anims.generateFrameNumbers('redPortal', { start: 1, end: 8 }),
            frameRate: 15,
            repeat: -1
        });
        //animation for bluePortal
        this.anims.create({
            key: 'turnBlue',
            frames: this.anims.generateFrameNumbers('bluePortal', { start: 1, end: 8 }),
            frameRate: 15,
            repeat: -1
        });

      ;
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
        this.physics.add.overlap(enemy, slime, killEnemy, null , this);//adding colliders to game objects

        this.physics.add.collider(slime, slime);
      // this.physics.add.collider(player,enemy , killPlayer , null , null);
        this.physics.add.collider(enemy,player);
        //this.physics.add.collider(block,slime);
       this.physics.add.collider(slime , slime, stopBlock , null , null);

    // this.physics.add.collider(slime,portal , portalShift ,null , null);



this.input.keyboard.on("keyup_X",  function(event)
{

    isPressing = true;


},this);

// this.input.keyboard.on("keydown_UP",  function(event)
// {
//   player.setVelocityX(32*5);
// console.debug("hi");
//       player.setVelocityY(0);
//
// },this)

    }

function update ()
{
//console.debug(slime);
var multi = 4;
    if (cursors.left.isDown)
 {
   player.setVelocityX(-32*multi);
     player.setVelocityY(0);
     playerRight = 0;
       playerUp = -1;
   }

else if (cursors.right.isDown)
 {
     player.setVelocityX(32*multi);
      player.setVelocityY(0);
      playerRight = 1;
          playerUp = -1;
 }

 else if (cursors.up.isDown)
 {
     player.setVelocityY(-32*multi);
     player.setVelocityX(0);
     playerRight = -1;
     playerUp = 0;
 }
else if (cursors.down.isDown)
 {
     player.setVelocityY(32*multi);
     player.setVelocityX(0);
     playerRight = -1;
     playerUp = 1;
 }
    else{
            player.setVelocityX(0);
              player.setVelocityY(0);
        }
    if(this.keyA.isDown)
    {
    	console.log('Key Pressed');
         if(player.x < slime.x || player.x > slime.x)
         {
         	DestroyBlock(player,slime);
         }
    }
  //  console.debug(currentBlockName);
    slime.children.iterate(function (child)
    {

      if(child.name == currentBlockName)
      {

         test(child);
       }

    },this);


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
 enemy.disableBody(true, true);
//  enemy.destory();

     score += 10;
    scoreText.setText('Score: ' + score);
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

  if(playerRight == 1 &&isPressing == true)
    {

      slime.setImmovable(false);
      slime.setVelocityX(160);
       slime.setVelocityY(0);
      isRight = 1;
      isUp=-1

  }
  else if(playerRight == 0 && isPressing == true)
  {

    slime.setImmovable(false);
    slime.setVelocityX(-160);
    slime.setVelocityY(0);
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


    isUp=  0;
    isRight = -1;
  }
  //up to down
  else if( playerUp ==0 && isPressing == true)
  {


      slime.setImmovable(false);
      slime.setVelocityY(-160);
      slime.setVelocityX(0);

      isUp=  1;
      isRight = -1;
    }

  if(slime.body.velocity.x ==0)
  {

    slime.setImmovable(true);
  }
  else
  {

    slime.setImmovable(false);
  }
  if(slime.body.velocity.y ==0)
  {

    slime.setImmovable(true);
  }
  else
  {
    slime.setImmovable(false);
  }




//slime.setImmovable(false);

    //best feature in the game
//currentBlockName = null;
  isPressing =false;
}


  //delete later
  // this.anims.create({
  //     key: 'turn',
  //     frames: [ { key: 'dude', frame: 4 } ],
  //     frameRate: 20
  // });

  // this.anims.create({
  //     key: 'right',
  //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  //     frameRate: 10,
  //     repeat: -1
  // })
  // function portalShift(slime, portal)
  // {
  //
  //   if(portal.name == 'redPortal1' && isRed !=true  )
  //   {
  //
  //     slime.x = 108;
  //     slime.y = 108;
  //
  //     isRed = true;
  //
  //   }
  //   else if(portal.name == 'redPortal2' && isRed !=true  && isBlue !=true)
  //   {
  //     slime.x = 400;
  //     slime.y = 400;
  // isRed = true;
  //
  //   }
  //    if(portal.name == 'bluePortal1' && isBlue !=true)
  //    {
  //
  //      slime.x = 100;
  //      slime.y = 500;
  //      isBlue =true
  //    }
  //    else if(portal.name == 'bluePortal2' && isBlue !=true)
  //     {
  //
  //       slime.x = 400;
  //       slime.y = 600;
  //          isBlue =true
  //     }
  //
  //
  //      if(isRight == 1)
  //       {
  //         slime.setVelocityX(160);
  //         slime.setVelocityY(0);
  //         isRight = -1;
  //       }
  //       else if(isRight==0){
  //         slime.setVelocityX(-160);
  //         slime.setVelocityY(0);
  //         isRight = -1;
  //       }
  //     if(isUp==1){
  //         slime.setVelocityY(-160);
  //         slime.setVelocityX(0);
  //         isUp =-1;
  //     }
  //     else if(isUp==0){
  //         slime.setVelocityY(160);
  //         slime.setVelocityX(0);
  //         isUp =-1;
  //
  //     }
  // }
