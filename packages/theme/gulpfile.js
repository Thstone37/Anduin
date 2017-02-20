var gulp = require("gulp");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
gulp.task("sass", function() {
    return gulp.src("./src/*.scss")
	    .pipe(sass())
	    .pipe(cssmin())
	    .pipe(gulp.dest("./build"))
})
gulp.task("index",function(){
	return gulp.src("index.scss")
	      .pipe(sass())
	      .pipe(cssmin())
	      .pipe(gulp.dest("./build"))
})
gulp.task("build", ["sass","index"]);
