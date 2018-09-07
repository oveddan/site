const gulp = require('gulp');
const concat = require('gulp-concat');


const themeLibraries = [
    "jquery.min.js",
  // ,"jquery.modal.min.js"
  , "bootstrap.min.js"
  , "jquery.cookie.js"
  , "ekko-lightbox.js"
  , "jquery.scrollTo.min.js"
  , "masonry.pkgd.min.js"
  , "imagesloaded.pkgd.min.js"
  , "owl.carousel.min.js"
  , "front.js"
].map(library => `themes/portfolio/static/js/${library}`)

const themeCss = [
  "bootstrap.min.css",
  // ,"jquery.modal.min.css",
  "font-awesome.min.css",
  "owl.carousel.css",
  "owl.theme.css",
  "style.default.css"
].map(library => `themes/portfolio/static/css/${library}`);

gulp.task('bundle-js', function() {
  return gulp.src(themeLibraries)
    .pipe(concat('vendor_bundle.js'))
    .pipe(gulp.dest('./static/js'));
});

gulp.task('bundle-css', function() {
  return gulp.src(themeCss)
    .pipe(concat('vendor_bundle.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('build', ['bundle-js', 'bundle-css']);
