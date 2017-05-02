
module.exports = {
  entry: { 
    "admin-react": "./app/admin-react/router.js",
    "bundle": "./react/app.js"
  },
  output: {
    path: __dirname + '/js/dist',
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      __dirname + '/app/admin-react',
      __dirname + '/react'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
