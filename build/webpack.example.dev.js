var webpack=require("webpack");
var baseWebpackConfig=require("./webpack.base.config.js");
var merge=require("webpack-merge");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var path=require("path");
var utils=require("./utils.js");
function resolve(dir){
	return path.resolve(__dirname,"..",dir)
}
module.exports=merge(baseWebpackConfig,{
	entry:{
      app:'./example/main.js'
	},
	output:{
       path:resolve("example/dist"),
       filename:'[name].js'
	},
	module:{
		loaders:utils.styleLoaders({sourceMap:true})
	}
	vue:{
		loaders:utils.cssLoaders({sourceMap:true})
	},
	devtool:"#eval-source-map",
	pulgins:[
       new HtmlWebpackPlugin({
       	    filename:path.resolve(__dirname,"../example/example.html")
       		inject:true,
       })
	]
})