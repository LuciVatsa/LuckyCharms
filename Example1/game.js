
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
function preload ()
{
	
       // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
       // this.load.image('red', 'assets/particles/red.png');
       this.load.image('Monk', 'Cowboy_man.png');

}

function create ()
    {
        this.add.image(100, 100, 'Monk');
        this.drawKeyBoard();

        keyW = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.W);

        keyS = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.S);
        keyD = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.D);
        keyA = this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCode.A);
        
    }

function drawKeyBoard()
{

}
function update ()
{
	if(keyA.isDown)
	{
		console.log('A');
	}
}