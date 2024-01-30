//const webpack = require('webpack');
//const globule = require('globule');

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');


// 出力元と出力先のディレクトリを定義
const dir = {
    src: path.join(__dirname, 'src'),
    public: path.join(__dirname, ''),
};

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

//--------------------------------------------------------
//  jsまとめる、jsの圧縮(production時)
//--------------------------------------------------------
const JsConfig = {
    // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
    mode: 'development',
    //mode: 'production',

    // エントリーポイントの設定
    entry: {
        //  配列にすれば複数のファイルを起点設定可能
        main: path.resolve(dir.src, 'js/mylib/_myindex.js'), //'./src/js/_index.js',
    },
    // 出力の設定
    output: {
        // 出力するファイル名
        //publicPath: 'auto',//'/js/',
        filename: 'js/bundle.js',
        path: path.resolve(dir.public, 'assets'),
        //clean : true, //  フォルダ内全部消す
    },

    //source-map タイプのソースマップを出力
    devtool: 'source-map',
    //devtool: 'hidden-source-map',
    /*
        plugins: [
            //  webpack-bundle-analyzerで bundle しているモジュールのサイズを可視化
            //  毎回HTMLを開こうとするので普段はコメント
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: path.resolve(dir.public, './../js/report.html'),
            }),
        ],
    */
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }

};

//--------------------------------------------------------
//  SCSS　→　css、css圧縮(production時)
//  SASSのsaccではなくscss
//--------------------------------------------------------
const ScssConfig = {
    mode: 'development',
    //mode: 'production',

    // エントリーポイントの設定
    entry: {
        'style.css': path.resolve(dir.src, 'sass/style.scss'),
    },

    output: {
        path: path.resolve(dir.public, 'assets'),
    },

    //source-map タイプのソースマップを出力
    devtool: 'source-map',
    //devtool: 'hidden-source-map',
    module: {
        rules: [{
            test: /\.(sass|scss|css)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true,
                        importLoaders: 2,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            charset: false //  UTF-8 移動回避
                        }
                    },
                },
            ],
        }, ], // rule
    }, // module
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]', //  name = entryで書かれている配列要素名(style.css)
            //filename: path.resolve(dir.public, 'css/[name]'), //  name = entryで書かれている配列要素名(style.css)
        }),
        new FixStyleOnlyEntriesPlugin(),
    ],


};


module.exports = [
    //watch:true,   //  監視モード有効
    JsConfig,
    ScssConfig
];