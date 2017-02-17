var baseWebpackConfig=require("./webpack.example.dev.js");
var webpack=require("webpack");
var webpackConfigMerge=require("webpack-merge")
var ora=require("ora");
var spinner = ora('building for production...')
var utils=require("./utils.js");
var express=require("express");
var proxyMiddleWare=require("http-proxy-middleware");
spinner.start()

var webpackConfig=webpackConfigMerge(baseWebpackConfig,{
  vue:{
    loaders:utils.cssLoaders({sourceMap:true})
  },
  devtool:"#source-map",
	plugins:[
      new webpack.optimize.UglifyJsPlugin({
      	compress:{
      		warnings:false
      	}
      })
	]
})
var compiler=webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

var app=express();
var devMiddleware=require("webpack-dev-middleware")(compiler,{
    publicPath:webpackConfig.output.publicPath,
    stats:{
      color:true,
      chunks:false
    }
})

var hotMiddleware=require("webpack-hot-middleware")(comiler,{
  
})