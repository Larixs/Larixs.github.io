var gulp = require ("gulp");

//var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var webpack = require('webpack');
var webpackConfig = require('./webpack.config');//引入webpack的配置文件


//检查脚本
gulp.task("lint",function () {
   gulp.src(".js/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter("default"));
});

//编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', ["sass","scripts"]);

// 监听任务
gulp.task("watch",function () {
    gulp.watch("./js/*.js",function () {
        gulp.run("scripts","jshint");
    });
    gulp.watch("./scss/*.scss",function () {
        gulp.run("sass");
    })
});

//尚未加入webpack