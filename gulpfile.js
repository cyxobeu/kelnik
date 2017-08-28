var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    pug = require('gulp-pug');

var Path = {
  js_path : "./src/js/script.js",
  sass_path : "./src/scss/*.scss",
  sprite_path : "./src/sprites/*.png",
  pug_path : "./src/pug/index.pug"
};

gulp.task('pug', function buildHTML() {
  return gulp.src(Path.pug_path)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
});


gulp.task('sprite', function () {
  var spriteData = gulp.src(Path.sprite_path)
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssFormat: 'css',
    imgPath: '../img/sprite.png'
  }));
  var imgStream = spriteData.img
  .pipe(gulp.dest('./build/img/'));
  var cssStream = spriteData.css
  .pipe(gulp.dest('./src/scss/'))
});

gulp.task('scss', function() {
  return gulp
  .src('./src/scss/style.scss')
  .pipe(plumber(function (error) {
    this.emit('end');
  }))
  .pipe(sass({
    css: './build/css',
    sass: './src/scss',
    images: './build/img'
  }))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'Firefox > 0'],
    cascade: false
  }))
  .pipe(csso({
      restructure: true,
      sourceMap: true,
      debug: true
  }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('scripts', function() {
  return gulp
  .src(Path.js_path)
  .pipe(plumber(function (error) {
    this.emit('end');
  }))
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

gulp.task('default', ['sprite'], function() {
  gulp.start('scss');
  gulp.start('scripts');
  gulp.start('pug');
});

gulp.task('watch', ['browser-sync'], function() {
  watch(Path.pug_path, function () {
    gulp.start('pug');
  });
  watch(Path.sprite_path, function() {
    gulp.start('sprite');
  });
  watch(Path.sass_path, function() {
    gulp.start('scss');
  });
  watch(Path.js_path, function() {
    gulp.start('scripts');
  });
});
