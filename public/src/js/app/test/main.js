import {say,jump} from './a';
setTimeout(()=>{
    var load = require("bundle?lazy&name=my-chunk!./b.js");
    // The chunk is not requested until you call the load function 
    load((file)=>{
        file();
    });

},2000);
console.log(say);