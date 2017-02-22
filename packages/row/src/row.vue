<template>
	<div class="ui-row" :style="style">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:"UiRow",
		props:{
			gutter:Number,
			vertical_gutter:Number
		},
		computed:{
			style(){
				var ret={};
				ret.marginLeft=`-${this.gutter/2}px`;
				ret.marginRight=ret.marginLeft;
				return ret
			}
		}
	}
</script>