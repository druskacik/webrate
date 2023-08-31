import gulp from 'gulp';
import replace from 'gulp-replace';

import dotenv from 'dotenv';

dotenv.config({
    path: '.env.production',
});

gulp.task('replace', function(){
  return gulp.src(['extension/**/*.*'])
    .pipe(replace('http://localhost:3000', process.env.API_URL))
    .pipe(replace('http://localhost', process.env.API_URL))
    .pipe(gulp.dest('dist'));
});
