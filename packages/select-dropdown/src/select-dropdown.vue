<template>
	<div class="ui-select-dropdown">
		<slot></slot>
	</div>
</template>
<script>
   import Popper from "../../../src/utils/vue-popper";
	export default{
		name :"UiSelectDropdown",
		componentName:"UiSelectDropdown",
		mixins:[Popper],
		props:{
			placement:{
				default:"bottom-start"
			},
			popperOptions:{
				default(){
					return{
						forceAbsolute:true,
						gpuAcceleration:false,
					}
				}
			}
		},
		computed:{
           popperClass(){
           	return this.$parent.popperClass;
           }
		},
		mounted(){
			console.log(this.$parent.$el);
			this.referenceElm=this.$parent.$refs.inputRef.$el;
			this.$parent.popperElem=this.popperElm=this.$el;
			this.$on("updatePopper",this.updatePopper);
			this.$on("destoryPopper",this.destoryPopper);
		}
	}
</script>