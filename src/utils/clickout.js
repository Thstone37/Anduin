
import Vue from "vue";
import {on} from "./dom.js";

const nodeList = [];
const context = "@@clickoutContext";

!Vue.prototype.$isServer && on(document, "click", e =>{
     nodeList.forEach(node =>node[context].documentHandler(e)
   ) 
})

export default{
	bind(el,binding,vnode){
        const id = nodeList.push(el)-1;
        const documentHandler = function(e){
        if(!vnode.context ||
        	el.contains(e.target) ||
        	(vnode.context.popperElement &&
        	vnode.context.popperElement.contains(e.target))) return;
        if(binding.expression &&
        	el[context].methodName &&
        	vnode.context[el[context].methodName]){
        	vnode.context[el[context].methodName]()
        }else{
            el[context].bindingFn && el[context].bindingFn();
        }
     };
     el[context] = {
        id,
        documentHandler,
        methodName:binding.expression,
        bindingFn:binding.value
     }
	},
    update(el,binding){
        el[context].methodName = binding.expression;
        el[context].bindingFn = binding.value;
    },
    unbind(el){
        let len = nodeList.length;
        for(let i = 0; i < len; i++){
            if(nodeList[i][context].id === el[context].id){
                nodeList.splice(i);
                break;
            }
        }
    }
}