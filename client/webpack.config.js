const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest'); 
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.


// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    //entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //output point for files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //webpack plugin that generates our html file and injects our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      //allows the application to be installable
      // Creates a manifest.json file.
      

      new WebpackPwaManifest({
        // provide settings for installing the app
        publicPath: './' ,
        name: 'Just another text editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false,
        inject: true,
        start_url: './',
        public_url: './',
        icons: [
          {
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('./assets', 'icons').replace("auto", ""),
          },
       ],
      }),
    ],


     //when you compress the files it needs to read the CSS
    //the CSS loader will loader will grab the css file after it was compressed
    //it needs css-loader npm package to to read css after it was compressed

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            //babel-loader essentially translates ES6 to ES5 so the old browsers can use it
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
