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
    modules: [resolve('src'),resolve("examples"),resolve("packages"),resolve('node_modules')],
    alias: {
      'src': resolve("examples/src"),
      "examples":resolve("examples"),
      "packages":resolve("packages"),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module:{
  	rules:[
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolve('src'), resolve('examples'),resolve("packages")],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
      	test:/\.vue$/,
      	loader:"vue-loader",
        options:{loaders:utils.cssLoaders({sourceMap:true})}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve("src"),resolve("examples"),resolve("packages")],
        exclude: [resolve("node_modules")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
  	]
  }
}
