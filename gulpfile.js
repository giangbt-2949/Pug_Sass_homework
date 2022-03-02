const { src, dest, parallel, watch, series } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const FilesPath = { sassFiles: 'sass/**/*.scss', jsFiles: 'js/*.js', htmlFiles: 'pages/**/*.pug' };
const { sassFiles, jsFiles, htmlFiles } = FilesPath;

const sassTask = () => {
    return src(sassFiles)
            .pipe(sass())
            .pipe(concat('style.css'))
            .pipe(dest('dist/css'))
            .pipe(browserSync.stream());
};


const htmlTask = () => {
    return src(htmlFiles)
            .pipe(pug({pretty: true}))
            .pipe(dest('dist'))
            .pipe(browserSync.stream());
};


const jsTask = () => {
    return src(jsFiles)
            .pipe(concat('main.js'))
            .pipe(dest('dist/js'));
};


const assetsTask = () => {
    return src('assets/**/*')
            .pipe(dest('dist/assets'));
};


const serve = () => {
    browserSync.init({ server: { baseDir: './dist' } })

    watch(sassFiles, sassTask);
    watch(jsFiles, jsTask);
    watch(htmlFiles, htmlTask);
};


exports.js = jsTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask, assetsTask));