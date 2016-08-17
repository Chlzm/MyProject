import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {say,jump} from './a';
import requireB from "./b-lazy"
import requireC from "./c-lazy";
setTimeout(()=>{
	requireB(module => {
		console.log(wx);
	    (module.default || module)()
	})
},1000);

 requireC(module => {
     (module.default || module)()
 })
console.log(say);