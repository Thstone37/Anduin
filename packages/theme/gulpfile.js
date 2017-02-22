var gulp = require("gulp");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var autoprefixer=require("gulp-autoprefixer");
gulp.task("sass", function() {
    return gulp.src("./src/*.scss")
	    .pipe(sass())
	    .pipe(autoprefixer({
            browsers: ['last 4 versions']
	    }))
	    .pipe(gulp.dest("./build"))
})
gulp.task("index",function(){
	return gulp.src("index.scss")
	      .pipe(sass())
  	      .pipe(autoprefixer({
            browsers: ['last 4 versions']
	       }))
	      .pipe(cssmin())
	      .pipe(gulp.dest("./build"))
})
gulp.task("build", ["sass","index"]);
