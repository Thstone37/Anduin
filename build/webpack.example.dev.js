var webpack=require("webpack");
var baseWebpackConfig=require("./webpack.base.config.js");
var merge=require("webpack-merge");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var path=require("path");
var utils=require("./utils.js");
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
function resolve(dir){
	return path.resolve(__dirname,"..",dir)
}
module.exports=merge(baseWebpackConfig,{
	entry:{
      app:'../example/main.js'
	},
	output:{
       path:resolve("example/dist"),
       publicPath:resolve("/"),
       filename:'[name].js'
	},
	module:{
		rules:utils.styleLoaders({sourceMap:true})
	},
	// vue:{
	// 	loaders:utils.cssLoaders({sourceMap:true})
	// },
	devtool:"#cheap-module-eval-source-map",
	pulgins:[
       new HtmlWebpackPlugin({
       	    filename:path.resolve(__dirname,"../example/example.html"),
       		inject:true
       }),
       //webpack-hot-middleware  useage setting
       new webpack.optimize.OccurrenceOrderPlugin(),
	   new webpack.HotModuleReplacementPlugin(),
       new webpack.NoErrorsPlugin(),
       new FriendlyErrorsPlugin()
	]
})