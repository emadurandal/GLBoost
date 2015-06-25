var fs   = require('fs');
var path = require('path');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var config = require('../config').scss;

var getFolders = function (dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
};

var folders = getFolders(config.base);

console.log(folders);

gulp.task('scss', function () {
    folders.map(function(dir){
        gulp.src(config.base + '/' + dir + config.srcFromSampleDir)
            .pipe(plumber())              // エラー出ても止まらないようにする
            .pipe(sass())               // 実際コンパイルしてるのはここ
            .pipe(concat(config.output))  // 1つのファイルに固める
            .pipe(autoprefixer(config.autoprefixer))  // vendor-prefixつける
            .pipe(gulpif(config.minify, minify()))    // 必要ならminifyする
            .pipe(gulp.dest(config.base + '/' + dir));            // 出力する

    });
});
