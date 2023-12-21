// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add the following fallback to resolve 'crypto' module
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify")
  };

  return config;
};
