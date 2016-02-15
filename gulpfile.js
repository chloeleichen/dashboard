'use strict';
// Gulp Dependencies

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');

var sassGlob = ['./app/assets/sass/*.scss',
                './app/assets/sass/**/*.scss',
                './app/assets/sass/**/**/*.scss'];

var jsSource = {
  dev: {
    name: 'dev',
    entry: './app/assets/javascripts/index.es6',
    build: 'index.js',
    dest: './build/assets/javascripts',
    watch: './app/assets/javascripts/*.es6'
  },
  test: {
    name: 'test',
    entry: './spec/javascripts/index.es6',
    build: 'index.js',
    dest: './spec/build',
    watch: ['./app/assets/javascripts/*.es6', './spec/javascripts/*.es6']
  }
};

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function jsTask(env) {
  gulp.task(env.name, function taskGen() {
    return (
    browserify({entries: env.entry, extensions: ['.es6'], debug: true, paths: ['./node_modules', './app/assets/javascripts/']})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .on('error', handleErrors)
    .pipe(source(env.build))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(env.dest))
    );
  });
}

gulp.task('sass', function taskGen() {
  return sass(sassGlob[0], { sourcemap: true })
    .on('error', sass.logError)

    // For inline sourcemaps
    .pipe(sourcemaps.write())

    // For file sourcemaps
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))

    .pipe(gulp.dest('./build/assets/css'));
});

jsTask(jsSource.dev);
jsTask(jsSource.test);

gulp.task('watch', ['dev', 'test'], function gulpWatch() {
  gulp.watch(jsSource.dev.watch, [jsSource.dev.name]);
  gulp.watch(jsSource.test.watch, [jsSource.test.name]);
  gulp.watch(sassGlob, ['sass']);
});

gulp.task('default', ['watch']);
