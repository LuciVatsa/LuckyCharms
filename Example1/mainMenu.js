var WinGame = new Phaser.Class({
    Extends:Phaser.Scene,
    initialize: function BootScene(){
        Phaser.Scene.call(this,{
            key:'WinGame',
            active:false
        })
    },

    init:function(){
      console.debug("works");
      this.load.image('YouWin','YouWin.png');
    },

    preload : function()
    {
    var keyX;
      var main ;
    },
    create: function() {
      this.add.image(304,352,'GameOver');
        console.debug("hi");
        this.keyX = this.input.keyboard.addKey('ENTER');


    },
    update: function()
    {
          if(this.keyX.isDown)
          {
            console.debug("yes");
          }

    },

  });
