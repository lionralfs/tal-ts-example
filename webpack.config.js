const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public/dist')
  },
  devServer: {
    contentBase: 'public'
  }
};
