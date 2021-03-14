const CracoLessPlugin = require("craco-less");

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    watch: true,
    loader: "workerize-loader",
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
