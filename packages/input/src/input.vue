<template>
	<div :class="[type==='textarea'?'ui-textarea':'ui-input',
     {
       'ui-input-group':$slots.pre||$slots.post,
       'ui-input-group-pre':$slots.pre,
       'ui-input-group-post':$slots.post,
       'ui-input-disabled':disabled
     }
   
	]">

	   <template v-if="type!=='textarea'">
	    <span class="ui-input-pre" v-if="$slots.pre">
	    	<slot name="pre"></slot>
	    </span>
	   	<i class="ui-input-icon" :class="['ui-icon-'+icon]" v-if="icon" @click="handleIconClick"></i>
		<input type="text" 
		:class="['ui-input-inner',size?'ui-input-'+size:'']" 
		:placeholder="placeholder"
		:name="name"
		:autocomplete="autocomplete"
		:value="currentValue"
		@focus="handleFocus"
		/>
	    <span class="ui-input-post" v-if="$slots.post">
	    	<slot name="post"></slot>
	    </span>
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
			disabled:Boolean,
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
	    		this.currentValue=val;
	    	},
	    	value:function(val,oldVal){
                this.setCurrentValue(val);
	    	}
	    },
	    methods:{
	    	handleFocus(e){
	    		this.$emit("focus",e);
	    	},
	    	handleIconClick(e){
	    		this.$emit("click",e)
	    	},
	    	setCurrentValue(value){
	    		this.currentValue=value;
	    	}
	    }
	}
</script>