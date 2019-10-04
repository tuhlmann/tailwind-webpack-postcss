/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const { resolve } = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const cssnano = require("cssnano")

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = {
  mode: "production",
  context: resolve(__dirname, "src"),
  entry: { main: "./client/index.tsx" },
  output: {
    filename: "[name]-bundle-[contenthash].js",
    path: resolve(__dirname, "./target/dist/resources/public/assets"),
    publicPath: "/assets/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // Use either style-loader (inject css into html) ot extract loader below to create an actual file
          {
            loader: "style-loader"
          },
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              ident: "postcss",
              plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                // require("autoprefixer"),
                // If you comment out the purgecss section, everything works fine.
                require("@fullhuman/postcss-purgecss")({
                  content: ["./src/client/**/*.tsx"],
                  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
                })
                // cssnano()
              ]
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
    // new MiniCssExtractPlugin({
    //   filename: "[name]-[contenthash].css",
    //   chunkFilename: "[id]-[contenthash].css", //- put all css in one file
    //   ignoreOrder: false // Enable to remove warnings about conflicting order
    // }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "resources"),
        to: resolve(__dirname, "target/dist/resources"),
        ignore: ["index.html"]
      }
    ]),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, "target/dist/resources/public/index.html"),
      template: resolve(__dirname, "resources/public/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}
