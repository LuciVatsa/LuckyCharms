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

    },

    preload : function()
    {
    var spacebar;
      var main ;
    },
    create: function() {
      this.add.image(304,352,'asdasdasdasd');
       this.add.text(16, 16, 'YOUWIN!!', { fontSize: '32px', fill: '#000' });
        console.debug("hi");
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (Phaser.Input.Keyboard.JustDown(spacebar) )
        {

        }


    },
    update: function()
    {


    },

  });
