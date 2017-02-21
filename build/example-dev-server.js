var webpackConfig=require("./webpack.example.dev.js");
var webpack=require("webpack");
var webpackConfigMerge=require("webpack-merge")
var ora=require("ora");
var spinner = ora('building for production...')
var utils=require("./utils.js");
var express=require("express");
var config=require("./config");
var proxyMiddleWare=require("http-proxy-middleware");
var path=require("path")
spinner.start()
// var webpackConfig=webpackConfigMerge(baseWebpackConfig,{
//   devtool:"#source-map",
// 	plugins:[
//       new webpack.optimize.UglifyJsPlugin({
//       	compress:{
//       		warnings:false
//       	}
//       })
// 	]
// })
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
    quiet:true,
    stats:{
      colors:true,
      chunks:false
    }
})

var hotMiddleware=require("webpack-hot-middleware")(compiler,{
  log:() =>{}
});
compiler.plugin("compilation",function(compilation){
  compilation.plugin("html-webpack-plugin-after-emit",function(data,cb){
       hotMiddleware.publish({actiton:"reload"});
       cb();
  })
})
var port=config.example.port||8080;
var proxyObject=config.example.proxyObject;
Object.keys(proxyObject).forEach(function(context){
  var options=proxyOject[context];
  if(typeof options=="string"){
    options={target:options};
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

//history API fallback Adapt
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);
// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(path.join("/","dist"),express.static("./dist"));
module.exports=app.listen(port,function(err){
  if(err){
    console.log(err);
    return;
  }
  var uri="http://localhost:"+port;
  console.log("Listening at"+port+"\n");
})