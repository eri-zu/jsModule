const { Command } = require("commander");
const program = new Command();
program.option("--mode <type>", "mode");
program.option("--watch", "watch");
// program.parse();

program.parse(process.argv);

const options = program.opts();

const MODE = options.watch ? "development" : options.mode;
const PATH = require("./_setting/config.js");
const path = require("path");
const enabledSourceMap = MODE == "development";
const webpack = require("webpack");

const babeloptions =
  MODE == "development"
    ? {
        presets: [["@babel/preset-env", { modules: false }]],
        plugins: ["@babel/plugin-transform-async-to-generator"],
      }
    : {
        presets: [
          ["minify", { builtIns: false, evaluate: false, mangle: false }],
        ],
        plugins: [
          "transform-remove-console",
          "@babel/plugin-transform-async-to-generator",
        ],
      };

console.log(babeloptions);
module.exports = {
  mode: MODE,
  entry: {
    main: ["@babel/polyfill", PATH.src.js + "/src/Main.es6"],
  },
  devtool: enabledSourceMap ? "inline-source-map" : false,
  output: {
    path: path.resolve(PATH.dist.js),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        use: [
          {
            loader: "babel-loader",
            options: babeloptions,
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert|vs|fs)$/,
        exclude: /node_modules/,
        loader: "glslify-import-loader",
      },
      { test: /\.(glsl|frag|vert|vs|fs)$/, loader: "raw-loader" },
      { test: /\.(glsl|frag|vert|vs|fs)$/, loader: "glslify-loader" },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery-with-plugins",
      Stats: "stats-js",
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "./"),
      path.resolve(PATH.src.js + "src/"),
      path.join(path.resolve(""), "node_modules"),
      path.join(path.resolve(""), "./node_modules"),
    ],
    alias: {
      "@": path.resolve(__dirname, "src/js/"),
      "@UI": path.resolve(__dirname, "src/js/UI/"),
    },
    extensions: [".js", ".json", ".wasm", ".es6"],
  },
};
