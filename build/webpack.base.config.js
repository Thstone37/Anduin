
var path=require("path");
var projectRoot=path.resolve(__dirname,"../")

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
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'src': resolve("src"),
    }
  },
  module:{
  	loaders:[
      {
      	test:"/\.vue$/",
      	loader:"vue",
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
