const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Published Modules
const LIB_SRC = path.join(__dirname, '/src/lib/');
const LIB_MODULES = {
  "cisco-sans": path.join(LIB_SRC, "cisco-sans"),
  "coi-apis-dictionary": path.join(LIB_SRC, "coi-apis/DictionaryAPIS"),
  "coi-content": path.join(LIB_SRC, "coi-content"),
  "coi-dict-name": path.join(LIB_SRC, "coi-dictionary/metadata/dict-name"),
  "coi-dict-country-address": path.join(LIB_SRC, "coi-dictionary/CountryAddress"),
  "coi-dict-input-validation": path.join(LIB_SRC, "coi-dictionary/InputValidation"),
  "coi-dict-validation-helper": path.join(LIB_SRC, "coi-dictionary/util/validation-helper"),
  "coi-dict-validation-type": path.join(LIB_SRC, "coi-dictionary/metadata/validation-type"),
  "coi-locale": path.join(LIB_SRC, "coi-locale"),
  "coi-locale-list": path.join(LIB_SRC, "coi-locale/locale-info-list"),
  "coi-locale-name": path.join(LIB_SRC, "coi-locale/locale-name"),
  "coi-navstate": path.join(LIB_SRC, "coi-navstate"),
  "coi-path-config": path.join(LIB_SRC, "coi-path/path-config"),
  "coi-path-api": path.join(LIB_SRC, "coi-path/api"),
  "coi-path-browser": path.join(LIB_SRC, "coi-path/browser"),
  "coi-path-router": path.join(LIB_SRC, "coi-path/router"),
  "coi-redirect": path.join(LIB_SRC, "coi-redirect"),
  "coi-sass-override": path.join(LIB_SRC, "coi-sass/override"),
  "coi-sass-styling": path.join(LIB_SRC, "coi-sass/styling"),
  "coi-sass-util": path.join(LIB_SRC, "coi-sass/util"),
  "coi-scope": path.join(LIB_SRC, "coi-scope"),
  "coi-util-array": path.join(LIB_SRC, "coi-util/array"),
  "coi-util-cookie": path.join(LIB_SRC, "coi-util/cookie"),
  "coi-util-keycloak": path.join(LIB_SRC, "coi-util/keycloak"),
  "coi-util-network": path.join(LIB_SRC, "coi-util/network"),
  "coi-util-object": path.join(LIB_SRC, "coi-util/object"),
  "coi-util-path": path.join(LIB_SRC, "coi-util/path")
};

// Config Parameters
let mode = 'development';
let minimize = false;
let devtool = 'cheap-module-source-map';
let devServer = {
  contentBase: path.resolve(__dirname, 'dist/'),
  compress: true,
  port: 9000
};
let entry = {main: './src/doc/index.js'};
let output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist/')
};
let plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    filename: 'index.html',
    template: './src/doc/index.html'
  })
];

module.exports = (env) => {
  const isProduction = (env && env.production) || false;
  const isDevelopment = !isProduction;

  if (isProduction) {
    mode = 'production';
    minimize = true;
    devtool = '';
    devServer = {};
    entry = LIB_MODULES;
    output = {
      path: path.join(__dirname, './core'),
      library: ['[name]'],
      libraryTarget: 'umd',
      umdNamedDefine: true
    };
    plugins = [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css'
      })
    ];
  }

  return {
    mode: mode,
    devtool: devtool,
    devServer: devServer,
    entry: entry,
    output: output,
    plugins: plugins,
    optimization: {
      minimize: minimize
    },
    resolve: {
      extensions: ['*', '.css', '.scss', '.sass', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        DOC: path.resolve(__dirname, 'src/doc'),
        LIB: path.resolve(__dirname, 'src/lib')
      }
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          parser: {
            requireEnsure: false
          }
        },

        // Run linter before Babel transpiling
        {
          test: /\.(js|jsx|mjs|ts|tsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: require.resolve('eslint-loader'),
              options: {
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint')
              }
            },
          ]
        },

        // 'oneOf' import only the loader that matches
        {
          oneOf: [
            // assets loader
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              exclude: /node_modules/,
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'asset/[name].[hash:8].[ext]',
              },
            },

            // font, file loader
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              exclude: /node_modules/,
              use: {
                loader: require.resolve('file-loader'),
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
                }
              }
            },

            // scss, sass, style loader
            {
              test: /\.(scss|sass|css)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: require.resolve('css-loader')
                },
                {
                  loader: require.resolve('sass-loader')
                },

                // IMPORTANT: sass-resources-loader will inject util into any sass file that needs it
                {
                  loader: require.resolve('sass-resources-loader'),
                  options: {
                    resources: require(path.join(process.cwd(), 'src/lib/coi-sass/util.js'))
                  }
                }
              ]
            },

            // js, jsx, ts loader
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              exclude: /node_modules/,
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                compact: false,
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                )
              },
            }
          ]
        }
      ]
    }
  };
}
