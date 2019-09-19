var main;
window.onload = function()
{
const config = {
        type: Phaser.AUTO,
        parent: 'element',
        width: 608,
        height: 704,
        key: 'main',
        physics: {
            default: 'arcade',

            arcade: {
                gravity: { y: 0},
                debug: false
            }
          },
          audio: {
      disableWebAudio: true
}
  },


main = new Phaser.Game(config);
main.scene.add('game', StartGame);
main.scene.add('endGame', GameOver);
main.scene.add('mainMenu', WinGame);
main.scene.start('StartGame');
}
