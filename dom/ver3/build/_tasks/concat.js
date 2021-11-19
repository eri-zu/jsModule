import  PATH  from "../_setting/config.js";
import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
export function concatLibsJS(cb) {
  var src = [
    PATH.src.js + "libs/util/Stats.js",
    PATH.src.js + "libs/jquery/jquery.min.js",
    PATH.src.js + "libs/jquery/jquery.throttle-debounce.min.js",
    PATH.src.js + "libs/jquery/jquery.mousewheel.js",
  ];

  return gulp
    .src(src)
    .pipe(concat("libs.js"))
    .pipe(gulp.dest(PATH.dist.js + "unconcat/"));
}

export function concatJS(cb) {
  var src = [
    PATH.dist.js + "unconcat/" + "libs.js",
    PATH.dist.js + "unconcat/" + "main.js",
  ];

  return gulp.src(src).pipe(concat("bundle.js")).pipe(gulp.dest(PATH.dist.js));
}

export function concatMinJS(cb) {
  var src = [
    PATH.src.js + "libs/util/Stats.js",
    PATH.src.js + "libs/jquery/jquery.min.js",
    PATH.src.js + "libs/jquery/jquery.throttle-debounce.min.js",
    PATH.src.js + "libs/jquery/jquery.mousewheel.js",
  ];

  return gulp
    .src(src)
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.dist.js + "unconcat/"));
}
