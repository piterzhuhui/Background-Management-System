const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    publicPath: '/',   // 根域上下文目录
    outputDir: 'dist',// 构建输出目录
    assetsDir:'assets',//静态资源目录(js,css,img,fonts)
    lintOnSave: true,// eslint-loader 是否在保存的时候检查
    // compiler: false,
    runtimeCompiler:true,
    transpileDependencies:[],
    productionSourceMap:true,
    chainWebpack: config => {
        if(debug){
            // 本地开发配置
        }else{
            // 生产开发配置
        }
    },
    configureWebpack: config => {
        if(debug){
            // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map';
        }else{

        }
    },
    parallel: require('os').cpus().length > 1,
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
     open: true,
     host: 'localhost',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {// 配置跨域
         '/api': {
             target:'http://localhost:5000/api/',
             ws:true,
             changOrigin:true,
             pathRewrite:{
                 '^/api':''
             }
         }
     }, 
     before: app => {}
    },
    
   }
