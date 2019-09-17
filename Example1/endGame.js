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
        main = this.scene.get('main');

    },
    update: function()
    {

      if(this.keyX.isDown)
       this.scene.start(main);
    },

  });
