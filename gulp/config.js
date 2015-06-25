var path = require('path');
var glBoostDest = './build'; // 出力先ディレクトリ
var glBoostSrc = './src';  // ソースディレクトリ
var examplesSrc = './examples'; // examplesソースディレクトリ
var relativeGLBoostSrcPath = path.relative('.', glBoostSrc);
var relativeExampleSrcPath = path.relative('.', examplesSrc);

module.exports = {
  // 出力先の指定
  dest: glBoostDest,

  // jsのビルド設定
  js: {
    src: glBoostSrc + '/js/**',
    dest: glBoostDest,
    uglify: false
  },

  // webpackの設定
  webpack: {
    entry: glBoostSrc + '/js/glboost.js',
    output: {
      filename: 'glboost.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {  // ここを追記
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?experimental&optional=selfContained'
//          loader: 'babel-loader'
        }
      ]
    }
  },

  scss: {
    srcFromSampleDir: [ // examplesSrc/{example名} からの指定
      '/scss/**/!(_)*'  // ファイル名の先頭がアンスコはビルド対象外にする
    ],
    base: examplesSrc,
    output: 'app.css',  // 出力ファイル名
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  },


  copy: { // 現在使っていない
    src: [   // 今後ただコピーするファイルが増えそうなので配列にしておく
      examplesSrc + '/**/www/index.html'
    ],
    base: examplesSrc,
    dest: 'index.html'
  },

  watch: {
    js: relativeGLBoostSrcPath + '/js/**',
    scss: relativeExampleSrcPath + '/**/scss/**',
    www: relativeExampleSrcPath + '/**/www/index.html'
  }

};
