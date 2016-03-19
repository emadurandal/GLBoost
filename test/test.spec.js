import firefox from 'selenium-webdriver/firefox';
import t from 'selenium-webdriver/testing';
import { expect } from 'chai';
var driver;

t.describe('GLBoost', () => {
  t.before(function() {
    driver = new firefox.Driver();
    driver.get( 'http://localhost:3000/test/bootstrap.html');
  });

  t.after(function() {
    driver.quit();
  });

  t.it('init GLBoost renderer properly (WebGL1)', () => {
    //var window = driver.page().getCurrentWindow();
    driver.executeScript(function() {
      var canvas = document.getElementById("world");

      var renderer = new GLBoost.Renderer({
        canvas: canvas,
        clearColor: {
          red: 0.0,
          green: 0.0,
          blue: 0.0,
          alpha: 1
        }
      });

      return (renderer.glContext instanceof WebGLRenderingContext);
    }).then(function(result) {
      expect(result).to.equal(true);
    });
  });
});
