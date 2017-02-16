var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//sass less等各种loader配置
exports.cssLoaders = function(options) {
	var options = options || {};

	function generateLoaders(loaders) {
		var sourceLoader = loaders.map(function(loader) {
			var extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, "-loader");
				extraParamChar = "&";
			} else {
				loader = loader + "-loader";
				extraParamChar = "?";
			}
			return loader + (options.sourceMap ? extraParamChar + "sourceMap" : "")
		}).join("!")
		if (options.extract) {
			return ExtractTextPlugin.extract("vue-style-loader", sourceLoader)
		} else {
			return ["vue-style-loader", sourceLoader].join("!");
		}
	}
	return {
		css: generateLoaders(["css"]),
		postcss: generateLoaders(["css", "postcss"]),
		less: generateLoaders(["css", "less"]),
		sass: generateLoaders(["css", "sass?indentedSyntax"]),
		scss: generateLoaders(["css", "sass"]),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	}
}
exports.styleLoaders = function(options) {
	var output = [];
	var loaders = exports.cssLoaders(options);
	for (var key in loaders) {
		var loader = loaders[key];
		output.push({
			test: new RegExp("\\." + key + "$"),
			loader: loader
		})
	}
	return output;
}