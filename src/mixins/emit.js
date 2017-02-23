function broadcast(componentName,eventName,args){
	this.$children.forEach(child=>{
		var name=child.$options.componentName;
		if(name===componentName){
			child.$emit.apply(child,[eventName].concat([args]))
		}else{
			broadcast.apply(child,[compnentName,eventName].concat([args]));
		}
	})
}
export default{
	methods:{
		broadcast(componentName,eventName,args){
			broadcast.apply(broadcast,arguments);
		},
		dispatch(componentName,eventName,args){
          var parent=this.$parent||this.$root;
          while(parent&&(!name||name!==componentName)){
          	parent=parent.$parent;
          	if(parent){
          		name=parent.$options.compnentName;
          	}
          }
          if(parent){
          	parent.$emit.apply(parent,[eventName].concat([args]));
          }
		}
	}
}