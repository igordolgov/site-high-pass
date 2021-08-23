const devFolder = 'dev';
const distFolder = 'dist';
const srcFolder = 'src';

const path = {
  dev: {
    html: devFolder + '/',
    css: devFolder + '/css/',
    js: devFolder + '/js/',
    img: devFolder + '/img/',
    svg: devFolder + '/img/svg/',
    fonts: devFolder + '/fonts/',
  },
  dist: {
    html: distFolder + '/',
    css: distFolder + '/css/',
    js: distFolder + '/js/',
    img: distFolder + '/img/',
    svg: distFolder + '/img/svg/',
    fonts: distFolder + '/fonts/',
  },
  src: {
    pug: srcFolder + '/pug/index.pug',
    html: srcFolder + '/*.html',
    css: srcFolder + '/styles/**/*.scss',
    js: srcFolder + '/js/**/*.js',
    img: srcFolder + '/img/**/*.{jpg, jpeg, png, svg, gif, ico, webp}',
    svg: srcFolder + '/img/svg/**/*.svg',
    fonts: srcFolder + '/fonts/*.ttf',
  },
  watch: {
    pug: srcFolder + '/pug/*.pug',
    html: srcFolder + '/**/*.html',
    css: srcFolder + '/styles/**/*.scss',
    js: srcFolder + '/js/**/*.js',
    img: srcFolder + '/img/**/*.{jpg, jpeg, png, svg, gif, ico, webp}',
    svg: srcFolder + '/img/svg/*.svg',
  },
}

const {
  src,
  dest
} = require('gulp');
const gulp = require('gulp');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const scss = sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const groupMediaQueries = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHtml = require('gulp-webp-html');
const pug = require('gulp-pug');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

// BROWSER SYNC
const watchFilesBrowserSync = (opts) => {
  browserSync.init({
    server: {
      baseDir: path.dev.html,
    }
  });
}

// PUG
const pug2html = () => {
  return src(path.src.pug)
    .pipe(pug())
    // .pipe(webpHtml())
    .pipe(dest(path.dist.html))
}
const pug2htmlDev = () => {
  return src(path.src.pug)
    .pipe(pug())
    // .pipe(webpHtml())
    .pipe(dest(path.dev.html))
    .pipe(browserSync.stream())
}

// HTML
const htmlMinify = () => {
  return src(path.src.html)
    .pipe(webpHtml())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest(path.dist.html))
}
const htmlMinifyDev = () => {
  return src(path.src.html)
    .pipe(webpHtml())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest(path.dev.html))
    .pipe(browserSync.stream())
}

// SCSS
const styles = () => {
  return src(path.src.css)
    // .pipe(concat('style.scss'))
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(cleanCss({
      level: 2,
    }))
    .pipe(dest(path.dist.css))
}
const stylesDev = () => {
  return src(path.src.css)
    .pipe(sourcemaps.init())
    // .pipe(concat('style.scss'))
    .pipe(scss({
      outputStyle: 'expanded',
    }))
    .pipe(autoprefixer())
    .pipe(groupMediaQueries())
    .pipe(cleanCss({
      level: 2,
    }))
    .pipe(sourcemaps.write())
    .pipe(dest(path.dev.css))
    .pipe(browserSync.stream())
}

// JS
const scripts = () => {
  return src([
      path.src.js,
      'src/js/main.js',
    ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true,
    }).on('error', notify.onError))
    .pipe(dest(path.dist.js))
}
const scriptsDev = () => {
  return src([
      path.src.js,
      'src/js/main.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true,
    }).on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest(path.dev.js))
    .pipe(browserSync.stream())
}

// IMAGES
const images = () => {
  return src(path.src.img)
    .pipe(webp({
      quality: 70,
    }))
    .pipe(dest(path.dist.img))
    .pipe(src(path.src.img))
    .pipe(imageMin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(dest(path.dist.img))
}
const imagesDev = () => {
  return src(path.src.img)
    .pipe(webp({
      quality: 70,
    }))
    .pipe(dest(path.dev.img))
    .pipe(src(path.src.img))
    .pipe(imageMin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(dest(path.dev.img))
    .pipe(browserSync.stream())
}

// SVG mapdote
const svgMapdote = () => {
  return src('src/img/contacts/*.svg')
    .pipe(dest('dist/img/contacts/'))
}
const svgMapdoteDev = () => {
  return src('src/img/contacts/*.svg')
    .pipe(dest('dev/img/contacts/'))
}

// SVG SPRITES
const svgSpritesDev = () => {
  return src(path.src.svg)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
        },
      },
    }))
    .pipe(dest(path.dev.svg))
}
const svgSprites = () => {
  return src(path.src.svg)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
        },
      },
    }))
    .pipe(dest(path.dist.svg))
}

// FONTS
const fonts = () => {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.dist.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.dist.fonts))
}
const fontsDev = () => {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.dev.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.dev.fonts))
}

const fontsStyleDev = () => {
  let file_content = fs.readFileSync(srcFolder + '/styles/_fonts.scss');
  if (file_content == '') {
    fs.writeFile(srcFolder + '/styles/_fonts.scss', '', cb);
    return fs.readdir(path.dev.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(srcFolder + '/styles/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
}

const cb = () => {}

// CLEAN FOLDER
const cleanDev = () => {
  return del([path.dev.html])
}
const cleanDist = () => {
  return del([path.dist.html])
}

// WATCH FILES
const watchFiles = (opts) => {
  gulp.watch([path.watch.html], htmlMinifyDev);
  gulp.watch([path.watch.css], stylesDev);
  gulp.watch([path.watch.js], scriptsDev);
  gulp.watch([path.watch.img], imagesDev);
  gulp.watch([path.watch.pug], pug2htmlDev);
  gulp.watch([path.watch.svg], svgSpritesDev);
}

const dev = gulp.series(cleanDev,  htmlMinifyDev, gulp.parallel(pug2htmlDev, imagesDev, svgSpritesDev, scriptsDev, stylesDev, fontsDev, svgMapdoteDev));
const build = gulp.series(cleanDist, htmlMinify, styles, scripts, svgSprites, images, pug2html, fonts, svgMapdote);
const watch = gulp.parallel(dev, watchFiles, watchFilesBrowserSync);

// exports.fontsStyleDev = fontsStyleDev;

exports.pug2html = pug2html;
exports.pug2htmlDev = pug2htmlDev;
exports.htmlMinify = htmlMinify;
exports.htmlMinifyDev = htmlMinifyDev;
exports.styles = styles;
exports.stylesDev = stylesDev;
exports.scripts = scripts;
exports.scriptsDev = scriptsDev;
exports.svgSprites = svgSprites;
exports.svgSpritesDev = svgSpritesDev;
exports.images = images;
exports.imagesDev = imagesDev;
exports.fonts = fonts;
exports.fontsDev = fontsDev;
exports.build = build;
exports.dev = dev;
exports.watch = watch;
exports.default = watch;