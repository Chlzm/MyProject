import {say,jump} from './a';
import requireB from "bundle?lazy&name=b!./b"
import requireC from "bundle?lazy&name=c!./c"


setTimeout(()=>{
	requireB(module => {
	    (module.default || module)()
	})
},1000);

 requireC(module => {
     (module.default || module)()
 })
console.log(say);