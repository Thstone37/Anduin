<template>
	<ul class="ui-select-group-container">
		<li class="ui-select-group-title" v-show="visible">{{label}}</li>
		<li>
			<ul class="ui-select-group">
				<slot></slot>
			</ul>
		</li>
	</ul>
</template>
<script>
	export default{
		name:"UiOptionGroup",

		componentName:"UiOptionGroup",

		props:{
          label:String,
          disabled:{
          	type:Boolean,
          	default:false
          }
		},
		data(){
			return {
				visible:true
			}
		}
	}
</script>