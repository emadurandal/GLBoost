var gulp = require('gulp');
var config = require('../config').copy;

gulp.task('copy', function () {
  gulp.src(config.src, { base: config.base })
      .pipe(gulp.dest(config.dest));
});
