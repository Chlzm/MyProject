var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var scss = require('gulp-ruby-sass-ns');
var ngmin = require('gulp-ngmin');
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
    jadeFiles.forEach(function(jf){
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
    return gulp.src('public/src/images/*.jpg')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('public/dest/images'));
        //.pipe(notify({ message: 'img task ok' }));
});
// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('public/src/stylesheets/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/dest/stylesheets/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dest/stylesheets/css'))
        //.pipe(notify({ message: 'css task ok' }));
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
gulp.task('libjs',function(){
    return gulp.src('public/src/js/lib/**.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dest/js/lib'))
})
// 编译less
gulp.task('less',function(){
	gulp.src('public/src/stylesheets/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('public/dest/stylesheets/css'))
});
//编译sass
gulp.task('scss',function(){
	gulp.src('public/src/stylesheets/sass/*.sass')
	.pipe(scss({style:'compact'}))
	.pipe(gulp.dest('public/dest/stylesheets/css'))
});
gulp.task('watch', function(){
    //gulp.watch('./public/partials/*.jade',['jade']);
	gulp.watch('./public/src/stylesheets/less/*.less',['less']);
	gulp.watch('./public/src/js/app/**/*.js',['js']);
	gulp.watch('./public/src/stylesheets/css/*.css',['css']);
	//gulp.watch('./public/stylesheets/**/*.sass',['sass']);
	//gulp.watch('./public/stylesheets/*.scss',['scss']);
});
gulp.task('default',['watch'])
