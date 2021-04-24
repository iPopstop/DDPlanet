const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

/*if(process.env.VUE_APP_HTTPS) {
  devOptions = {
    port: process.env.VUE_APP_DEV_PORT,
    host: process.env.VUE_APP_HOST,
    https: {
      key: fs.readFileSync(process.env.VUE_APP_HTTPS_KEY_PATH),
      cert: fs.readFileSync(process.env.VUE_APP_HTTPS_CRT_PATH),
    }
  }
}*/

module.exports = {
    chainWebpack: (config) => {
        // @ -> src, @/images -> src/images
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'));

        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();
        svgRule
            .oneOf('raw')
            .resourceQuery(/raw/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
            .end()
            .oneOf('base64')
            .resourceQuery(/base64/)
            .use('url-loader')
            .loader('url-loader')
            .end()
            .end()
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                svgo: {
                    plugins: [{ removeDoctype: true }, { removeComments: true }],
                    removeViewBox: false,
                },
            })
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]',
            });
    },
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false,
            files: 'src/assets/styles/**/*.scss',
        },
    },
    productionSourceMap: false,
    runtimeCompiler: true,
    configureWebpack: {
        devtool: 'source-map',
        devServer: {
            overlay: {
                warnings: true,
                errors: false,
            },
        },
        plugins: [
            new webpack.ContextReplacementPlugin(
              /moment[/\\]locale$/,
              /ru/
            ),
        ],
    },

    outputDir: process.env.VUE_APP_OUTPUT_DIR,

    publicPath:
        process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_PUBLIC_PROD_PATH
            : process.env.VUE_APP_PUBLIC_PATH,

    indexPath:
        process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_INDEX_PROD_PATH
            : process.env.VUE_APP_INDEX_PATH,

    devServer: {
        port: process.env.VUE_APP_DEV_PORT,
        host: process.env.VUE_APP_HOST,
        /*https: {
          key: fs.readFileSync(process.env.VUE_APP_HTTPS_KEY_PATH),
          cert: fs.readFileSync(process.env.VUE_APP_HTTPS_CRT_PATH),
        },*/
    },
};
