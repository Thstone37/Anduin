<template>
	<div class="ui-checkbox-group">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:"UiCheckboxGroup",

		component:"UiCheckboxGroup",

		props:{
			value:{}
		},

		watch:{
			value(value){
				this.$emit("change",value);
			}
		}
	}
</script>