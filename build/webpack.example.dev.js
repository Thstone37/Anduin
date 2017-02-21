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
      app:'./examples/main.js'
	},
	output:{
       path:resolve("examples/dist"),
       publicPath:"/examples/",
       filename:'[name].js'
	},
	module:{
		rules:utils.styleLoaders({sourceMap:true})
	},
	devtool:"#cheap-module-eval-source-map",
	plugins:[
       new HtmlWebpackPlugin({
       	    filename:"example.html",
       	    template:"./examples/example.html",
       		inject:true
       }),
       //webpack-hot-middleware  useage setting
       new webpack.optimize.OccurrenceOrderPlugin(),
	   new webpack.HotModuleReplacementPlugin(),
       // new webpack.NoErrorsPlugin(),
       new FriendlyErrorsPlugin()
	]
})