const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
// module.exports = {
//     chainWebpack:config=>{
//     config.resolve.alias // 添加别名
//     .set('@', resolve('src'))
//     .set('@assets', resolve('src/assets'))
//     .set('@components', resolve('src/components'))
//     .set('@views', resolve('src/views'))
//     .set('@store', resolve('src/store'));
// }

// }
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('assets',resolve('./src/assets'))
        .set('common',resolve('./src/common'))
        .set('network',resolve('./src/network'))
        .set('views',resolve('./src/views'))
        .set('store',resolve('./src/store'))
        // .set('views',resolve('./src/views'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    devServer: {
        port: 6543,     // 端口
    },
}