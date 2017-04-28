<template>
	<div class="ui-select-dropdown" :style="{minWidth:minWidth}">
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
		data(){
			return{
				minWidth:''
			}
		},
		computed:{
           popperClass(){
           	return this.$parent.popperClass;
           }
		},
		watch:{
			'$parent.inputWidth'(){
				this.minWidth=this.$parent.$el.getBoundingClientRect().width+"px";
			}
		},
		mounted(){
			this.referenceElm=this.$parent.$refs.inputRef.$el;
			this.$parent.popperElem=this.popperElm=this.$el;
			this.$on("updatePopper",this.updatePopper);
			this.$on("destoryPopper",this.destoryPopper);
		}
	}
</script>