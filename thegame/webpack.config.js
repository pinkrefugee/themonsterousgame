const path = require('path');


module.exports = {
    devtool: 'source-map',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use:[
                    {
                        loader: 'babel-loader', 
                        options: { presets: ["@babel/preset-env"]  }
                    }
                ]
            }
        ]
    }

}