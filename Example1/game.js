
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
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
        
        platform =this.physics.add.staticGroup();
        
        platform.create(600,400,'platform').setScale(2).refreshBody();
        platform.create(100,400,'platform');

        player = this.physics.add.sprite(100,100,'dude');
        //collision 
        //player.setBounce(0.2);
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

        //Collision with the player
        
    }

function update ()
{
   
    if(this.input.keyboard.checkDown(cursors.left, 250))
    {
        player.x -= 32;
    }
    else if(this.input.keyboard.checkDown(cursors.right, 250))
    {
        player.x += 32;
    }
    if(this.input.keyboard.checkDown(cursors.up, 250))
    {
        player.y -= 32;
    }
    if(this.input.keyboard.checkDown(cursors.down, 250))
    {
        player.y += 32;
    }
//     if(cursors.left.isDown)
//     {
    
//         player.setVelocityX(-160);
//         player.anims.play('left', true);
//     }
//    else if(cursors.right.isDown)
//     {
//         player.setVelocityX(160);
//         player.anims.play('right', true);

//     }
//     else if(cursors.up.isDown)
//     {
//         player.setVelocityY(-160);
//         player.anims.play('right', true);

//     }
//     else if(cursors.down.isDown)
//     {
//         player.setVelocityY(160);
//         player.anims.play('right', true);

//     }
//     else{
//         player.setVelocityX(0);
//         player.setVelocityY(0);
//         player.anims.play('turn');
//     }
    
	
}