import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js(done) {
    src('src/js/app.js')
        .pipe(dest('build/js'))

    done();
}

export function css(done) {
    console.log('Compilando SCSS...');
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css', {sourcemaps: '.'}))
        .on('end', () => console.log('CSS compilado y guardado en build/css'));

    done();
}

export function dev() {
    console.log('Observando cambios en SCSS y JS...');
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

export default series( js, css, dev )