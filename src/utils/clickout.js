
import Vue from "vue";
import {on} from "./dom.js";

const nodeList = [];
const context = "@@clickout"

!Vue.prototype.$isServer && on(document, "click", e =>{
     nodeList.forEach(node =>node[context].documentHandler(e)
   ) 
})

export default{
	bind(el,binding,vnode){
        if(!vnode.context ||
        	el.contains(e.target) ||
        	(vnode.context.popperElement &&
        	vnode.context.popperElement.contains(e.target))) return;
        if(binding.expression &&
        	el[context].methodName &&
        	vnode.context[el[context].methodName]){
        	vnode.context[el[context].methodName]()
        }
	}
}