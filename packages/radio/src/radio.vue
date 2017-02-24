<template>
	<label class="ui-radio">
		<span :class="['ui-radio-container',{
         'is-checked':

		}]">
		    <span class="ui-radio-show"></span>
			<input type="radio" class="ui-radio-real" v-model="model">
		</span>
		<span class="ui-radio-show"></span>
	</label>
</template>
<script>
	export default{
		name :"UiRadio",
		props:{
			name:"UiRadio",
			componentName:"UiRadio",
		}
	}
</script>