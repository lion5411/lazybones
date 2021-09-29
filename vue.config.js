module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js',
        },
      },
    },
  },
  // chrome extension Content Security Policy
  configureWebpack: (config) => {
    config.devtool = "inline-source-map";
  },
};
