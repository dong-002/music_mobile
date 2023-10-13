const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    devServer: {
      open: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          pathRewrite: {
            "^/api":""
          }
        }
      }
    }
  }
})
