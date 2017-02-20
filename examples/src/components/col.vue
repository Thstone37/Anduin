<template>
	<div class="app">
	    <nav></nav>
		<ui-col :span="span">
			<div class="col">我是第一个Anduin组件</div>
		</ui-col>
	</div>
</template>
<script>
 export default{
   data(){
     return{
     	span:5
     }
   },
   component:{
   	 "nav":require("./nav.vue");
   } 	
 }
</script>
<style lang="scss">
	.app{
		float:left;
	}
</style>