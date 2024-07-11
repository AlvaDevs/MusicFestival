import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import terser from 'gulp-terser';
import sharp from 'sharp';

export function js(done) {
    src('src/js/app.js')
        .pipe(terser())
        .pipe(dest('build/js'));
    done();
}

export function css(done) {
    console.log('Compilando SCSS...');
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: '.' }))
        .on('end', () => console.log('CSS compilado y guardado en build/css'));
    done();
}

export async function crop(done) {
    const inputFolder = 'src/img/gallery/full';
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    const images = fs.readdirSync(inputFolder).filter(file => /\.(jpg)$/i.test(path.extname(file)));

    try {
        for (const file of images) {
            const inputFile = path.join(inputFolder, file);
            const outputFile = path.join(outputFolder, file);

            await sharp(inputFile)
                .resize(width, height, { position: 'centre' })
                .toFile(outputFile);
        }
        done();
    } catch (error) {
        console.error(error);
        done(error);
    }
}

export async function webp(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images = await glob.sync('./src/img/**/*.{jpg,png}');

    try {
        for (const file of images) {
            const relativePath = path.relative(srcDir, path.dirname(file));
            const outputSubDir = path.join(buildDir, relativePath);
            await imageProcessing(file, outputSubDir);
        }
        done();
    } catch (error) {
        console.error(error);
        done(error);
    }
}

async function imageProcessing(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    }

    const baseName = path.basename(file, path.extname(file));
    const outputFile = path.join(outputSubDir, `${baseName}.jpg`);
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

    const options = { quality: 80 };

    try {
        await sharp(file).jpeg(options).toFile(outputFile);
        await sharp(file).webp(options).toFile(outputFileWebp);
        await sharp(file).avif().toFile(outputFileAvif);
    } catch (error) {
        console.error(`Error processing file ${file}:`, error);
    }
}

export function dev(done) {
    console.log('Observando cambios en SCSS y JS...');
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/img/**/*.{png,jpg}', webp);
    done();
}

export default series(crop, js, css, webp, dev);