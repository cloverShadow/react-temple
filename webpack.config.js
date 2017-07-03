var webpack = require('webpack');
var path = require('path');
module.exports = {
    devtool: 'eval-source-map',
    entry: ['webpack/hot/dev-server', path.join(__dirname, "./source/app.jsx")],
    output: {
        path: path.join(__dirname, './build/static/manageName/plugin'),
        filename: 'application.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './build',//默认webpack-dev-server会为根文件夹提供基于express的本地服务器，这个属性指定只为build目录下提供本地服务器
        historyApiFallback: true,//开发SPA时很有用，为true的时候默认跳转到ip端口下的index页面
        inline: true,//设置为true的时候，源文件发生改变的时候，会自动刷新页面
        port: 3030//webpack-dev-server的监听端口，默认为8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热模块替换插件
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        require('autoprefixer')
                    ];
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ],
    resolve: {
        extensions: ['.web.js', '.js', '.json', '.jsx']
    },
    module: {
        //loaders加载器
        loaders: [
            {
                test: /\.(js|jsx|es6)$/,//匹配文件扩展名为.js/.jsx/.es6的文件
                exclude: /node_modules/,//屏蔽不需要处理的文件夹，（参数可选）
                loader: 'babel-loader'//loader的名称
            },
            {
                test: /\.(png|jpg)$/,//匹配文件扩展名为.png/.jpg的文件
                loader: 'url-loader?limit=4000&name=images/[name].[ext]'
            },
            {
                test: /\.(css|sass|scss)$/,
                loader: 'style-loader!css-loader?localIdentName=css/[name]__[local]!sass-loader?sourceMap=true'
            },
            {
                test: /\.(less)$/,
                loader: 'style-loader!css-loader!localIdentName=css/[name]__[local]!less-loader!postcss-loader?sourceMap=true'
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            }
        ]
    }
};