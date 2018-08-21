const gulp = require('gulp')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const include = require("gulp-include")
const gutil = require('gulp-util')
const notify = require('gulp-notify')
const pump = require('pump')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const postcssobjectfit = require('postcss-object-fit-images')
const cssnano = require('cssnano')
const postcssnormalize = require('postcss-normalize')
const appRoot = require('app-root-path')
const ftp = require('vinyl-ftp')
const fs = require('fs')


const ftpConfig = require("./ftp.json")

// WATCHER SCRIPT
gulp.task('default', ['deploy_styles', 'deploy_scripts'], function() {
  gulp.watch('src/styles/**/*.scss', ['deploy_styles']);
  gulp.watch('src/js/**/*.js', ['deploy_scripts']);
});


// BUNDLE SCRIPTS
gulp.task('bundle_scripts', function(){
  return gulp.src('src/js/*.js')
    .pipe(include())
    .on('error', gutil.log)
    .pipe(uglify())
    .pipe(gulp.dest('_dist/js'))
});

const plugins = [
  postcssnormalize,
  autoprefixer({ grid: true }),
  postcssobjectfit,
  cssnano({ reduceIdents: false }),
];
gulp.task('bundle_styles', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('_dist/css'))
});


// FTP/DEPLOY SCRIPTS
gulp.task('deploy_scripts', ['bundle_scripts'], function () {
  var base = ftpConfig.base
  var rootDist = appRoot.path + "/_dist"
  var globs = [rootDist + "/js/*.js"]
  upload(globs, base)
});

gulp.task('deploy_styles', ['bundle_styles'], function () {
  var base = ftpConfig.base
  var rootDist = appRoot.path + "/_dist"
  var globs = [rootDist + "/css/*.css"]
  upload(globs, base)
} );

function upload(globs, dest){
  if (!ftpConfig.enable) {
    gutil.log('skipping upload')
    return false;
  }
  const conn = ftp.create({
    ...ftpConfig,
    parallel: 5,
    log: gutil.log
  });
  
  //  validates if parent folder path exists
  if (fs.existsSync(globs[0].substring(0, globs[0].lastIndexOf('/')))) {
    // turn off buffering in gulp.src for best performance
    return pump([
      gulp.src(globs, { cwd: '/', buffer: false }),
      conn.newerOrDifferentSize(dest),
      conn.dest(dest),
      notify({
        message: 'Finished deployment.',
        onLast: true
      })
    ])
  } else {
    gutil.log(gutil.colors.red('[Error]'), "Dist file doesn't exists, please verify your paths & files -> " +
      globs[0])
    return null
  }
}

