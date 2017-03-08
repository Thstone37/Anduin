<template>
	<div :class="[type==='textarea'?'ui-textarea':'ui-input']">

	   <template v-if="type!=='textarea'">
	   	<i class="ui-input-icon" :class="'ui-icon-'+icon" v-if="icon"></i>
		<input type="text" 
		:class="['ui-input-inner',size?'ui-input-'+size:'']" 
		:placeholder="placeholder"
		:name="name"
		:autocomplete="autocomplete"
		/>
	  </template>
	  <textarea v-else
       class="ui-textarea-inner"
       :name="name"
       :placeholder="placeholder"
       :minLength="minLength"
       :maxLength="maxLength"  
	  >
	  	
	  </textarea>
	</div>
</template>
<script>
	export default{
		name:"UiInput",
		props:{
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
			name:String,
			minLength:Number,
			maxLength:Number,
		}
	}
</script>