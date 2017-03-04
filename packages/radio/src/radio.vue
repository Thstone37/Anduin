<template>
	<label class="ui-radio">
		<span :class="['ui-radio-container',{
         'is-checked':model===label
		}]">
		    <span class="ui-radio-show"></span>
			<input type="radio" 
			class="ui-radio-real" 
			v-model="model"
            :name="name"
            :value="label"
			>
		</span>
		<span class="ui-radio-label">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
	export default{
		name :"UiRadio",

		componentName:"UiRadio",

		mixins:[emit],
		props:{
             value:{},
             label:{},
             name:String
		},
		computed:{
			isGroup(){
				let parent=this.$parent;
				while(parent){
					if(parent.$options.componentName!="UiRadioGroup"){
						parent=parent.$parent;
					}else{
						this._radioGroup=parent;
						return true;
					}
				}
				return false;
			},
			model:{
               get(){
               	 return this.isGroup?this._radioGroup.value:this.value;
               },
               set(val){
               	  if(this.isGroup){
                     this.dispatch("UiRadioGroup","input",[val]); 
               	  }else{
                     this.$emit("input",val);
               	  }
               }
			}
		}
	}
</script>