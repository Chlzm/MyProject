import a from './a';
setTimeout(function(){
    let load = require("bundle?lazy&name=chunk!./b.js");
    load(function(file) {
        debugger;
    });
},0);

