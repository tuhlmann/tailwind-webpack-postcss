/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const cssnano = require("cssnano")

module.exports = {
  mode: "development",
  context: resolve(__dirname, "src"),
  entry: [
    "webpack-dev-server/client?http://localhost:4000",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "./client/index.tsx"
    // the entry point of our app
  ],
  output: {
    filename: "bundle-main.js",
    // the output bundle
    path: resolve(__dirname, "./target/dist"),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: "/"
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@common": resolve(__dirname, "./src/common"),
      "@client": resolve(__dirname, "./src/client"),
      "@srv": resolve(__dirname, "./src/server/app"),
      "@migration": resolve(__dirname, "./src/server/migration")
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    host: "localhost",
    port: "4000",
    hot: true,
    noInfo: true,
    quiet: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    contentBase: resolve(__dirname, "./resources/public"),
    watchContentBase: true,
    // match the output `publicPath`
    publicPath: "/",
    historyApiFallback: true,
    stats: {
      colors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/auth/google": {
        target: "http://localhost:3030"
      },
      "/api/*": {
        target: "http://localhost:3030"
      },
      "/anon/*": {
        target: "http://localhost:3030"
      }
    }
  },
  module: {
    rules: [
      // This config does not support HMR
      // {
      //   test: /\.(ts|tsx)?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "ts-loader",
      //       options: {
      //         configFile: "tsconfig.webpack.json"
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules(\/|\\)(?!(@feathersjs|debug))/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules(\/|\\)(?!(@feathersjs|debug))/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-modules-typescript-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              ident: "postcss",
              plugins: [require("postcss-import"), require("tailwindcss"), require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ]
      },
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream"
            }
          }
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // inject <script> in html file.
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./resources/public/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      // tslint: resolve(__dirname, 'tslint.json'),
      tsconfig: resolve(__dirname, "tsconfig.json")
    })
    // new CopyWebpackPlugin([{ from: '../public', to: 'target/dist/public' }])
  ]
}
