const gulp = require('gulp');
const jasmine = require('gulp-jasmine-livereload-task');

gulp.task('default', jasmine({
  files: ['src/**/*.js', 'utils/**/*.js', 'test/**/*.js'],
  watch: {
    options: {
      debounceTimeout: 10,
      debounceImmediate: true
    }
  }
}));
