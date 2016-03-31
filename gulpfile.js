var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var sass = require('gulp-sass');
//var scss = require('gulp-scss-lint');

var jadeFiles = [
    {src: './public/partials/list.jade', dest: './public/partials/'},
    {src: './public/templates/index.jade', dest: './public/templates/'}
];

gulp.task('jade', function(){
    jadeFiles.forEach(function(jf){
        if(!jf.src || !jf.dest) return;
        gulp.src(jf.src)
            .pipe(jade({petty: true}))
            .pipe(gulp.dest(jf.dest));
    });
});
// 编译less
gulp.task('less',function(){
	gulp.src('public/stylesheets/*.less')
	.pipe(less())
	.pipe(gulp.dest('public/stylesheets'))
});
//编译sass
gulp.task('sass',function(){
	gulp.src('public/stylesheets/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('public/stylesheets'))
});
// 编译scss
/*gulp.task('scss',function(){
	return gulp.src('public/stylesheets*//*.scss')
    .pipe(scss({
		bundleExec :true
	}))
	.pipe(gulp.dest('public/stylesheets'))
});*/
gulp.task('watch', function(){
    //gulp.watch('./public/partials/*.jade',['jade']);
	gulp.watch('./public/stylesheets/*.less',['less']);
	gulp.watch('./public/stylesheets/*.sass',['sass']);
	//gulp.watch('./public/stylesheets/*.scss',['scss']);
});
gulp.task('default',['watch'])
