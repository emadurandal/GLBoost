phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.GLBoostLayer', {
    superClass: 'phina.display.CanvasElement',

    scene: null,
    camera: null,
    light: null,
    renderer: null,
    canvas: null,

    /** 子供を 自分のCanvasRenderer で描画するか */
    renderChildBySelf: false,

    init: function(params) {
      this.superInit();

      this.canvas = document.createElement("canvas");
      this.canvas.id = 'glboost_world';
      this.canvas.width = params.width;
      this.canvas.height = params.height;

      // レンダラーを生成
      this.renderer = new GLBoost.Renderer({ canvas: this.canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
      this.scene = new GLBoost.Scene();
      this.on('enterframe', function() {
        this.renderer.clearCanvas();
        this.renderer.draw(this.scene);
      });
    },

    draw: function(canvas) {
      var domElement = this.canvas;
      canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
    }
  });
});
