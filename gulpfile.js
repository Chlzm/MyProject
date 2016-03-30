var gulp = require('gulp');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
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

gulp.task('watch', function(){
    // 不同的文件个性，需要执行不同的任务来处理
    gulp.watch('./public/partials/*.jade',['jade']);
});
gulp.task('default',['watch'])
/*
gulp.task('webserver', function(){
    gulp.src('./public/')
        .pipe(webserver({
            host: '127.0.0.1',
            livereload: true,
            fallback: 'index.html'
        }));
});
*/
