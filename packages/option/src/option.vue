<template>
	<li class="ui-option" :data-value="value" @click.stop="selectOptionClick" :class="{
      'selected':itemSelected,
      'disabled':disabled||groupDisabled,
      'ui-option-multiple':parent.multiple
    }">
    <slot><span>{{label}}</span></slot>
	</li>  
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
	export default{
		name:"UiOption",

		componentName:"UiOption",
        mixins:[emit],
        props:{
        	label:{
        		type:[String,Number],
        		default:''
        	},
        	value:{
        		type:[String,Number],
        		default:''
        	},
          created:Boolean,
          disabled:{
            type:Boolean,
            default:false
          },
          // groupDisabled:{
          //     type:Boolean,
                
          // }
        },
        data(){
            return{
                // disabled:{
                //     type:Boolean,
                //     default:false
                // },
            }
        },
        watch:{
          value(){
            if(!this.created) this.dispatch("UiSelect","setSelected");
          }
        },
        computed:{
          parent(){
           let parent=this.$parent;
           while(!parent.isSelect){
            parent=parent.$parent;
           }
           return parent;
          },
          itemSelected(){
            if(!this.parent.multiple){
                return this.value===this.parent.value;
            }else{
                return this.parent.value.indexOf(this.value)>-1;
            }
          },
          groupDisabled(){
            let parent=this.$parent;
            if(parent.componentName="UiOptionGroup"){              
              return parent.disabled;
            }else{
                return false;
            }
          }
        },
        methods:{
            selectOptionClick(){
               if(this.disabled!==true&&this.groupDisabled!==true){
                 this.dispatch("UiSelect","handleOptionClick",this);
               }
            }
        },
        created(){
            this.parent.options.push(this);
            this.parent.cachedOptions.push(this);
        }

	}
</script>