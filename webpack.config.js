const path = require("path");
const fs = require("fs");

module.exports = {
  target: "node",
  entry: fs
    .readdirSync(path.join(__dirname, "./lambdas"))
    .filter(filename => /\.js$/.test(filename))
    .map(filename => {
      var entry = {};
      entry[filename.replace(".js", "")] = path.join(
        __dirname,
        "./lambdas/",
        filename
      );
      return entry;
    })
    .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),
  output: {
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          env: {
            production: {
              presets: ["minify"]
            }
          }
        }
      }
    ]
  }
};
