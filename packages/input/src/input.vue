<template>
	<div :class="[type==='textarea'?'ui-textarea':'ui-input']">

	   <template v-if="type!=='textarea'">
	   	<i class="ui-input-icon" :class="'ui-icon-'+icon" v-if="icon"></i>
		<input type="text" 
		:class="['ui-input-inner',size?'ui-input-'+size:'']" 
		:placeholder="placeholder"
		:name="name"
		:autocomplete="autocomplete"
		:value="currentValue"
		@focus="hadleFocus"
		/>
	  </template>
	  <textarea v-else
       class="ui-textarea-inner"
       :name="name"
       :placeholder="placeholder"
       :minLength="minLength"
       :maxLength="maxLength"
       :rows="rows"
       @focus="handleFocus"  
	  >
	  	
	  </textarea>
	</div>
</template>
<script>
	export default{
		name:"UiInput",
		props:{
			value:[Number,String],
			type:{
				type:String,
				default:"text"
			},
			icon:{
				type:String,
				default:""
			},
			size:{
				type:String,
				default:""
			},
			placeholder:{
				type:[Number,String],
				default:""
			},
			autocomplete:{
			   type:String,
			   default:"off"
			},
			rows:{
				type:Number,
				default:2
			},
			name:String,
			minLength:Number,
			maxLength:Number,
		},
	    data(){
	    	return{
	    		currentValue:this.value
	    	}
	    },
	    watch:{
	    	currentValue:function(val){
	    		console.log(val);
	    		this.currentValue=val;
	    	}
	    },
	    methods:{
	    	handleFocus(e){
	    		this.$emit("focus",e);
	    	}
	    }
	}
</script>