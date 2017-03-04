const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


const SRC_PATH = path.resolve(__dirname, 'src');
const BUILT_PATH = path.resolve(__dirname, 'built');

gulp.task('sass', () => {
    return gulp.src(SRC_PATH + '/sass/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', console.error))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 3 versions'] })
        ]))
        .pipe(gulp.dest(BUILT_PATH + '/css/'));
});

gulp.task('watch', () => {

    watch([SRC_PATH + '/sass/**/*.sass'], () => {
        gulp.start('sass');
    });

});

gulp.task('default', ['watch']);