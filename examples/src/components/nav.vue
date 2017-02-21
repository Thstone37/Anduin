<template>
	<div id="nav">
	   <ui-col :span="8">
		<ul>
			<router-link class="iconfont icon-quanbu" :to="{name:'index'}">layout布局</router-link>
		</ul>
		</ui-col>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="scss">
	#nav{
		float:left;
	}
</style>