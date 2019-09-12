
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
    var key;
    var X= 100;
    var Y= 500;
    var follower;
    var portal;
    var isRight =-1;
    var isUp = -1;
    var isRed = false;
    var isBlue = false;
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


        //Creating Slimes and blocks
        slime =this.physics.add.group();
        block = this.physics.add.group();


		for (var i = 16; i <= 19*32; i+=32)
        {
        	for (var j = 16; j <= 22*32; j+=32)
        	{
        		if((Math.floor(Math.random()*10)%4)==0 && i!=302 && j!=368)
        		{
        			if((i+j)%100==0 && Math.floor(Math.random()*2))
        			{
        				block.create(i,j,'block').setCollideWorldBounds(true).setImmovable(true);
        			}
        			else
        			{
        				slime.create(i,j,'slime').setCollideWorldBounds(true).setImmovable(true);
        			}
        		}

        	}
       	}
        enemy= this.physics.add.group();
        enemy.create(48,208,'enemy');
        enemy.create(240,608 , 'enemy');


        // playercollision
        player = this.physics.add.sprite(302,368,'player');
        player.setCollideWorldBounds(true);

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
            portal.create(400,400,'redPortal').play('turnRed').setName('redPortal1');
          portal.create(100,100,'redPortal').play('turnRed').setName('redPortal2');

            //blueportal
         portal.create(400,600,'bluePortal').play('turnBlue').setName('bluePortal1');
           portal.create(100,500,'bluePortal').play('turnBlue').setName('bluePortal2');

           //setting destroy button
                  this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

            this.physics.add.collider(player, slime);
            //Collision with the player
        this.physics.add.collider(player, slime, blockPush, null, null);
        this.physics.add.overlap(enemy, slime, killEnemy, null , null);//adding colliders to game objects
        this.physics.add.collider(player, slime);
        this.physics.add.collider(slime, player);
        this.physics.add.collider(player,enemy);
        this.physics.add.collider(enemy,player);
       this.physics.add.collider(slime , slime);
    //   this.physics.add.collider(slime,portal , portalShift ,null , null);




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
    else{
              player.setVelocityX(0);
              player.setVelocityY(0);
        }
    if(this.key.isDown)
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
    	 slime.setImmovable(false);


   //left to right
    if(player.x < slime.x )
    {

        slime.setVelocityX(160);
        slime.setVelocityY(0);
        isRight = 1;
        isUp=-1

   }
    else if(player.x > slime.x)
   {

      slime.setVelocityX(-160);
      slime.setVelocityY(0);
      isRight = 0;
      isUp=-1;
   }
   //down to top
    else if(player.y < slime.y )
    {

      // slime.setActiveCollision();

      slime.setVelocityY(160);
      slime.setVelocityX(0);
      isUp=  0;
      isRight = -1;
   }
   //up to down
    else if( player.y > slime.y)
  {

        slime.setVelocityY(-160);
        slime.setVelocityX(0);
        isUp=  1;
        isRight = -1;
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

/*function portalShift(slime, portal)
{

  if(portal.name == 'redPortal1' && isRed !=true  )
  {

    slime.x = 108;
    slime.y = 108;

    isRed = true;

  }
  else if(portal.name == 'redPortal2' && isRed !=true  && isBlue !=true)
  {
console.debug('asdasdasd')
    slime.x = 400;
    slime.y = 400;
isRed = true;

  }
   if(portal.name == 'bluePortal1' && isBlue !=true)
   {

     slime.x = 100;
     slime.y = 500;
     isBlue =true
   }
   else if(portal.name == 'bluePortal2' && isBlue !=true)
    {

      slime.x = 400;
      slime.y = 600;
         isBlue =true
    }


     if(isRight == 1)
      {
        slime.setVelocityX(160);
        slime.setVelocityY(0);
        isRight = -1;
      }
      else if(isRight==0){
        slime.setVelocityX(-160);
        slime.setVelocityY(0);
        isRight = -1;
      }
    if(isUp==1){
        slime.setVelocityY(-160);
        slime.setVelocityX(0);
        isUp =-1;
    }
    else if(isUp==0){
        slime.setVelocityY(160);
        slime.setVelocityX(0);
        isUp =-1;

    }



}*/
