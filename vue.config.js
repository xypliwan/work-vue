const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('_a', resolve('src/assets'))
            .set('_c', resolve('src/components'))
            .set('_u', resolve('src/utils'))
            .set('_v', resolve('src/views'))
    },
    outputDir: process.env.outputDir
}