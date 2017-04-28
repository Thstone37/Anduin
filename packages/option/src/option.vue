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
         
        props:{
        	label:{
        		type:[String,Number],
        		default:''
        	},
        	value:{
        		type:[String,Number],
        		default:''
        	}
        },
        methods:{
            selectOptionClick(){
                
            }
        }

	}
</script>