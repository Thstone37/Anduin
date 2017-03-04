<template>
	<label class="ui-checkbox">
		<span :class="['ui-checkbox-container',{
         'is-checked':true
		}]">
		    <span class="ui-checkbox-show"></span>
			<input type="checkbox" 
			class="ui-checkbox-real" 
            :name="name"
            :value="label"
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
		computed:{
			isGroup(){
			  let parent=this.$parent;
			  // while(parent){
			  // 	if(parent.$options.componentName!="UiCheckBoxGroup")
			  // }
			},
			model:{
				get(){
                   return this.value;
				},
				set(val){
					this.$emit("input",val)
				}
			}
		}
	}
</script>