// const
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

// vendor
const VENDOR_LIBS = ["react", "react-dom", "react-router-dom", "axios"];

//devServer
const devServer = {
  port: 8000,
  open: false,
  stats: "minimal",
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  inline: true,
  compress: true,
  contentBase: "/",
  // https: true,
};

//
const is_prod = process.env.ENVIRONMENT === "production";
//   const is_prod = true;

// Config
const config = {
  // entry
  entry: {
    app: "./src/index.tsx",
    vendor: VENDOR_LIBS,
    // async: 'babel-polyfill'
  },
  //output
  output: {
    filename: "static/js/[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  //devtool
  devtool: "source-map",
  // module
  module: {
    rules: [
      //
      // {
      //     use: ['babel-loader' /*, 'eslint-loader'*/],
      //     test: /\.(js|jsx)$/,
      //     exclude: /node_modules/,
      // },

      {
        test: /\.tsx?$/,
        use: [
          // 'ts-loader',
          "babel-loader",
        ],
        exclude: /node_modules/,
      },

      //
      // {
      //     use: [
      //         is_prod ? MiniCssExtractPlugin.loader : "style-loader",
      //         {
      //             loader: "css-loader",
      //             options: {
      //                 sourceMap: true,
      //             },
      //         },
      //         {
      //             loader: "postcss-loader",
      //             options: {
      //                 sourceMap: true,
      //             },
      //         },

      //         {
      //             loader: "less-loader",
      //             options: {
      //                 sourceMap: true,
      //             },
      //         },
      //     ],
      //     test: /\.(c|le)ss$/,
      // },
      {
        use: [
          is_prod ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        test: /\.(sa|sc)ss$/,
      },

      //
      {
        loader: "file-loader",
        test: /\.(png|svg|jpe?g|gif|woff2?|eot|ttf|wav|mp3|mp4|ico)$/,
        options: {
          outputPath: "static/images_icons",
        },
      },
    ],
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      _: path.resolve(__dirname, "./src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },

  // plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[contenthash].min.css",
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html",
      // favicon: 'image/favicon.svg',
    }),

    new CleanWebpackPlugin(),

    new Dotenv({
      path: ".env",
    }),
  ],

  // performance
  performance: {
    hints: false,
  },
  // optimization
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // devServer
  devServer,
  // mode
  mode: is_prod ? "production" : "development",
  //
  // target: 'node',
};

module.exports = config;
