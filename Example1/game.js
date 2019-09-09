
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
    var text;
	var game = new Phaser.Game(config);
function preload ()
{
	
       // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
       // this.load.image('red', 'assets/particles/red.png');
       //image loading
      // this.load.image('Player', 'Cowboy_man.png');
       this.load.image('sky','sky.png');
       this.load.image('platform', 'platform.png');
       //spirte loading
       this.load.spritesheet('dude', 'dude.png',{ frameWidth:32, frameHeight:48});
}

function create ()
    {
        
        this.add.image(400,300,'sky');
        
        //platform =this.physics.add.group();
        platform = this.physics.add.image(100,300,'platform').setScale(.2);
        //platform.create(100,300,'platform').setScale(.2);
       

        player = this.physics.add.sprite(100,100,'dude');
        //collision 
       // platform.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
    
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
        this.physics.add.collider(player, platform, hitWall, null, null);
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
function hitWall(player , platform)
{
    	
this.game.debug.cameraInfo(this.game.camera, 32, 32);
   var diff = 0;
   if(player.x < platform.x)
   {
       diff= platform.x - player.x;
       player.setVelocityX(-50);
   }
  else if(player.x > platform.x)
   {
       diff= player.x - platform.x ;
       player.setVelocityX(50);
   }

}