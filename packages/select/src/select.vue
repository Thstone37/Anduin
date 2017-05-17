<template>
	<div class="ui-select" v-clickout="handleClose"
   :class="{'ui-select-disabled':disabled}"
  >

   <div class="ui-select-tags" v-if="multiple" ref="tags"
   :style="{'max-width':inputWidth-36+'px'}" @click.stop="toggleDropDown"
   >
     <transition-group tag="div" 
       class="ui-select-tags-inner"
       @after-leave="resetInputHeight"
       >
       <ui-tag v-for="item in selected" 
       :key="item.value" 
       :value="item" @close="deleteTag($event,item)"> 
       </ui-tag>
     </transition-group>
     <input class="ui-select-input"
      ref="selectInput" 
      v-if="query||remote||allowCreate"
      @keyup="handlePlaceholder"
     />
   </div>
		<ui-input 
    ref="inputRef"
    :placeholder="currentPlaceholder"
    :icon="iconClass"
    :size="size"
    :disabled="disabled"
    v-model="selectedLabel"
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
        <p v-if="emptyText">{{emptyText}}</p>
      </ui-select-dropdown>
    </transition>
	</div>
</template>
<script>
  import emit from "../../../src/mixins/emit.js";
  import locale from "../../../src/mixins/locale.js";
  import UiInput from "../../input/src/input.vue";
  import UiOption from "../../option/src/option.vue";
  import UiOptionGroup from "../../option-group/src/option-group.vue";
  import UiSelectDropdown from "../../select-dropdown/src/select-dropdown.vue";
  import UiTag from "../../tag/src/tag.vue";
  import UiScrollBar from "../../scroll-bar/src/scroll-bar.js";
  import {hasClass,addClass,removeClass} from "../../../src/utils/dom.js";
  import clickout from "../../../src/utils/clickout.js";
  import {addResizeListener,removeResizeListener} from "../../../src/utils/resize-event.js";
  const sizeMap={
    "large":42,
    "small":30,
    "mini":22
  }
	export default{
        name:"UiSelect",
        componentName:"UiSelect",

        mixins:[emit,locale],
        directives:{clickout},

        props:{
          value:{},
          disabled:Boolean,
          placeholder:{
            type:String,
            default:""
          },
          popperClass:String,
          multiple:Boolean,
          remote:Boolean,
          query:Boolean,
          allowCreate:Boolean,
          size:String,
          multipleLimit:{
            type:Number,
            default:0
          },
          loading:Boolean,
          loadingText:String
        },
        data(){
          return{
            currentPlaceholder:this.placeholder,
            cachedPlaceholder:"",
            visible:false,
            inputWidth:0,
            isSelect:true,
            selected:this.multiple?[]:{},
            options:[],
            optionsAllDisabled:false,
            cachedOptions:[],
            createdLabel:null,
            createdSelected:false,
            selectedLabel:''
          }
        },
        watch:{
          // placeholder(val){
          //   this.currentPlaceholder = val;
          // }
          value(val){
            if(this.multiple){
              this.resetInputHeight();
              if(val.length>0){
                this.currentPlaceholder="";
              }else{
                this.currentPlaceholder=this.cachedPlaceholder;
              }
            }
            this.setSelected();
            this.$emit("change",val);
          },
          visible(val){
            if(!val){
              this.handleIconPostive();
              this.broadcast('UiSelectDropdown','destoryPopper');
              if(!this.multiple){
                if(this.selected){

                }
              }
            }else{
              this.handleIconNegative();
              this.broadcast('UiSelectDropdown','updatePopper');
            }
          },
          options(val){
            if(this.$isServer) return;
            this.optionsAllDisabled=val.length===val.filter(item =>item.disabled===true).length;
            let inputs=this.$el.querySelector("input");
            if([].indexOf.call(inputs,document.activeElement)===-1){
              this.setSelected();
            }
          }
        },
        computed:{
           iconClass:function(){
            return "arrowUp"
           },
           emptyText:function(){
            if(this.loading){
               return this.loadingText||this.t("select.loading");
             }
           }
        },
        methods:{
          handleIconClick:function(){
             this.toggleDropDown();
          },
          toggleDropDown(){
            if(!this.disabled){
                this.visible=!this.visible;
            }
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
            this.toggleDropDown();
          },
          handleClose(){
            this.toggleDropDown();
          },
          handleFocus(){
            this.toggleDropDown();
          },
          handleMouseDown(e){
            if(e.target.tagName !== "INPUT") return;
              this.toggleDropDown();
              e.preventDefault();            
          },
          handlePlaceholder(e){
             if(this.placeholder!==""){
                 this.currentPlaceholder=this.$refs.selectInput.value?"":this.placeholder;
             }
          },
          resetInputWidth(){
            this.inputWidth=this.$refs.inputRef.$el.getBoundingClientRect().width;
          },
          resetInputHeight(){
             this.$nextTick(() =>{
               let inputChildNodes=this.$refs.inputRef.$el.childNodes;
               let input=[].filter.call(inputChildNodes,item =>item.tagName=="INPUT")[0];
               input.style.height=Math.max(this.$refs.tags.clientHeight+6,sizeMap[this.size]||36)+"px";
               if(this.visible){
                this.broadcast("UiSelectDropdown", "updatePopper");
               }
             })
          },
          handleResize(){
            this.resetInputWidth();
          },
          getOption(value){
            let option;
            for(var i=0,len=this.cachedOptions.length;i<len;i++){
              const cachedOption=this.cachedOptions[i];
              if(cachedOption.value===value){
                option=cachedOption;
                break;
              }
            }
            if(option) return option;
            const label=typeof value==="string"||typeof value==="number"?value:"";
            var newOption={
              value:value,
              label:label
            }
            return newOption;
          },
          setSelected(){
            if(!this.multiple){
              let option=this.getOption(this.value);
              if(option.created){
                 this.createdLabel=option.label;
                 this.createdSelected=true;
              }else{
                  this.createdSelected=false;
              }
              this.selected=option;
              this.selectedLabel=option.label;
              return;
            }
            let result=[];
            if(Array.isArray(this.value)){
              this.value.forEach(value =>{
                result.push(this.getOption(value));
              });
            }
            this.selected=result;
          },
          handleOptionClick(option){
              if(!this.multiple){
                this.$emit("input",option.value);        
                this.visible=false;
              }else{
                let optionIndex=-1;
                this.value.forEach((item,index) =>{
                  if(item==option.value){
                    optionIndex=index;
                  }
                });
                if(optionIndex>-1){
                  this.value.splice(optionIndex,1);
                }else if(this.multipleLimit<=0||this.value.length<this.multipleLimit){
                  this.value.push(option.value);
                }
              }
          },
          deleteTag(event,tag){
             let index=this.selected.indexOf(tag);
             if(!this.disabled&&index>-1){
              this.value.splice(index,1)
             }
             event.stopPropagation();
          }
        },
        created(){
          this.cachedPlaceholder=this.currentPlaceholder=this.placeholder;
          if(!this.multiple&&!Array.isArray(this.value)){
            this.$emit("input",'');
          }
          if(this.multiple&&!Array.isArray(this.value)){
            this.$emit("input",[]);
          }
          this.$on("handleOptionClick",this.handleOptionClick);
          this.setSelected();
          this.$on("setSelected",this.setSelected);
        },
        mounted(){
            addResizeListener(this.$el,this.handleResize);
        },
        components:{
          UiInput, 
          UiOption,
          UiOptionGroup,
          UiSelectDropdown,
          UiScrollBar,
          UiTag
        }
	}
</script>