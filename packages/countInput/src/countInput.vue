<template>
	<div class="ui-count-input">
	    <input type="text" class="{'is-left'}" v-if="!center"/>
	    <span class="ui-count-input-reduce">
	    	<i class="ui-icon-reduce"></i>
	    </span>
		<input type="text" class="{'is-center'}" v-if="center" />
		<span class="ui-count-input-add">
			<i class="ui-icon-add"></i>
		</span> 
	</div>
</template>
<script>
	export default{
		name:"UiCountInput",

		props:{
           center:{
           	type:Boolean,
           	default:true
           }
		}
	}
</script>