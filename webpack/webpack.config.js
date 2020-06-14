"use strict";

const path = require("path");
const root = path.join(__dirname, "..");
const merge = require("webpack-merge");

module.exports = env => {
  let config = {
    resolve: {
      extensions: [".vue", ".ts", ".js"],
      alias: {
        "@": path.join(root, "src"),
        vue: "vue/dist/vue.js"
      }
    },

    entry: {
      main: path.join(root, "src", "main")
    },

    output: {
      filename: "bundle.js",
      path: path.join(root, "dist")
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: "vue-loader"
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ["vue-style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }
      ]
    }
  };

  // Builds
  const build = env && env.production ? "prod" : "dev";
  config = merge.smart(
    config,
    require(path.join(root, "webpack", "builds", `webpack.config.${build}`))
  );

  // Addons
  const defaultAddons = ["vueloader", "minicssextract"];
  const addons = getAddons(env);
  [...defaultAddons, ...addons].forEach(addon => {
    config = merge.smart(
      config,
      require(path.join(root, "webpack", "addons", `webpack.${addon}`))
    );
  });

  console.log(`Build mode: \x1b[33m${config.mode}\x1b[0m`);

  return config;
};

function getAddons(env) {
  if (!env || !env.addons) return [];
  if (typeof env.addons === "string") return [env.addons];
  return env.addons;
}
