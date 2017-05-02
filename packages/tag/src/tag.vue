<template>
	<transition :name="closeTransition?'':'ui-zoom-in-center'">
		<span class="ui-tag">
			<slot></slot>
			<span class="ui-tag-text">{{value.label}}</span>
			<i class="ui-icon-close ui-icon-tag" @click="handleClose"></i>
		</span>
	</transition>
</template>
<script>
	export default{
       name:'UiTag',
       componentName:"UiTag",
       props:{
       	 value:{},
       	 closeTransition:Boolean
       },
       methods:{
       	handleClose(){
       		this.$emit("close",event);
       	}
       }
	}
</script>