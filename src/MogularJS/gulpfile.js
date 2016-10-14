/// <binding BeforeBuild='debug' Clean='clean' />
"use strict";
var concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    gulp = require("gulp"),
    ignore = require('gulp-ignore'),
    Karma = require("karma").Server,
    mergeJson = require("gulp-merge-json"),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    rimraf = require("rimraf"),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    typings = require('gulp-typings'),
    uglify = require("gulp-uglify");

var tsProjectSrc = ts.createProject({
    removeComments: false,
    noImplicitAny: true,
    noEmitHelpers: false,
    noEmitOnError: true,
    noLib: false,
    target: 'es5',
    noExternalResolve: false,
    sortOutput: true
});
var tsProjectSpec = ts.createProject({
    removeComments: false,
    noImplicitAny: true,
    noEmitHelpers: false,
    noEmitOnError: true,
    noLib: false,
    target: 'es5',
    noExternalResolve: false,
    sortOutput: true
});

var paths = {
    webroot: "./wwwroot/",
    output: "dist/"
};
paths.configSrc = paths.webroot + "modules/**/*.config.json";
paths.configOutputFile = paths.webroot + paths.output + "config.js";
paths.configOutputMinFile = paths.webroot + paths.output + "config.min.js";
paths.cssSrc = paths.webroot + "css/**/*.css";
paths.cssOutputFile = paths.webroot + paths.output + "app.css";
paths.cssOutputMinFile = paths.webroot + paths.output + "app.min.css";
paths.specSrc = paths.webroot + "modules/**/specs/*.ts";
paths.tsOutputFile = paths.webroot + paths.output + "app.js";
paths.tsOutputMinFile = paths.webroot + paths.output + "app.min.js";
paths.tsSrc = paths.webroot + "modules/**/*.ts";
paths.tsSpecOutputFile = paths.webroot + paths.output + "specs.js";

gulp.task("default", ["css", "spec", "src"]);
gulp.task("clean", ["clean:config", "clean:css", "clean:spec", "clean:src"]);
gulp.task("clean:config", function (cb) {
    rimraf(paths.webroot + paths.output + "/config*.js", cb);
});
gulp.task("clean:css", function (cb) {
    rimraf(paths.webroot + paths.output + "/*.css*", cb);
});
gulp.task("clean:spec", function (cb) {
    rimraf(paths.webroot + paths.output + "/specs.js", cb);
});
gulp.task("clean:src", ['clean:config'], function (cb) {
    rimraf(paths.webroot + paths.output + "/app*.js*", cb);
});
gulp.task("config", ['clean:config'], function () {
    return gulp.src(paths.configSrc, { base: "." })
        .pipe(mergeJson(paths.configOutputFile, function (parsedJson, file) {
            var obj = {};
            obj[parsedJson.name] = parsedJson;
            return obj;
        }, false, false, 'var MogularJS = MogularJS || {}; MogularJS.Configuration'))
        .pipe(gulp.dest("."))
        .pipe(uglify())
        .pipe(rename(paths.configOutputMinFile))
        .pipe(gulp.dest("."));
});
gulp.task("css", ['clean:css'], function () {
    return gulp.src(paths.cssSrc)
        .pipe(concat(paths.cssOutputFile))
        .pipe(gulp.dest("."))
		.pipe(cssmin())
		.pipe(rename(paths.cssOutputMinFile))
        .pipe(gulp.dest("."));
});
gulp.task('spec', ['clean:spec', 'tslint'], function () {
    var tsResult = gulp.src(paths.specSrc)
        .pipe(ts(tsProjectSpec));
    return tsResult.js
        .pipe(concat(paths.tsSpecOutputFile))
        .pipe(gulp.dest("."));
});
gulp.task('src', ['clean:src', 'config', 'tslint'], function () {
    var tsResult = gulp.src([paths.tsSrc, "!" + paths.unitTestSrc])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProjectSrc));
    return tsResult.js
        .pipe(concat(paths.tsOutputFile))
        //write comments to tell istanbul to ignore the code inside the iife parameters
        .pipe(replace(/(}\)\()(.*\|\|.*;)/g, '$1/* istanbul ignore next */$2'))
        //write comments to tell istanbul to ignore the extends code that typescript generates
        .pipe(replace(/(var __extends = \(this && this.__extends\))/g, '$1/* istanbul ignore next */'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: '/modules/' }))
        .pipe(gulp.dest("."))
        .pipe(ignore.exclude("*.map"))
        .pipe(uglify())
        .pipe(rename(paths.tsOutputMinFile))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: '../..' }))
        .pipe(gulp.dest("."));
});
gulp.task("test:continuous", ["spec"], function () {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['Chrome'],
        singleRun: false
    }).start();
});
gulp.task("test:single", ["spec"], function () {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['Chrome'],
        singleRun: true
    }).start();
});
gulp.task('tslint', function () {
    return gulp.src(paths.tsSrc)
        .pipe(tslint({ configuration: './tslint.json' }))
		.pipe(tslint.report('verbose'));
});
gulp.task("typings", function () {
    var stream = gulp.src("./typings.json")
        .pipe(typings());
    return stream;
});



