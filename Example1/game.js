
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


	slime.create(272,512,'slime').setCollideWorldBounds(true).setImmovable(true);
  //slime.create(400,300,'slime').setCollideWorldBounds(true).setImmovable(true);
  //slime.create(400,500,'slime').setCollideWorldBounds(true).setImmovable(true);
		// for (var i = 16; i <= 19*32; i+=32)
    //     {
    //     	for (var j = 16; j <= 22*32; j+=32)
    //     	{
    //     		if((Math.floor(Math.random()*10)%4)==0 && i!=302 && j!=368)
    //     		{
    //     			if((i+j)%100==0 && Math.floor(Math.random()*2))
    //     			{
    //     				block.create(i,j,'block').setCollideWorldBounds(true).setImmovable(true);
    //     			}
    //     			else
    //     			{
    //     				slime.create(i,j,'slime').setCollideWorldBounds(true).setImmovable(true);
    //     			}
    //     		}
    //
    //     	}
    //    	}
        enemy= this.physics.add.group();
        enemy.create(48,208,'enemy');
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
        // });
            cursors = this.input.keyboard.createCursorKeys();
            //portal
            portal = this.physics.add.staticGroup();

            //redportal
         //    portal.create(400,400,'redPortal').play('turnRed').setName('redPortal1');
         //  portal.create(100,100,'redPortal').play('turnRed').setName('redPortal2');
         //
         //    //blueportal
         // portal.create(400,600,'bluePortal').play('turnBlue').setName('bluePortal1');
         //   portal.create(100,500,'bluePortal').play('turnBlue').setName('bluePortal2');

           //setting destroy button
                  this.keyA = this.input.keyboard.addKey('A');
            //key for pushing blocks
            this.keyX = this.input.keyboard.addKey('X');
            //this.physics.add.collider(player, slime);
            //Collision with the player
        this.physics.add.collider(player, slime, blockPush, null, null);
        this.physics.add.overlap(enemy, slime, killEnemy, null , null);//adding colliders to game objects
        this.physics.add.collider(player,slime);
      //  this.physics.add.collider(slime, player);
        //this.physics.add.collider(player,enemy);
        this.physics.add.collider(enemy,player);
       this.physics.add.collider(slime , slime );
    // this.physics.add.collider(slime,portal , portalShift ,null , null);

this.physics.add.collider(player, staticslime);

this.input.keyboard.on("keyup_X",  function(event)
{

    isPressing = !isPressing;


},this)
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


console.debug(isPressing);
//testing
// console.debug('x'+player.x);
// console.debug('y'+ player.y)
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

   }

else if (cursors.right.isDown)
 {
     player.setVelocityX(32*multi);
      player.setVelocityY(0);
 }

 else if (cursors.up.isDown)
 {
     player.setVelocityY(-32*multi);
     player.setVelocityX(0);
 }
else if (cursors.down.isDown)
 {
     player.setVelocityY(32*multi);
     player.setVelocityX(0);
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
         	DestroyBlock(this.player,this.slime);
         }
    }


}

//block movement
function blockPush(player , slime)
{

  if(isPressing == true)
  {
      console.debug('punda'+isPressing);
    slime.setImmovable(false);

   //left to right
    if(playerRight == 1)
    {

        slime.setVelocityX(160);
        slime.setVelocityY(0);
        isRight = 1;
        isUp=-1

   }
    else if(playerRight == 0)
   {

      slime.setVelocityX(-160);
      slime.setVelocityY(0);
      isRight = 0;
      isUp=-1;
   }
  //  //down to top
    else if(playerUp ==1 )
    {

      // slime.setActiveCollision();

      slime.setVelocityY(160);
      slime.setVelocityX(0);
      isUp=  0;
      isRight = -1;
   }
   //up to down
    else if( playerUp ==0)
  {

        slime.setVelocityY(-160);
        slime.setVelocityX(0);
        isUp=  1;
        isRight = -1;
   }
   isPressing =false;
}
else
{
  slime.setImmovable(true);
}
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
