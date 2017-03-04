<template>
	<label class="ui-checkbox">
		<span :class="['ui-checkbox-container',{
         'is-checked':isChecked
		}]">
		    <span class="ui-checkbox-show"></span>
			<input type="checkbox" 
			class="ui-checkbox-real" 
            :name="name"
            :value="label"
            v-model="model"
			>
		</span>
		<span class="ui-checkbox-label">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<script>
	export default{
		name:"UiCheckbox",

		componentName:"UiCheckbox",

		props:{
			value:{},
			label:{},
			name:String
		},

		data(){
			return{
				model:false
			}
		},
		computed:{
			isGroup(){
			  let parent=this.$parent;
			  // while(parent){
			  // 	if(parent.$options.componentName!="UiCheckBoxGroup")
			  // }
			},
			isChecked(){
              return this.model;
			}
			// model:{
			// 	get(){
   //                 return this.value;
			// 	},
			// 	set(val){
			// 		this.$emit("input",val)
			// 	}
			// }
		}
	}
</script>