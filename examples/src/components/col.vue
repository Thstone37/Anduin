<template>
	<div class="app">
	    <ui-col :span="8">
	    	<div class="nav"></div>
	    </ui-col>
		<ui-col :span="16">
			<div class="col"></div>
		</ui-col>
	</div>
</template>

<script>
	 export default{
	   data () {
	     return {
	     	span:10
	     }
	   },
	   components: {
	   	'menunav': require('./nav.vue')
	   }
	 }
</script>
<style lang="scss">
    .app{
    	overflow:hidden;
    	width:1200px;
    	margin:0 auto;
    	min-height:30px;
    }
    .nav{
    	min-height: 30px;
    	background: #99a9bf;
    }
    .col{
    	background:#99a9bf;
    	min-height:30px;
    }
</style>
