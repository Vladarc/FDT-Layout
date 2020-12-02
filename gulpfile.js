"use strict";

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const GulpClient = require("gulp");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const zopfli = require("imagemin-zopfli");
const mozjpeg = require("imagemin-mozjpeg");
const giflossy = require("imagemin-giflossy");
const jpegtran = require("imagemin-jpegtran");
const clean = require("gulp-clean");
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(rigger())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp
    .src("src/js/main.js")
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*.*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*.*")
    .pipe(
      imagemin([
        pngquant({
          speed: 1,
          quality: [0.95, 1],
        }),
        zopfli({ more: true }),
        giflossy({
          optimizationLevel: 3,
          optimize: 3,
          lossy: 2,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        }),
        jpegtran({
          progressive: true,
        }),
        mozjpeg({
          quality: 90,
        }),
      ])
    )
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task("favicon", function () {
  return gulp.src("src/*.ico").pipe(gulp.dest("dist"));
});

gulp.task("clean", function () {
  return gulp
    .src("dist", { read: false, allowEmpty: true })
    .pipe(clean({ force: true }));
});

// Static Server + watching scss/html files
gulp.task(
  "serve",
  gulp.series("html", "favicon", "images", "fonts", "js", "sass", function () {
    browserSync.init({
      server: "./dist",
    });

    gulp.watch("src/scss/**/*.scss", gulp.parallel("sass"));
    gulp.watch("src/**/*.html", gulp.parallel("html"));

    gulp.watch("src/fonts/**/*.*", gulp.parallel("fonts"));
    gulp.watch("src/js/**/*.js", gulp.parallel("js"));
    gulp.watch("'src/img/**/*.*'", gulp.parallel("images"));
  })
);

gulp.task("default", gulp.series("clean", "serve"));
