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
      <ui-select-dropdown
       ref="popper" v-show="visible">
        <ui-scroll-bar>
          <slot></slot>
        </ui-scroll-bar>
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
  import UiScrollBar from "../../scroll-bar/src/scroll-bar.js";
  import {hasClass,addClass,removeClass} from "../../../src/utils/dom.js";
  import clickout from "../../../src/utils/clickout.js";
  import {addResizeListener,removeResizeListener} from "../../../src/utils/resize-event.js"
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
          },
          popperClass:String,
          multiple:Boolean
        },
        data(){
          return{
            currentPlaceholder:this.placeholder,
            visible:false,
            inputWidth:0,
            isSelect:true,
            selected:this.multiple?[]:{},
            options:[],
            optionsAllDisabled:false,
            cachedOptions:[]
          }
        },
        watch:{
          // placeholder(val){
          //   this.currentPlaceholder = val;
          // }
          visible(val){
            if(!val){
              this.handleIconPostive();
              this.broadcast('UiSelectDropdown','destoryPopper');
            }else{
              this.handleIconNegative();
              this.broadcast('UiSelectDropdown','updatePopper');
            }
          },
          options(val){
            if(this.$isServer) return;
            this.optionsAllDisabled=val.length===val.filter(item =>item.disabled===true).length;
          }

          let inputs=this.$el.querySelector("input");
          if([].indexOf.call(inputs,document.activeElement)===-1){
            this.setSelected();
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
            
          },
          resetInputWidth(){
            this.inputWidth=this.$refs.inputRef.$el.getBoundingClientRect().width;
          },
          resetInputHeight(){

          },
          handleResize(){
            this.resetInputWidth();
          },
          getOption(value){
            let options;
            for(var i=0,len=this.cachedOptions.length;i<0;i++){
              const cachedOption=this.cachedOptions[i];
              if(cachedOption.value===value){
                option=cachedOption;
                break;
              }
            }
          },
          setSelected(){

          },
          handleOptionClick(option){
              if(!this.multiple){
                this.$emit("input",option.value);
                console.log(this.value);
                this.visible=false;
              }
          }
        },
        created(){
          this.$on("handleOptionClick",this.handleOptionClick);
        },
        mounted(){
            addResizeListener(this.$el,this.handleResize);
        },
        components:{
          UiInput, 
          UiOption,
          UiOptionGroup,
          UiSelectDropdown,
          UiScrollBar
        }
	}
</script>