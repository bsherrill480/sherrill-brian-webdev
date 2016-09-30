'use strict';
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    SASS_FILES = './build/sass/**/*.scss';

gulp.task('sass-lint', function () {
  return gulp.src(SASS_FILES)
    .pipe(sassLint({
        rules: {
            'class-name-format': 0 // It doesnt like my BEM conventions
        }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sass', ['sass-lint'], function () {
  return gulp.src(SASS_FILES)
    .pipe(sass({
        precision: 8, //bootstrap requires precision 8
        // loadPath: [
        //     'node_modules/bootstrap-sass/stylesheets'
        // ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(SASS_FILES, ['sass']);
});

