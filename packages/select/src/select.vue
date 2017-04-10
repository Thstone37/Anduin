<template>
	<div class="ui-select" v-clickout="handleClose">
		<ui-input 
    ref="inputRef"
    :placeholder="currentPlaceholder"
    :icon="iconClass"
    @click="handleIconClick"
    @focus="handleFocus"
    @mousedown.native="handleMouseDown"
    ></ui-input>
    <transition name="ui-zoom-in-down">
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
  import {hasClass,addClass,removeClass} from "../../../src/utils/dom.js";
  import clickout from "../../../src/utils/clickout.js"
	export default{
        name:"UiSelect",
        componentName:"UiSelect",
        mixins:[emit],
        directives:{clickout},
        props:{
          value:{},
          placeholder:{
            type:String,
            default:""
          }
        },
        data(){
          return{
            currentPlaceholder:this.placeholder,
            visible:false
          }
        },
        watch:{
          // placeholder(val){
          //   this.currentPlaceholder = val;
          // }
          visible(val){
            if(!val){
              this.handleIconPostive();
            }else{
              this.handleIconNegative();
            }
          }
        },
        computed:{
           iconClass:function(){
            return "arrowUp"
           }
        },
        methods:{
          handleIconClick:function(){
             this.visible=!this.visible;
          },
          handleIconPostive:function(){
             let icon = this.$el.querySelector(".ui-input-icon");
             if(icon){
              removeClass(icon,"is-reverse")
             } 
          },
          handleIconNegative:function(){
             let icon = this.$el.querySelector(".ui-input-icon");
             if(icon){
                addClass(icon,"is-reverse")
             }
          },
          handleOpen(){
            this.visible = true;
          },
          handleClose(){
            this.visible = false;
          },
          handleFocus(){
            this.visible=true;
          },
          handleMouseDown(e){
            if(e.target.tagName !== "INPUT") return;
              this.visible = !this.visible;
              e.preventDefault();
            
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