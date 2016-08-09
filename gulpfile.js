/* ------------------------------------------------------------------------------
 *
 *  Gulp file Liverload, Bootstrap Sass, Font Awesome
 *
 *  
 *  Autor: Alex Ishida
 *  Versão: 1.0
 *
 * ---------------------------------------------------------------------------- */


// Incluir gulp
var gulp = require('gulp');


// Incluir plugins
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');



var config = {
    bowerDir: './bower_components',
    inputDir: './src',
    outputDir: './public/assets'
};


var sassOptions = {
    errLogToConsole: true,
    style: 'compressed',
    outputStyle: 'expanded',
    includePaths: [
        config.bowerDir + '/bootstrap-sass/assets/stylesheets'
    ]
};

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 8181,
        livereload: true
    });
});


gulp.task('sass', function () {
    return gulp.src(config.inputDir + '/scss/*.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(minifyCss({
            keepSpecialComments: 0,
            compatibility: 'ie8',
            keepBreaks: false
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.outputDir +'/css'))
        .pipe(connect.reload());
});

gulp.task('bootstrap_fonts', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest(config.outputDir + '/fonts'));
});

gulp.task('bootstrap_js', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass/assets/javascripts/**/*')
        .pipe(gulp.dest(config.outputDir + '/js'));
});

gulp.task('jquery', function() {
    return gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(config.outputDir + '/js'));
});


gulp.task('fontawesome-fonts', function() {
    return gulp.src([
        config.bowerDir + '/font-awesome/fonts/*'])
        .pipe(gulp.dest(config.outputDir + '/fonts/font-awesome/fonts'));
});

gulp.task('fontawesome-css', function() {
    return gulp.src([
        config.bowerDir + '/font-awesome/css/*'])
        .pipe(gulp.dest(config.outputDir + '/fonts/font-awesome/css'));
});


gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['./public/*.html'], ['html']);
    gulp.watch(config.inputDir + '/scss/**/*.scss', ['sass']);
});



gulp.task('default', [
    'sass',
    'bootstrap_fonts',
    'bootstrap_js',
    'jquery',
    'fontawesome-fonts',
    'fontawesome-css',
    'connect',
    'watch'
]);