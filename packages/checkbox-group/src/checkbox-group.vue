<template>
	<div class="ui-checkbox-group">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:"UiCheckboxGroup",

		componentName:"UiCheckboxGroup",

		props:{
			value:{}
		},

		watch:{
			value(value){

			}
		}
	}
</script>