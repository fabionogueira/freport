module.exports = {
    entry:{
        "index": './src/index.ts'
    },
    resolve: {
        extensions: ['.ts']
    },
    output:{
        "library":"freport",
        "libraryTarget":"umd",
        "path": __dirname+'/dist',
        "filename": "[name].js" //name=index, cria ./dist/index.js
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    "devtool": 'inline-source-map'
}
