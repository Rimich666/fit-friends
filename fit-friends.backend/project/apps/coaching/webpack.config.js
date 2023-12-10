const { composePlugins, withNx } = require('@nx/webpack');
const CopyPlugin = require('copy-webpack-plugin');
const {resolve} = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins.push(new CopyPlugin({
    patterns: [
      {
        from: resolve(__dirname, '../../libs/models/coaching/prisma/schema.prisma'),
        to: resolve(__dirname, '../../dist/apps/coaching/assets/prisma')
      },
    ],
  }),)
  return config;
});
