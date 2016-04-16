
module.exports = {
  entry: { "admin-react": "./app/admin-react/router.js" },
  output: {
    path: __dirname + '/js/dist',
    filename: "[name].js"
  },
  resolve: {
    root: [
      __dirname + '/app/admin-react'
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
