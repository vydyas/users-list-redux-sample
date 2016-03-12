const srcPath = require('path').join(__dirname, '/../src');
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: 8000,
  getDefaultModules: function () {
    return {
      // preLoaders: [ {
      //   test: /\.(js|jsx)$/,
      //   include: srcPath,
      //   loader: 'eslint-loader'
      // } ],
      loaders: [
        { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
        { test: /\.styl/, loader: 'style-loader!css-loader!postcss-loader!stylus-loader' },
        { test: /\.(png|jpg|gif|woff|woff2)$/, loader: 'url-loader?limit=8192' },
        { test: /\.(mp4|ogg|svg)$/, loader: 'file-loader' }
      ]
    };
  },
  postcss: function () {return [];}
};
