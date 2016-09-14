/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	eval("/*** IMPORTS FROM imports-loader ***/\nvar define = false;\n\nfunction getGoodsData(classID,pageCode,linenumber,slide){\r\n\tvar thisClassID = classID?classID:0;\r\n\tvar thisPageCode = pageCode?pageCode:0;\r\n\tvar thisSlide = slide?slide:0;\r\n\tvar thisLineNumber = linenumber?linenumber:6;\r\n\tvar params = {\r\n\t\tclassID:thisClassID,\r\n\t\tpageCode:thisPageCode,\r\n\t\tlinenumber:thisLineNumber\r\n\t}\r\n\t$.ajax({\r\n\t\turl:'http://datainfo.duapp.com/shopdata/getGoods.php',\r\n\t\ttype:'get',\r\n\t\tdata:params,\r\n\t\tdataType:'jsonp',\r\n\t\tsuccess:function(data){\r\n\t\t\tconsole.log(data.length);\r\n\t\t\tif(data.length){\r\n\t\t\t\t$.each(data,function(i){\r\n\t\t\t\t\tvar oldPrice = parseInt(data[i].price*data[i].discount*0.1);\r\n\t\t\t\t\tvar oLi = $(\"<li><dl><dt><img src=\"+data[i].goodsListImg+\"></dt><dd><h3>\"+data[i].goodsName+\"</h3><div><b class='price'>￥\"+oldPrice+\"</b><span class='oldprice'>￥\"+data[i].price+\"</span></div><span class='discount'>\"+data[i].discount+\"折</span><a href='#'></a></dd></dl></li>\")\r\n\t\t\t\t\t$('#thelist').append(oLi);\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t}\r\n\t})\r\n}\r\n\r\nmodule.exports = getGoodsData();\n\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0R29vZERhdGEuanM/Nzc0MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiogSU1QT1JUUyBGUk9NIGltcG9ydHMtbG9hZGVyICoqKi9cbnZhciBkZWZpbmUgPSBmYWxzZTtcblxuZnVuY3Rpb24gZ2V0R29vZHNEYXRhKGNsYXNzSUQscGFnZUNvZGUsbGluZW51bWJlcixzbGlkZSl7XHJcblx0dmFyIHRoaXNDbGFzc0lEID0gY2xhc3NJRD9jbGFzc0lEOjA7XHJcblx0dmFyIHRoaXNQYWdlQ29kZSA9IHBhZ2VDb2RlP3BhZ2VDb2RlOjA7XHJcblx0dmFyIHRoaXNTbGlkZSA9IHNsaWRlP3NsaWRlOjA7XHJcblx0dmFyIHRoaXNMaW5lTnVtYmVyID0gbGluZW51bWJlcj9saW5lbnVtYmVyOjY7XHJcblx0dmFyIHBhcmFtcyA9IHtcclxuXHRcdGNsYXNzSUQ6dGhpc0NsYXNzSUQsXHJcblx0XHRwYWdlQ29kZTp0aGlzUGFnZUNvZGUsXHJcblx0XHRsaW5lbnVtYmVyOnRoaXNMaW5lTnVtYmVyXHJcblx0fVxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6J2h0dHA6Ly9kYXRhaW5mby5kdWFwcC5jb20vc2hvcGRhdGEvZ2V0R29vZHMucGhwJyxcclxuXHRcdHR5cGU6J2dldCcsXHJcblx0XHRkYXRhOnBhcmFtcyxcclxuXHRcdGRhdGFUeXBlOidqc29ucCcsXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhLmxlbmd0aCk7XHJcblx0XHRcdGlmKGRhdGEubGVuZ3RoKXtcclxuXHRcdFx0XHQkLmVhY2goZGF0YSxmdW5jdGlvbihpKXtcclxuXHRcdFx0XHRcdHZhciBvbGRQcmljZSA9IHBhcnNlSW50KGRhdGFbaV0ucHJpY2UqZGF0YVtpXS5kaXNjb3VudCowLjEpO1xyXG5cdFx0XHRcdFx0dmFyIG9MaSA9ICQoXCI8bGk+PGRsPjxkdD48aW1nIHNyYz1cIitkYXRhW2ldLmdvb2RzTGlzdEltZytcIj48L2R0PjxkZD48aDM+XCIrZGF0YVtpXS5nb29kc05hbWUrXCI8L2gzPjxkaXY+PGIgY2xhc3M9J3ByaWNlJz7vv6VcIitvbGRQcmljZStcIjwvYj48c3BhbiBjbGFzcz0nb2xkcHJpY2UnPu+/pVwiK2RhdGFbaV0ucHJpY2UrXCI8L3NwYW4+PC9kaXY+PHNwYW4gY2xhc3M9J2Rpc2NvdW50Jz5cIitkYXRhW2ldLmRpc2NvdW50K1wi5oqYPC9zcGFuPjxhIGhyZWY9JyMnPjwvYT48L2RkPjwvZGw+PC9saT5cIilcclxuXHRcdFx0XHRcdCQoJyN0aGVsaXN0JykuYXBwZW5kKG9MaSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldEdvb2RzRGF0YSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9nZXRHb29kRGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);