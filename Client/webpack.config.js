const Path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	mode: /*"development"*/ "production",
	devtool: "source-map",
	node: {
		__dirname: false,
		__filename: false
	},
	entry: {
		app: Path.resolve(__dirname, "app/src/index.ts")
	},
	output: {
		path: Path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			inject: "body",
			chunks: ["app"],
			fileName: "index.html",
			title: "PSI"
		}),
		new VueLoaderPlugin()
	],
	resolve: {
		extensions: [".js", ".ts"],
		alias: {
			"src": Path.resolve(__dirname, "app/src"),
			"res": Path.resolve(__dirname, "app/res")
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: [
					"vue-style-loader",
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: "file-loader"
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader"
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					transpileOnly: true,
					preserveWhitespace: false
				}
			}
		]
	}
};
