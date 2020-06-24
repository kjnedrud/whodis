const path = require('path');

module.exports = {
    entry: ['./src/js/whodis.js', './src/sass/whodis.scss'],
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/whodis.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "css/[name].css",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ]
    }
};
