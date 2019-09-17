var GameOver = new Phaser.Class({
    Extends:Phaser.Scene,
    initialize: function BootScene(){
        Phaser.Scene.call(this,{
            key:'GameOver',
            active:false
        })
    },
    init:function(data){
      console.debug("works");
    },
  });
