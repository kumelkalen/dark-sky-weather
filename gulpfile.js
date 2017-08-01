var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

//Tareas
//mini js de jquery, materialize y el nuestro.
gulp.task('script',function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
		.pipe(concat('script.js'))
		//carpeta
		.pipe(gulp.dest('dist/js/'));
});
//mini css
gulp.task('style',function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		//carpeta
		.pipe(gulp.dest('dist/css/'));
});
//server
gulp.task('webserver', function(){
	gulp.src('../dark-sky-weather/')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			directoryListening: false,
			open: true
		}));
});
//seguimiento archivos scss
gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['style']);
});
// tareas a ejecutar
gulp.task('default', ['script','style','webserver','watch']);