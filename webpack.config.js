const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index_bundle.js",
        path: path.resolve(__dirname, "./build")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        })
    ],
    devServer: {
        open: true,
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080"
        },
        hot: true
    }
}