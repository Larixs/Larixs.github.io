var path = require ("path");

module.exports = {
    entry : "" , //入口,未写
    output: {
        path: "",
        filename:"",
    },
    resolve:{
        extensions:["",".js",".jsx"]
    },
    //resolve 指定可以被 import 的文件后缀。
    //比如 Hello.jsx 就可以直接用 import Hello from 'Hello' 引用。

    module: {
        loaders: [
            {
                test:/\.js|jsx$/,
                loaders:["babel"]
            }
        ]
        //loaders 指定 babel-loader 编译后缀名为 .js 或者 .jsx 的文件
        //这样你就可以在这两种类型的文件中自由使用 JSX 和 ES6 了。
    }


};