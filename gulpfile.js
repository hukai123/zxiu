var gulp = require('gulp');
var less = require('gulp-less');

//1.启动服务
var webserver = require('gulp-webserver');

//2.mock 数据
var url = require('url');
var fs = require('fs');

//3.sass 预编译 合并压缩
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css'); //压缩css文件


//4. js 压缩 模块化开发
var named  = require('vinyl-named'); 
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');


var cssFiles = ['src/css/**/*'];

gulp.task('copy-html',function(){
	return gulp.src('src/html/**/*')
	.pipe(gulp.dest('app/prd/html'));
})

gulp.task('copy-index',function(){
	return gulp.src('src/index.html')
	.pipe(gulp.dest('app/prd'));
})

gulp.task('copy-icons',function(){
	return gulp.src('src/icons/**/*')
	.pipe(gulp.dest('app/prd/icons'));
})

gulp.task('copy-img',function(){
	return gulp.src('src/images/**/*')
	.pipe(gulp.dest('app/prd/img'))
})

gulp.task('sass',function(){
	return gulp.src(cssFiles)
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('app/prd/css'))
})

var lessFiles = ['src/css/test.less'];
gulp.task('less',function(){
	return gulp.src(lessFiles)
	.pipe(less().on('error',less.logError))
	.pipe(gulp.dest('app/prd/css'))
})


//启动服务
gulp.task('webserver',function(){
	gulp.src('./')
	.pipe(webserver({
		livereload:true,
		directoryListing:{
			enable:true,
			path:'./'
		},
		port:80,
		host:'localhost',
		middleware: function(req, res, next) {   //middleware 中间键 req :request  , res:respone,
	        var urlObj = url.parse(req.url, true),
	            method = req.method;
	        switch (urlObj.pathname) {
	            case '/app/imgaes':
	                var data = {
	                    "status": 0,
	                    "errmsg": "",
	                    "data": [{}]
	                };
	                console.log(data);
	                res.setHeader('Content-Type', 'application/json');
	                fs.readFile('mock/optlist.json','utf-8',function(err,data){
	                    res.end(data);
	                });
	                return;
	            case 'api/orders':
	               	 console.log(urlObj.pathname)
	               	res.setHeader('Content-Type', 'application/json');
	                fs.readFile('json/data2.json','utf-8',function(err,data){
	                    res.end(JSON.stringify(data));
	                    console.log('thiszkl')
	                });
	                return;
	            case '/api/images':
	                // ...
	                return;
	            default:
	                ;
	        }
	        next();
	    }
	}))
});

// JS 合并压缩 模块化开发
var jsFiles = ['src/js/**/*.js'];

gulp.task('packjs',function(){
	return gulp.src(jsFiles)
	.pipe(named())
	.pipe(webpack({
		output:{
			filename:'[name].js'
		},
		module:{
			loaders:[
			{test:/\.js$/,loader:'imports?define=>false'}
			]
		},
		resolve:{
			alias:{
			}
		},
		devtool:'#eval-source-map'
	}))
	// .pipe(uglify().on('error',function(e){
	// 	console.log('\x07', e.lineNumber, e.message);
	// 	return this.end();
	// }))
	.pipe(gulp.dest('app/prd/js'))
})

// JS  接金币  合并压缩 模块化开发
var getGoldFiles = ['src/getGold/**/*.js'];
gulp.task('getGoldpackjs',function(){
	return gulp.src(getGoldFiles)
	.pipe(named())
	.pipe(webpack({
		output:{
			filename:'[name].js'
		},
		module:{
			loaders:[
			{test:/\.js$/,loader:'imports?define=>false'}
			]
		},
		resolve:{
			alias:{
			}
		},
		devtool:'#eval-source-map'
	}))
	// .pipe(uglify().on('error',function(e){
	// 	console.log('\x07', e.lineNumber, e.message);
	// 	return this.end();
	// }))
	.pipe(gulp.dest('app/prd/getGold'))
})

gulp.task('watch',function(){
	gulp.run('copy-html','sass','packjs','copy-img','copy-icons','copy-index','getGoldpackjs');
	gulp.watch('src/html/**/*',['copy-html']);
	gulp.watch('src/css/**/*',['sass']);
	gulp.watch('src/js/**/*.js',['packjs']);
	gulp.watch('src/images/**/*',['copy-img']);
	gulp.watch('src/icons/**/*',['copy-icons']);
	gulp.watch('src/index.html',['copy-index']);
	gulp.watch('src/getGold/**/*.js',['getGoldpackjs']);
})

gulp.task('default',['webserver','watch']);
