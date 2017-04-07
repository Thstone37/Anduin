
import Vue from "Vue";
const isServer=Vue.prototype.$isServer;


/*function to test a DOM element whether has a special Class*/
export  function hasClass(el,cls){
  if(!el||!cls) return false;
  if(cls.indexOf(" ") !== -1) throw new Error("className should not contain a space");

  if(el.classList){
  	return el.classList.contains(cls);
  }else{
      return el.className.indexOf(cls)>-1
  }
}
/*function to add classes to a DOM element*/
export  function addClass(el,cls){
   if(!el) return;
   var curClass = el.className;
   var classes = (cls||" ").split(" ");

   for(var i = 0,len = addClass.length;i < len;i++){
   	var className = classes[i];
   	if(!className) continue;
     if(el.classList){
     	el.classList.add(className)
     }else{
     	if(!hasClass(el,className)){
     		curClass += " " + className
     	}
     }
   }
   if(!el.classList){
   	 el.className = curClass;
   }
}
/*function to remove classes from a DOM element*/
export function removeClass(el,cls){
   if(!el||!cls) return;
   var curClass = " "+el.className+" ";
   var classes = (cls||" ").split(" ");
   for(var i = 0,len = classes.length;i < len;i++){
   	var className = classes[i];
   	if(!className) continue;

   	if(el.classList){
       el.classList.remove(className);
   	}else{
      if(hasClass(el,className)){
         curClass = curClass.replace(" "+className+" "," ")
      }
   	}
   }
}

/*bind event function*/

export const on=(function(){
    if(!isServer&&document.addEvenListener){
    	return function(element,event,handler){
    		if(element && event && handler){
    			element.addEvenListener(event,handler,false);
    		}
    	}
    }else{
    	return function(element,event,handler){
    		if(element && event && handler){
    			element.attachEvent('on' +event,handler);
    		}
    	}
    }
})()

export const off=(function(){
  if(!isServer && document.removeEventListener){
     return function(element,event,handler){
        if(element && event){
        	element.removeEventListener(event,handler,false);
        }
     }
  }else{
      return function(element,event,handler){
      	if(element&&event){
      		element.detachEvent('on' + event,handler);
      	}
      }
  }
})()
