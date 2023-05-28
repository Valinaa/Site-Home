import gulp from "gulp";
const { task, src, dest, series, watch, parallel } = gulp;
import minifyCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import htmlMin from "gulp-htmlmin";
import htmlClean from "gulp-htmlclean";
import { deleteAsync } from "del";
import babel from "gulp-babel";
import { server } from "gulp-connect";
import pug from "gulp-pug";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";

const sass = gulpSass(nodeSass);
const { logError } = sass;

import config from "./config.json" assert { type: "json" };
task("clean", function () {
	return deleteAsync(["./dist/css/", "./dist/js/"]);
});

task("css", function () {
	return src("./src/css/*.scss")
		.pipe(sass().on("error", logError))
		.pipe(minifyCSS({ compatibility: "ie8" }))
		.pipe(dest("./dist/css"));
});

task("html", function () {
	return src("./dist/index.html")
		.pipe(htmlClean())
		.pipe(htmlMin())
		.pipe(dest("./dist"));
});

task("js", function () {
	return src("./src/js/*.js")
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(uglify())
		.pipe(dest("./dist/js"));
});

task("pug", function () {
	return src("./src/index.pug")
		.pipe(pug({ data: config }))
		.pipe(dest("./dist"));
});

task("assets", function () {
	return src(["./src/assets/**/*"]).pipe(dest("./dist/assets"));
});

task("build", series("clean", "assets", "pug", "css", "js", "html"));
task("default", series("build"));

task("watch", function () {
	watch("./src/components/*.pug", parallel("pug"));
	watch("./src/index.pug", parallel("pug"));
	watch("./src/css/**/*.scss", parallel(["css"]));
	watch("./src/js/*.js", parallel(["js"]));
	server({
		root: "dist",
		livereload: true,
		port: 8080,
	});
});
