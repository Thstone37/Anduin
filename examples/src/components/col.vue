<template>
	<div class="app">
	  <ui-row>
	    <ui-col :span="8">
	    	<div class="nav"></div>
	    </ui-col>
		<ui-col :span="12" :offset="4">
			<div class="col"></div>
		</ui-col>
	</ui-row>
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
