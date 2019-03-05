const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

const browsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'
];

function build() {
    return gulp.src(['scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(clean())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css/'))
}

function watch() {
    gulp.watch(['scss/*.scss'], gulp.series(build));
}

exports.watch = gulp.series(build, watch);
exports.default = gulp.series(build);