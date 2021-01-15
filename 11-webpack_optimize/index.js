/*
* 1. 减少Webpack打包时间
*  */

/*
* 优化Loader  --- 优化 Loader 的文件搜索范围
* */
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用babel
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true', // 将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间
        // 只在src文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ],
    /*
* HappyPack
*
* description 受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况,HappyPack 可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了
* */
    loaders: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        // id 后面的内容对应如下
        loader: 'happypack/loader?id=happybabel'
      }
    ]
  },
}

let devWebpackConfig = {
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory'],
      // 开启 4 个线程
      threads: 4
    })
  ]
}

/*----------------------------------------------------------------------------------*/

/*
* DllPlugin
*
* description  DllPlugin 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案
* */

// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和output.library一致
      name: '[name]-[hash]',
      // 该属性需要与DllReferencePlugin中一直
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
// webpack.conf.js
module.exports = {
  // ...省略其它配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __drname,
      // manifest就是打包出来的json文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
/*
* 代码压缩
*
* 在 Webpack3 中，我们一般使用 UglifyJS 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率
* 在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能
*
* + resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
* + resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
* + module.noParse：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助
* */

/*
* Scope Hoisting
* Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去
*
* */
