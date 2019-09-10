
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
    var isRight = false;
var path;
var bounds;
var graphics;
	 var game = new Phaser.Game(config);
function preload ()
{
	

       this.load.image('sky','background.png');
       this.load.image('slime', 'trail.png');
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

        slime.create(300,300,'slime').setCollideWorldBounds(true).setImmovable(true);
        slime.create(100,400,'slime').setCollideWorldBounds(true).setImmovable(true);
        slime.create(300,500,'slime').setCollideWorldBounds(true).setImmovable(true);

       
       //portal
       portal = this.physics.add.staticGroup();
       portal.create(400,400,'portal');

 
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
        
            this.physics.add.collider(player, slime);
            //Collision with the player
        this.physics.add.collider(player, slime, blockPush, null, null);
        //Collision bet block and enemy
        this.physics.add.overlap(enemy, slime, killEnemy, null , null);
       this.physics.add.collider(slime , slime);
       this.physics.add.collider(slime, portal , portalShift ,null , null);
        
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
               // player.anims.play('turn');
         }
             


	
}

//block movement
function blockPush(player , slime)
{
    	 slime.setImmovable(false);
         
   
   //left to right
    if(player.x < slime.x && player.y == slime.y)
    {
       
        slime.setVelocityX(160);
        slime.setVelocityY(0);
        isRight = true;
   }
  if(player.x > slime.x)
   {
      
      slime.setVelocityX(-160);
      slime.setVelocityY(0);
      isRight = false;
   }
   //down to top
   if(player.y < slime.y )
    {
      
      // slime.setActiveCollision();
      slime.setVelocityY(160);
      slime.setVelocityX(0);
   }
   //up to down
   if( player.y> slime.y)

  {
  
        slime.setVelocityY(-160);
        slime.setVelocityX(0);
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

function portalShift(slime, portal)
{
    
     slime.x = 100;
     slime.y = 100;
     if(isRight == true)
     {
         
        slime.setVelocityX(160);
     }
     else
     {
        slime.setVelocityX(-160);
     }

}




