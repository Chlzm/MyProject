var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var sass = require('gulp-ruby-sass-ns');
var ngmin = require('gulp-ngmin');
var webpack = require('gulp-webpack');
const babel = require('gulp-babel');
var replace = require('gulp-replace');
var webpackConfig = require('./webpack.config');
var minify = require('gulp-minify');
var livereload = require('gulp-livereload');
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    //jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息
//var scss = require('gulp-scss-lint');

gulp.task('jade', function(){
    jade.forEach(function(jf){
        if(!jf.src || !jf.dest) return;
        gulp.src(jf.src)
            .pipe(jade({petty: true}))
            .pipe(gulp.dest(jf.dest));
    });
});
// 压缩html
gulp.task('html', function() {
    return gulp.src('public/templates/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/dest/templates'))
        .pipe(notify({message: 'html task ok'}));
});
// 压缩图片
gulp.task('image', function() {
    return gulp.src('./public/src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./public/dest/images'));
        //.pipe(notify({ message: 'img task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('public/src/js/app/**/*.js')
        /*.pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({ suffix: '.min' }))*/
        .pipe(ngmin({dynamic:false}))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dest/js/app'))
        //.pipe(notify({ message: 'js task ok' }));
});
gulp.task('webpackJs',function(){
   return gulp.src('public/src/js/app/**/*.js')
       .pipe(webpack(webpackConfig))
       .pipe(gulp.dest('public/dest/js/app'))
});
gulp.task('libjs',function(){
    return gulp.src('public/src/js/lib/**.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dest/js/lib'))
});

//编译sass
gulp.task('sass',function(){
	gulp.src('public/src/stylesheets/sass/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('public/dest/stylesheets'))
});
gulp.task('watch', function(){
    //gulp.watch('./public/partials/*.jade',['jade']);
	gulp.watch('./public/src/stylesheets/less/*.less',['less']);
    gulp.watch('./public/src/stylesheets/sass/*.sass',['sass']);
	gulp.watch('./public/src/js/app/fishing/*.js',['webpackJs']);
	gulp.watch('./public/src/stylesheets/css/*.css',['css']);
	//gulp.watch('./public/stylesheets/**/*.sass',['sass']);
	//gulp.watch('./public/stylesheets/*.scss',['scss']);
});
gulp.task('react',function(){
    gulp.src('public/src/js/app/**/*.js')
    .pipe(babel({
        "presets": ["react","es2015-loose","stage-0","stage-1","stage-3"],
        "compact": false
    }))
    .pipe(replace(/'use strict';/g, ''))
    .pipe(minify({
        ext : {
            src : '.debug.js',
            min : '.min.js'
        }
    }))
    .pipe(gulp.dest('public/dest/js/app'))
});
gulp.task('watchReact',function(){
    var watcher = gulp.watch('public/src/js/app/**/*.js',['react']);
    watcher.on('change',function(event){
        console.log(event)
    });
});
gulp.task(process.argv[2],function(){
    webpackConfig.entry[process.argv[2]] = './public/src/js/app/'+process.argv[2]+'/main.js';
    gulp.src('public/src/js/app/!**!/!*.js')
    .pipe(replace(/'use strict'/, ''))
    .pipe(webpack(webpackConfig))
    //.pipe(uglify())
    .pipe(gulp.dest('public/dest/js/app'))
});
// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('public/src/stylesheets/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/dest/stylesheets'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(minifycss())
        .pipe(gulp.dest('public/dest/stylesheets'))
        .pipe(livereload())
        //.pipe(notify({ message: 'css task ok' }));
});
gulp.task('watchcss',function(){
    var server = livereload();
    livereload.listen();
    var watcher = gulp.watch('public/src/stylesheets/css/*.css',['css'],function(file){
        server.changed(file.path);
    });
})
// 编译less
gulp.task('less',function(){
    gulp.src('public/src/stylesheets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/dest/stylesheets'))
    .pipe(livereload())
});
gulp.task('default',['watchcss']);
