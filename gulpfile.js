const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

function defaultTask(done) {
  done();
}

gulp.task('static', () => gulp.src('img/assets/*')
  .pipe(imagemin())
  .pipe(gulp.dest('src/assets/static')));

gulp.task('upload', () => gulp.src('img/uploads/*')
  .pipe(imagemin())
  .pipe(gulp.dest('optImg')));

gulp.task('favicon', () => gulp.src('img/favicon/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/favicon')));

gulp.task('default', gulp.series('static', 'upload', 'favicon'), defaultTask);
