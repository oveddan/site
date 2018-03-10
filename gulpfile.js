const gulp = require('gulp');
const concat = require('gulp-concat');


const themeLibraries = [
    "jquery.min.js"
  , "bootstrap.min.js"
  , "jquery.cookie.js"
  , "ekko-lightbox.js"
  , "jquery.scrollTo.min.js"
  , "masonry.pkgd.min.js"
  , "imagesloaded.pkgd.min.js"
  , "owl.carousel.min.js"
  , "front.js"
].map(library => `themes/portfolio/static/js/${library}`)

gulp.task('build', function() {
  return gulp.src(themeLibraries)
    .pipe(concat('vendor_bundle.js'))
    .pipe(gulp.dest('./static/js'));
});
