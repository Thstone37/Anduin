<template>
	<transition :name="closeTransition?'':'ui-zoom-in-center'">
		<span class="ui-tag">
			<slot></slot>
			<i class="ui-tag-close"></i>
		</span>
	</transition>
</template>
<script>
	export default{
       name:'UiTag',
       componentName:"UiTag",
       props:{
       	 closeTransition:Boolean
       }
	}
</script>