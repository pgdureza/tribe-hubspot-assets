module.exports = function () {
  this.appRoot = require('app-root-path')
  this.config = require(this.appRoot.path + '/config/config.json')
  this.gulp = require('gulp')
  this.babel = require('gulp-babel')
  this.sourcemaps = require('gulp-sourcemaps')
  this.gulpif = require('gulp-if')
  this.watch = require('gulp-watch')
  this.concat = require('gulp-concat')
  this.sass = require('gulp-sass')
  this.less = require('gulp-less')
  this.stylus = require('gulp-stylus')
  this.uglify = require('gulp-uglify')
  this.autoprefixer = require('autoprefixer')
  this.rename = require('gulp-rename')
  this.notify = require('gulp-notify')
  this.obfuscator = require('gulp-javascript-obfuscator')
  this.touch = require('gulp-touch-cmd')
  this.del = require('del')
  this.pump = require('pump')
  this.gutil = require('gulp-util')
  this.ftp = require('vinyl-ftp')
  this.path = require('path')
  this.postcss = require('gulp-postcss')
  this.cssnano = require('cssnano')
  this.postcssnormalize = require('postcss-normalize')
  this.strip = require('gulp-strip-comments')
  this.fs = require('fs')
  this.utils = require('./utils.js')()
}
