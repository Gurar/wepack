const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const PATHS = {
    resources: path.resolve(__dirname, 'resources'),
    public: path.resolve(__dirname, 'public'),
    assets: 'assets/',
    node: path.resolve(__dirname, 'node_modules')
}

const fontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular:  400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
    ExtraBlack: 950
}
   
const fontParam = (value) => {
    let arr = value.split("-");
    if(arr[1] === 'Italic') {
        arr[1] = "Regular";
        arr.push("Italic");
    }else {
        if(arr[1].search("Italic") != -1) {
            const newItem = arr[1].replace("Italic","");
            arr.pop();
            arr.push(newItem, "Italic");
        }else {
            arr.push("normal");
        }
    }
    return obj = {
        arr: arr
    };
}

const fontsStyle = () => {
const fileContent = fs.readFileSync(`${PATHS.resources}/scss/fonts.scss`);
    fs.writeFile(`${PATHS.resources}/scss/fonts.scss`, '', cb);
    fs.appendFile(
        `${PATHS.resources}/scss/fonts.scss`,
        '@use "1-abstracts/fontFace";\r\n', cb
    );
    return fs.readdir(`${PATHS.resources}/fonts`, (err, items) => {
        if(items) {
            let c_fontName;
            for(let i = 0; i < items.length; i++) {
                let fontName = items[i].split('.');
                fontName = fontName[0];
                if(c_fontName != fontName) {
                    font = fontParam(fontName);
                    fs.appendFile(
                        `${PATHS.resources}/scss/fonts.scss`, 
                        '@include fontFace.font("' + font.arr[0] + '", "' + fontName + '", "'+ fontWeight[font.arr[1]]  +'", "'+ font.arr[2] +'");\r\n', 
                        cb)
                }
                c_fontName = fontName;
                
            }
        }
           
    })
}

const cb = () => {};

fontsStyle();

module.exports = {
    externals: {
        path: PATHS
    },
    context: PATHS.resources,
    entry: {
        app : './js/index.js',
        style: './scss/style.scss'
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.public,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                },
            },

            {
                test: /\.(sa|sc|c)ss$/,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: "sass-loader",
                    }
                ]
            },

            {
                test: /\.(gif|png|jpe?g|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    },
                ],    
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: `${PATHS.assets}/fonts`
                    }
                  }
                ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin ({
            filename: `${PATHS.assets}css/[name].[hash].css`,   
        }),

        new HTMLWebpackPlugin({
            template: `${PATHS.resources}/index.html`
        }),

        new CleanWebpackPlugin(),

        new RemoveEmptyScriptsPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.resources}/img`,
                    to: `${PATHS.assets}img`
                },

                {
                    from: `${PATHS.resources}/static`,
                    to: ''
                },

                {
                    from: `${PATHS.node}/@fortawesome/fontawesome-free/webfonts`,
                    to: `${PATHS.assets}/fonts`
                },
            ]   
        }),
    ]

}