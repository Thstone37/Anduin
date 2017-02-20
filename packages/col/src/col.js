export default{
	name:"UiCol",
	props:{
     col:{
     	type:Number,
     	default:24
     },
     offset:Number,
     pull:Number,
     push:Number,
     xs:[Number,Object],
     sm:[Number,Object],
     md:[Number,Object],
     lg:[Number,Object]
	},
	computed:{
		gutter(){
			return this.$parent.gutter;
		},
		style(){
			var ret={}
			if(this.gutter){
               ret.paddingLeft=this.gutter/2+"px";
               ret.paddingRight=ret.paddingLeft;
			}
			return ret;
		}
	},
	render(h){
		let classArray=[];

		["span","offset","pull","push"].forEach(prop =>{
          if(this[prop]){
          	classArray.push(
               prop=="span"?`ui-col-${this[prop]}`:`ui-col-${prop}-${this[prop]}`
      		);
          }
		});
		["xs","sm","md","lg"].forEach(sizeProp =>{
           if(typeof this[sizeProp]=="number"){
           	classArray.push(`ui-col-${sizeProp}-${this[sizeProp]}`);
           }else if(typeof this[sizeProp]=="object"){
             let props=this[sizeProp];
             Object.keys(props).forEach(prop =>{
             	if(["span","offset","pull","push"].indexOf(prop)){
		     	    classArray.push(
		              prop=="span"?`ui-col-${sizeProp}-${props[prop]}`:`ui-col-${sizeProp}-${props[prop]}`
		         	)
             	}else{
             	  console.warn("not support ${prop} property")
             	}
             })
           }
		})
		return(<div style={style}>{this.$slots.default}</div>);
	}
}