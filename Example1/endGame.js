var GameOver = new Phaser.Class({
    Extends:Phaser.Scene,
    initialize: function BootScene(){
        Phaser.Scene.call(this,{
            key:'GameOver',
            active:false
        })
    },

    init:function(){
      console.debug("works");
        this.load.image('GameOver','GameOver.png');
      this.load.image('asdasdasdasd','YouWin.png');

    },

    preload : function()
    {
    var spacebar;
      var main ;
    },
    create: function() {
      this.add.image(304,352,'GameOver');
        console.debug("hi");
<<<<<<< Updated upstream
        this.keyX = this.input.keyboard.addKey('ENTER');
        main = this.scene.get('main');
=======
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (Phaser.Input.Keyboard.JustDown(spacebar) )
        {
          this.scene.switch('StartGame');
        }

>>>>>>> Stashed changes

    },
    update: function()
    {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

      
    },

  });
