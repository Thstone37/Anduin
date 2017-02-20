var path=require("path");
var projectRoot=path.resolve(__dirname,"../")
var utils=require("./utils.js")

function resolve(dir){
   return path.resolve(__dirname,"..",dir)
}
module.exports={
  entry:{
  	app:"./src/index.js"
  },
  output:{
  	path:path.resolve(__dirname,"../dist"),
  	filename:"Anduin.common.js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'src': resolve("src"),
    }
  },
  module:{
  	rules:[
      {
      	test:"/\.vue$/",
      	loader:"vue-loader",
        options:utils.cssLoaders({sourceMap:true})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
  	]
  }
}
