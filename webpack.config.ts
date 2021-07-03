import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface Config extends webpack.Configuration {
  devServer: DevServerConfiguration;
}

const config: Config = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 3000,
  },
  plugins: [new HtmlWebpackPlugin({ template: "public/index.html" })],
};

export default config;
