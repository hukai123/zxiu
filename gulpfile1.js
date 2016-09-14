var  gulp = require('gulp');

//1 创建服务
var webserver = require('gulp-webserver');

//2 依赖sass插件 编译scss文件
var sass = require('gulp-sass');

//3 图片压缩
//var imagemin = require('gulp-imagemin');

//4 实现js模块化
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
//启动服务
gulp.task('webserver',function(){
	gulp.src('./')
	.pipe(webserver({
		livereload:true,       //实时刷新
		directoryListing:{    //要不要在浏览器中显示应用app的目录
			enable:true,      //显示 （线上不能如此设置）
			path:'./'         //显示与gulpfile.js同级别的子目录，也可以改路径指定显示哪些文件
		},
		port:'82',
		host:'localhost'
	}))
})

//（复制html文件）   ** 表示找到所有文件的子文件
var htmlFiles = ['dist/html/**/*','index.html'];
gulp.task('copy-html',function(){
	return gulp.src(htmlFiles)
	.pipe(gulp.dest('app/zouxiu/html'));
})

//复制压缩图片
var imageFiles = ['dist/images/**/*'];
gulp.task('copy-image',function(){
	return gulp.src(imageFiles)
//	.pipe(imagemin())
	.pipe(gulp.dest('app/zouxiu/images'));
})

// 预编译scss文件
var scssFiles = ['dist/css/**/*.scss'];
gulp.task('sass',function(){
	return gulp.src(scssFiles)
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('app/zouxiu/css'));
})

//复制  通过webpack 实现 js模块化
var jsFiles = ['dist/js/**/*']
gulp.task('packjs',function(){
	return gulp.src(jsFiles)
	.pipe(named())     //取出每一个js的name ，比如shouye.js ===>name = shouye
	.pipe(webpack({
		output:{
			filename:'[name].js'  //输出对应的实现模块化的js文件,===>shouye.js
		},
		module:{
			loaders:[      //loaders 表示转换器  
				{test:/\.js$/,loader:'imports?define=>false'}
			]
		},
		resolve:{   //当项目文件路径或者文件名称过长过深，做的一些处理
			alias:{  // alias表示别名出来

			}
		},
		devtool:'#eval-source-map'   ////子模块的 js调试
	}))
	.pipe(gulp.dest('app/zouxiu/js'));
})




//监听
gulp.task('watch',function(){
	gulp.watch(htmlFiles,['copy-html']);
	gulp.watch(scssFiles,['sass']);
	gulp.watch(imageFiles,['copy-image']);
	gulp.watch(jsFiles,['packjs']);
})	

gulp.task('default',['watch','webserver']);
