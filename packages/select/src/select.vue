<template>
	<div class="ui-select">
		<ui-input 
    :placeholder="currentPlaceholder"
    icon="arrowDown"
    
    ></ui-input>
    <transition>
      <ui-select-dropdown>
        <slot></slot>
      </ui-select-dropdown>
    </transition>
	</div>
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
    import UiInput from "../../input/src/input.vue";
    import UiOption from "../../option/src/option.vue";
    import UiOptionGroup from "../../option-group/src/option-group.vue";
    import UiSelectDropdown from "../../select-dropdown/src/select-dropdown.vue";
	export default{
        name:"UiSelect",
        componentName:"UiSelect",
        mixins:[emit],
        props:{
          placeholder:{
            type:String,
            default:""
          }
        },
        data(){
          return{
            currentPlaceholder:this.placeholder
          }
        },
        watch:{
          // placeholder(val){
          //   this.currentPlaceholder = val;
          // }
        },
        computed:{
           iconClass:function(){
            
           }
        },
        components:{
          UiInput, 
          UiOption,
          UiOptionGroup,
          UiSelectDropdown
        }
	}
</script>