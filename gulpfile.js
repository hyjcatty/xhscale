/**
 * Created by hyj on 2016/7/25.
 */
var gulp=require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifycss = require("gulp-minify-css");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var option = {

    //buildPath: "../www/dist"
    buildPath: "./dist"
}
var option_html = {
    collapseWhitespace:true,
    collapseBooleanAttributes:true,
    removeComments:true,
    removeEmptyAttributes:true,
    removeStyleLinkTypeAttributes:true,
    minifyJS:true,
    minifyCSS:true
};


gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('clean',function(){
    return gulp.src(option.buildPath,{
        read:false
    }).pipe(clean({force:true}));
})
// ����Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
gulp.task("resourcecopy",function(){
    gulp.src("./image/*")
        .pipe(gulp.dest(option.buildPath+"/image/"));
    gulp.src("./img/*")
        .pipe(gulp.dest(option.buildPath+"/img/"));
    gulp.src("./resource/**/*")
        .pipe(gulp.dest(option.buildPath+"/resource/"));
    gulp.src("./php/*")
        .pipe(gulp.dest(option.buildPath+"/php/"));
    gulp.src("./ejs/*")
        .pipe(gulp.dest(option.buildPath+"/ejs/"));
    gulp.src("./svg/**/*")
        .pipe(gulp.dest(option.buildPath+"/svg/"));
    gulp.src("./swf/*")
        .pipe(gulp.dest(option.buildPath+"/swf/"));
    gulp.src("./video/**/*")
        .pipe(gulp.dest(option.buildPath+"/video/"));
    gulp.src("./screensaver/**/*")
        .pipe(gulp.dest(option.buildPath+"/screensaver/"));
    gulp.dest(option.buildPath+"/upload/");
    gulp.dest(option.buildPath+"/usr_img/");
    gulp.src("./*.php")
        .pipe(gulp.dest(option.buildPath+"/"));
    gulp.src("./*.ico")
        .pipe(gulp.dest(option.buildPath+"/"));
    gulp.src("./*.js")
        .pipe(gulp.dest(option.buildPath+"/"));
    //gulp.src("./*.html")
     //   .pipe(gulp.dest(option.buildPath+"/"));
})

// �ϲ���ѹ���ļ�
gulp.task('scripts', function() {
    gulp.src('./js/app.js')
        .pipe(concat('app.js'))
        //.pipe(gulp.dest('./dist/js'))
        .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(option.buildPath+"/js/"));
    gulp.src('./js/hcu_util.js')
        .pipe(concat('hcu_util.js'))
        //.pipe(gulp.dest('./dist/js'))
        .pipe(rename('hcu_util.js'))
        .pipe(uglify())
        .pipe(gulp.dest(option.buildPath+"/js/"));
    gulp.src('./js/login.js')
        .pipe(concat('login.js'))
       // .pipe(gulp.dest('./dist/js'))
        .pipe(rename('login.js'))
        .pipe(uglify())
        .pipe(gulp.dest(option.buildPath+"/js/"));
    gulp.src('./js/nprogress.js')
        .pipe(concat('nprogress.js'))
        // .pipe(gulp.dest('./dist/js'))
        .pipe(rename('nprogress.js'))
        .pipe(uglify())
        .pipe(gulp.dest(option.buildPath+"/js/"));

    gulp.src('./css/Login.css')
       // .pipe(concat('Login.css'))
        .pipe(rename('Login.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(option.buildPath+"/css/"));
    gulp.src('./css/nprogress.css')
       // .pipe(concat('nprogress.css'))
        .pipe(rename('nprogress.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(option.buildPath+"/css/"));
    gulp.src('./css/scope.css')
       // .pipe(concat('scope.css'))
        .pipe(rename('scope.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(option.buildPath+"/css/"));
    gulp.src('./css/style.css')
        // .pipe(concat('scope.css'))
        .pipe(rename('style.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(option.buildPath+"/css/"));
    gulp.src('./Login.html')
        .pipe(htmlmin(option_html))
        .pipe(gulp.dest(option.buildPath));
    gulp.src('./scope.html')
        .pipe(htmlmin(option_html))
        .pipe(gulp.dest(option.buildPath));
});

// Ĭ������
gulp.task('default',['clean'], function(){
    gulp.run('lint', 'sass', 'scripts','resourcecopy');
/*
    // �����ļ��仯
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });*/
});
