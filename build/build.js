/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-15 18:59:54
 * @version $Id$
 */
var webpackConfig=require("./webpack.base.config.js");
var webpack=require("webpack");
var ora=require("ora");
var spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, function (err, stats) {
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
