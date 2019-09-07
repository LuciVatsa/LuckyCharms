
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
            
        }
    };
	var game = new Phaser.Game(config);
	var keyA;
	var keyD;
	var keyS;
    var keyW;
    var player;
function preload ()
{
	
       // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
       // this.load.image('red', 'assets/particles/red.png');
       this.load.image('Monk', 'Cowboy_man.png');
       this.load.image('sky','sky.png');
        this.load.spritesheet('dude', 'dude.png',{ frameWidth:32, frameHeight:48});
}

function create ()
    {
        this.add.image(400,300,'sky');
        this.add.image(100, 100, 'Monk');
        player = this.physics.add.sprite(100,500,'dude');
        this.createAnimation();

        this.anims.create({
            key:'left',
            farmes: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        })
        keyW = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.W);

        keyS = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.S);
        keyD = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.D);
        keyA = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.A);
        
    }

function createAnimation()
{

}
function update ()
{
	if(keyD.isDown)
	{
        player.anims.play('left',true);
	}
}