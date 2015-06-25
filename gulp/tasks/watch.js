// @file watch.js
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config').watch;

gulp.task('watch', function () {
  // js
  watch(config.js, function () {
    gulp.start(['webpack']);
  });

  // scss
  watch(config.scss, function () {
    gulp.start(['scss']);
  });
/*
  // www
  watch(config.www, function () {
    gulp.start(['copy']);
  });
  */
});
