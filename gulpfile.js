var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task("transformJsxToJs", function(){
    return gulp.src("scripts/*.jsx")
        .pipe(babel({
            presets: ["react"]
        }))
        .pipe(gulp.dest("scripts"));
});