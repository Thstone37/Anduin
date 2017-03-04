<template>
	<div class="app">
	  <ui-row :gutter="30" :vertical_gutter="30">
	    <ui-col :span="8">
	    	<div class="nav"></div>
	    </ui-col>
		<ui-col :span="12">
			<div class="col"></div>
		</ui-col>
	</ui-row>
	<ui-row :gutter="30">
			<ui-col :span="24">
			<ui-button type="default">
				提交
			</ui-button>
			<ui-button type="primary">
				提交
			</ui-button>
			<ui-button type="success">
				提交
			</ui-button>
			<ui-button type="info">
				提交
			</ui-button>
			<ui-button type="warning">
				提交
			</ui-button>
			<ui-button type="danger">
				提交
			</ui-button>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-button type="default" :simple="true">
				提交
			</ui-button>
			<ui-button type="primary" :simple="true">
				提交
			</ui-button>
			<ui-button type="success" :simple="true">
				提交
			</ui-button>
			<ui-button type="info"   :simple="true">
				提交
			</ui-button>
			<ui-button type="warning" :simple="true">
				提交
			</ui-button>
			<ui-button type="danger" :simple="true">
				提交
			</ui-button>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-button type="default"  :disabled="true">
				提交
			</ui-button>
			<ui-button type="primary"  :disabled="true">
				提交
			</ui-button>
			<ui-button type="success"  :disabled="true">
				提交
			</ui-button>
			<ui-button type="info"  :disabled="true">
				提交
			</ui-button>
			<ui-button type="warning"  :disabled="true">
				提交
			</ui-button>
			<ui-button type="danger"  :disabled="true">
				提交
			</ui-button>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-button size="lg" type="primary">
				提交
			</ui-button>
			<ui-button type="primary">
				提交
			</ui-button>
			<ui-button size="sm" type="primary">
				提交
			</ui-button>
			<ui-button size="xs" type="primary">
				提交
			</ui-button>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-button type="primary" btntype="button">提交</ui-button>
			<ui-button type="success" btntype="submit">提交</ui-button>
			<ui-button type="info" btntype="reset">提交</ui-button>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
		  <ui-button-group>
			<ui-button type="primary" btntype="button">提交</ui-button>
			<ui-button type="success" btntype="submit">提交</ui-button>
			<ui-button type="info" btntype="reset">提交</ui-button>
		  </ui-button-group>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-radio-group v-model="radio">
				<ui-radio label="已认证" name="fstatus"></ui-radio>
				<ui-radio label="未认证" name="fstatus"></ui-radio>
				<ui-radio label="待认证" name="fstatus"></ui-radio>
			</ui-radio-group>
		</ui-col>
	</ui-row>
	<ui-row>
		<ui-col :span="24">
			<ui-checkbox-group v-model="checkbox">
				<ui-checkbox label="北京"></ui-checkbox>
				<ui-checkbox label="上海"></ui-checkbox>
				<ui-checkbox label="深圳"></ui-checkbox>
			</ui-checkbox-group>
		</ui-col>
	</ui-row>
	</div>
</template>
<script>
	 export default{
	   data () {
	     return {
	     	span:10,
	     	radio:"已认证",
	     	checkbox:[]
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
