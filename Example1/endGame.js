
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
          audio: {
      disableWebAudio: true
  },
        scene: {
            preload: preload,
            create: create,
            update: update

        }
    };

function create ()
{
  this.add.text(20,20, "Game over...");
}
