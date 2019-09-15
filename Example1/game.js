
var config = {
        type: Phaser.AUTO,
        width: 608,
        height: 704,
        physics: {
            default: 'arcade',

            arcade: {
                gravity: { y: 0},
                debug: false
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
    var i;
    var block;
    var cursors;
    var key;
    var score = 0;
    var scoreText;
    var enemy;

    var blockCount = 0;
    var key;

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
    var currentBlockName;
var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);
function preload ()
{


       this.load.image('sky','background.png');
       this.load.image('slime', 'slime.png');
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
                player.setBounce(0.1);
                player.setCollideWorldBounds(true);


staticslime = this.physics.add.staticGroup();
staticslime.create(400,500 ,'slime').setScale(2).refreshBody();

        //Creating Slimes and blocks
      slime =this.physics.add.group();
        block = this.physics.add.group();
//testing purpose delete later


	
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
        if(i == 16 + 4*32||i == 16 + 5*32||i == 16 + 9*32||i == 16 + 10*32||i == 16 + 11*32||i == 16 + 12*32||i == 16 + 13*32)
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
    // i = 16; i <= 19*32; i+=32
    // i = 16; i <= 22*32; i+=32
    // block.create(i,j,'block').setCollideWorldBounds(true).setImmovable(true);
    // slime.create(i,j,'slime').setCollideWorldBounds(true).setImmovable(true);
    // enemy= this.physics.add.group();
    // enemy.create(48,208,'enemy');
    // enemy.create(240,608 , 'enemy');


        // playercollision
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

        
            cursors = this.input.keyboard.createCursorKeys();
            //portal
            portal = this.physics.add.staticGroup();

            //redportal

           //setting destroy button
                  this.keyA = this.input.keyboard.addKey('A');
            //key for pushing blocks
            this.keyX = this.input.keyboard.addKey('X');
            //this.physics.add.collider(player, slime);
            //Collision with the player
        this.physics.add.collider(player, slime, blockPush, null, null);
        // this.isTocuhing = this.physics.add.collider(player, slime);
        this.physics.add.overlap(enemy, slime, killEnemy, null , null);//adding colliders to game objects
        this.physics.add.collider(player,slime);
      //  this.physics.add.collider(slime, player);
      // this.physics.add.collider(player,enemy , killPlayer , null , null);
        this.physics.add.collider(enemy,player);
      this.physics.add.collider(slime , slime);

     //this.physics.add.collider(slime,portal , portalShift ,null , null);

       this.physics.add.collider(slime , slime );
    // this.physics.add.collider(slime,portal , portalShift ,null , null);

this.physics.add.collider(player, staticslime);

this.input.keyboard.on("keyup_X",  function(event)
{

    isPressing = true;



}
function update ()
{



if(this.input.keyboard.checkDown(cursors.left, 250))
{
    player.setVelocityX(-1600);
       // player.anims.play('left', true);
}
else if(this.input.keyboard.checkDown(cursors.right, 250))
{
    player.x +=32;
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
else
{
    player.setVelocityX(0);
    player.setVelocityY(0);
}
    


if(this.key.isDown)

 // if(this.input.keyboard.checkDown(cursors.left, 500))
 //    {
 //      player.x -=32;
 //        playerRight = 0;
 //        playerUp = -1;
 //        //player.setVelocityX(-160);
 //       // player.anims.play('left', true);
 //    }
 //     if(this.input.keyboard.checkDown(cursors.right, 500))
 //    {
 //        player.x +=32;
 //        playerRight = 1;
 //        playerUp = -1;
 //      //  player.setVelocityX(160);
 //       // player.anims.play('right', true);
 //    }
 //    if(this.input.keyboard.checkDown(cursors.up, 500))
 //    {
 //       player.y -= 16;
 //        playerRight = -1;
 //      //  player.setVelocityY(-160);
 //        playerUp = 0;
 //    }
 //     if(this.input.keyboard.checkDown(cursors.down, 500))
 //    {
 //        player.y += 16;
 //        playerRight = -1;
 //        playerUp = 1;
 //                //player.setVelocityY(160);
 //    }
//  var currentX = player.x;
//  var n= 0;
//     //console.debug("x"+currentX);
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
        DestroyBlock(this.slime);
    }
  //  console.debug(currentBlockName);
    slime.children.iterate(function (child)
    {
      if(child.name == currentBlockName)
      {
         test(child);

      }
    });
//console.debug(playerUp);

}

//block movement
function blockPush(player , slime)
{
currentBlockName = slime.name;
  //  slime.setImmovable(false);
//test(slime);
}
//Kill Function
function killEnemy(enemy, slime)
{
 enemy.disableBody(true, true);
  //enemy.destory();

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
  slime.setImmovable(true);
}
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

function test(slime)
{

    // if(slime.name == currentBlockName)
    // {

  if(playerRight == 1 &&isPressing == true)
  {

      slime.setVelocityX(160);
      slime.setVelocityY(0);
      isRight = 1;
      isUp=-1

  }
  else if(playerRight == 0 && isPressing == true)
  {

    slime.setVelocityX(-160);
    slime.setVelocityY(0);
    isRight = 0;
    isUp=-1;
  }
  //  //down to top
  else if(playerUp ==1 &&isPressing == true)
  {

    // slime.setActiveCollision();

    slime.setVelocityY(160);
    slime.setVelocityX(0);
    isUp=  0;
    isRight = -1;
  }
  //up to down
  else if( playerUp ==0 && isPressing == true)
  {

      slime.setVelocityY(-160);
      slime.setVelocityX(0);
      isUp=  1;
      isRight = -1;
  }
  isPressing =false;
  isTouching = false;
     //left to right
  }
