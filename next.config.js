const path = require('path');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    if (process.env.NODE_ENV === 'development') config.plugins.push(new DotenvWebpack({ silent: true }));
    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
}
