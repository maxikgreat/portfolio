const path = require('path');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.plugins.push(new DotenvWebpack({ silent: true }));
    return config;
  }
}
