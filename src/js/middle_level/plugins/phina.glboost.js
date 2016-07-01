import GLBoost from '../../globals';
import GLBoostMiddleContext from '../core/GLBoostMiddleContext';

if (typeof phina !== 'undefined') {



phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.GLBoostLayer', {
    superClass: 'phina.display.Layer',

    scene: null,
    expression: null,
    camera: null,
    light: null,
    glBoostContext: null,
    renderer: null,
    canvas: null,

    /** 子供を 自分のCanvasRenderer で描画するか */
    renderChildBySelf: true,

    init: function(params) {
      this.superInit(params);
      this.originX = 0;
      this.originY = 0;

      this.canvas = document.createElement("canvas");
      this.canvas.id = 'glboost_world';
      this.canvas.width = params.width;
      this.canvas.height = params.height;
      var bodyElm = document.getElementsByTagName("body").item(0);
      bodyElm.appendChild(this.canvas);
      this.canvas.style.display = "none";

      this.glBoostContext = new GLBoostMiddleContext(this.canvas);
      // レンダラーを生成
      this.renderer = this.glBoostContext.createRenderer({clearColor: {red:1, green:1, blue:1, alpha:1}});
      this.scene = this.glBoostContext.createScene();
      this.expression = this.glBoostContext.createExpressionAndRenderPasses(1);
      this.expression.renderPasses[0].scene = this.scene;

      this.on('enterframe', function() {
        if (this.scene) {
          this.renderer.clearCanvas();
          this.renderer.draw(this.expression);
        }
      });

      this.domElement = this.canvas;
    }
  });

  phina.define("phina.display.OffScreenLayer", {
    superClass: 'phina.display.Layer',

    /**
     * 子孫要素の描画の面倒を自分で見る
     */
    renderChildBySelf: true,

    /** 子孫要素を普通に描画するためのキャンバス */
    canvas2d: null,
    /** canvas2dに描画するレンダラー */
    renderer2d: null,

    width: 0,
    height: 0,

    init: function (params) {
      this.superInit();

      this.width = params.width;
      this.height = params.height;

      this.canvas2d = phina.graphics.Canvas();
      this.canvas2d.setSize(this.width, this.height);

      this.renderer2d = phina.display.CanvasRenderer(this.canvas2d);

    },

    reset: function() {
      this.canvas2d.clearColor('red', 0, 0, this.width, this.height);
      // this.canvas2d.clear(0, 0, this.width, this.height);
      /*
       this.canvas2d.init();
       this.canvas2d.setSize(this.width, this.height);
       this.renderer2d = phina.display.CanvasRenderer(this.canvas2d);
       */
    },

    renderObject: function(obj) {
      var layer = DisplayElement();
      obj.flare('enterframe');
      obj.addChildTo(layer);
      this.renderer2d.renderObject(layer);
    },

    getImageDataURL: function() {
      return this.canvas2d.domElement.toDataURL('image/png');
    }
  });

});
}

export default GLBoost;
