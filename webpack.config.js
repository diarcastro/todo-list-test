const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const destFolder = 'dist';

const htmlPluginOptions = {
    template: './src/index.html',
};

module.exports = {
    entry: ['./src/main.ts', './src/styles/styles.scss'],
    // devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'styles/[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, destFolder),
    },
    plugins: [new HTMLWebpackPlugin(htmlPluginOptions)]
};
