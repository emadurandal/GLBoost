import firefox from 'selenium-webdriver/firefox';
import t from 'selenium-webdriver/testing';
import { expect } from 'chai';
import httpServer from 'http-server/lib/http-server';
var driver;
var server;

t.describe('GLBoost', () => {
  t.before(function(done) {
    server = httpServer.createServer();
    server.listen(3000, 'localhost', () => {
      driver = new firefox.Driver();
      driver.get( 'http://localhost:3000/test/bootstrap.html');
      done();
    });
  });

  t.after(function() {
    driver.quit();
    server.close();
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
