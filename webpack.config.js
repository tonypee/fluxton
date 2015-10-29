var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var loader = require('babel-loader');


// node_modules to ignore

var nodeModules = {
  'events': 'commonjs events'
};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// config

module.exports = {
  target:'node',
  entry: './index.js',
  output: {
    filename: 'dist/bundle.js',
    libraryTarget: 'commonjs2'
  },
 // devtool: 'source-map',
  module: {
	loaders: [
			{
				test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	},
	externals: nodeModules
};