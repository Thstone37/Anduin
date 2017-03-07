<template>
	<div class="ui-count-input">
	    <span class="ui-count-input-reduce">
	    	<i class="ui-icon-reduce" @click="reduce"></i>
	    </span>
		<input type="text" class="ui-count-input-inner"  :value="initial" v-model="model"/>
		<span class="ui-count-input-add">
			<i class="ui-icon-add" @click="plus"></i>
		</span> 
	</div>
</template>
<script>
	export default{
		name:"UiCountInput",

		props:{
           initial:{
           	type:[Number,String],
           	default:1
           },
           min:[Number,String],
           max:[Number,String],
           step:{
           	type:Number,
           	default:1
           }
		},
		data(){
			return{
				model:this.initial,
			}
		},
		methods:{
          plus(){
          	var newModel=Number(this.model)+this.step;
          	if(this.max&&(newModel<this.max)){
              this.model=newModel;
          	}else if(!this.max){
          		this.model=newModel;
          	}else{
          		this.model=this.max;
          	}
          },
          reduce(){
          	var newModel=Number(this.model)-this.step;
          	if(this.min&&(newModel>this.min)){
          		this.model=newModel;
          	}else if(!this.min){
          		this.model=newModel;
          	}else{
          		this.model=this.min;
          	}
          }
		}
	}
</script>