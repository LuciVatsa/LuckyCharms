var GameOver = new Phaser.Class({
    Extends:Phaser.Scene,
    initialize: function BootScene(){
        Phaser.Scene.call(this,{
            key:'GameOver',
            active:false
        })
    },
    init:function(){
      console.debug("hi");
    },
    preload : function()
    {
       this.load.image('GameOver','GameOver.png');
    },
    create: function() {
      this.add.image(304,352,'GameOver');
        console.debug("hi");
    }
  });
