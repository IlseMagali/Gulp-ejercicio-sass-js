var gulp = require("gulp");
var	concat = require("gulp-concat");
var	uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var filesExist = require("files-exist");

var config = {
	source : "./src/",
	dist : "./public/"
}

var rutas = {
	assets : "assets/",
	rutaHTML : "**/*.html",
	rutaSCSS : "scss/*.scss",
	rutaCSS : "css/*.css",
	rutaJS : "js/*.js"
}

gulp.task("fusionarJS", function() {
	gulp.src(config.source + rutas.assets + rutas.rutaJS)
	.pipe(concat("todo.js"))
	.pipe(uglify())
	.pipe(gulp.dest(config.dist + rutas.assets + "js/"))
});

gulp.task("prepararHTML", function(){
	gulp.src(filesExist(config.source + rutas.rutaHTML))
	.pipe(gulp.dest(config.dist))
});

gulp.task("prepararCSS", function (){
	gulp.src(config.source + rutas.assets + rutas.rutaSCSS)
	.pipe(sass({"outputStyle": "compressed"}))
	.pipe(gulp.dest(config.dist + rutas.assets + "css/"))
});

/* Tarea para hacer tareas:*/
gulp.task('watchChanges', function(){
	browserSync.init({ // browserSync inicializa un servidor propio para detectar los cambios, el define a express, así que evita configurar todo lo de express
		// serve : { // para conectar public con mi servidor
		// 	baseDir : "./public"
		// }
		server: {
		    baseDir: config.dist
		}
	})
	gulp.watch(config.source + rutas.rutaHTML, ["html-watch"]) //cuando se guarde algo en la ruta, actualizar. Ejecuta la tarea sass-watch
	// hace lo mismo que hacemos en sass con ruby, el primer parámetro es qué va a vigilar y entre corchetes la tarea que
	// va a ejecutar cuando algo cambie.
	gulp.watch(config.source + rutas.assets + "/css", ["css-watch"])
	gulp.watch(config.source + rutas.assets + "/js", ["js-watch"])
});

//intermediario que es sass-watch,
gulp.task("html-watch", ["prepararHTML"], function(){ //cuando esta tarea se termine de ejecutar, que realice tareas entre corchetes
	browserSync.reload(); // se recarga el navegador
});

gulp.task("js-watch", ["fusionarJS"], function(){ //cuando esta tarea se termine de ejecutar, que realice tareas entre corchetes
	browserSync.reload(); // se recarga el navegador
});

gulp.task("css-watch", ["prepararCSS"], function(){
	browserSync.reload();
});
