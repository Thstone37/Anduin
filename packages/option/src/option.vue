<template>
	<li class="ui-option" data-value="value" @click.stop="selectOptionClick" :class="{
      'selected':itemSelected
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
            groupDisabled:{
                type:Boolean,
                
            }
        },
        data(){
            return{
                disabled:{
                    type:Boolean,
                    default:false
                },
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
          }
        },
        methods:{
            selectOptionClick(){
                console.log(!this.disabled);
                console.log(this.groupDisabled);
               if(!this.disabled&&!this.groupDisabled){
                 console.log(this);
                 this.dispatch("UiSelect","handleOptionClick",this);
               }
            }
        }

	}
</script>