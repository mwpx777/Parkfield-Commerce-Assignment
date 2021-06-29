'use strict';
const gulp          = require('gulp'),
      babel         = require('gulp-babel'),
      autoprefixer  = require('gulp-autoprefixer'),
      sass          = require('gulp-sass'),
      plumber       = require('gulp-plumber'),
      connect       = require('gulp-connect'),
      rename        = require('gulp-rename');
const autoprefixerOptions = {
  browsers : ['last 3 versions', '> 5%', 'Explorer >= 10', 'Safari >= 8'],
  cascade : false
},
sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
},
babelOptions = {
  presets: ['@babel/preset-env']
};

async function connectServer() {
  connect.server({
    root: '.',
    livereload: true
  })
}

async function scss() {
  return gulp.src('assets/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('./dist/'))
  .pipe(connect.reload())
}

async function js() {
  return gulp.src('assets/js/**/*.js')
  .pipe(plumber())
  .pipe(babel(babelOptions))
  .pipe(gulp.dest('./dist/'))
  .pipe(connect.reload())
}

async function html() {
  return gulp.src('index.html')
  .pipe(connect.reload());
}

async function watch() {
  gulp.watch('assets/scss/**/*.scss', gulp.series(scss));
  gulp.watch('assets/js/**/*.js', gulp.series(js));
  gulp.watch('index.html', gulp.series(html));
}

const build = gulp.parallel(html, scss, js, watch, connectServer);
exports.default = build;
