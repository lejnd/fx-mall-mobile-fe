const debug = process.env.NODE_ENV !== 'production'

console.log('debug:', debug)

module.exports = {
    // publicPath: '../addons/ewei_shopv2/static/vue_pay/',
    publicPath: debug ? '/' : '../addons/ewei_shopv2/static/mobile_vue/',
    filenameHashing: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/app': {
                ws: false,
                target: 'http://rrcloud.kmfx1.com', 
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            },
        }
    }
}
