<template>
	<div class="ui-radio-group">
		<slot></slot>
	</div>
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
	export default{
      name:"UiRadioGroup",

      componentName:"UiRadioGroup",

      mixins:[emit],

      props:{
        value:{},
      },
      watch:{
      	value(value){
      		console.log(value);
      		this.$emit("change",value);
      	}
      }
	}
</script>