<template>
	<label class="ui-checkbox">
		<span :class="['ui-checkbox-container',{
         'is-checked':isChecked
		}]">
		    <span class="ui-checkbox-show"></span>
			<input v-if="trueLabel||falseLabel"
			type="checkbox" 
			class="ui-checkbox-real" 
            :name="name"
            :true-value="trueLabel"
            :false-value="falseLabel"
            v-model="model"
            @change="handleChange"
			>
			<input v-else
			type="checkbox" 
			class="ui-checkbox-real" 
            :name="name"
            :value="label"
            v-model="model"
            @change="handleChange"
			>
		</span>
		<span class="ui-checkbox-label">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
	export default{
		name:"UiCheckbox",

		componentName:"UiCheckbox",
        
        mixins:[emit],
		props:{
			value:{},
			label:{},
			checked:Boolean,
			name:String,
			trueLabel:[String,Number],
			falseLabel:[String,Number]
		},

		data(){
			return{
				ownModel:false
			}
		},
		created(){
           this.checked&&this.addToStore();
		},
		computed:{
			isGroup(){
			  let parent=this.$parent;
			  while(parent){
			  	if(parent.$options.componentName!="UiCheckboxGroup"){

			  		parent=parent.$parent;

			  	}else{

                   this._checkboxGroup=parent;
                   return true;

			  	}
			  }
			  return false;
			},
			isChecked(){
              if({}.toString.call(this.model)==="[object Boolean]"){

                   return this.model;

              }else if(Array.isArray(this.model)){
              	   return this.model.indexOf(this.label)>-1;

              }else if(this.model!==null&&this.model!==undefined){
                   return this.model===this.trueLabel;
              }
			},
			store(){
                return this.isGroup?this._checkboxGroup.value:this.value;
			},
			model:{
				get(){

                   return this.isGroup?this.store:this.value!==undefined?this.value:this.ownModel;
				},
				set(val){
					if(this.isGroup){

                       this.dispatch("UiCheckboxGroup","input",[val]);

					}else if(this.value!==undefined){

                       this.emit("input",val);

					}else{

						this.ownModel=val;

					}
				}
			}
		},
		methods:{
			addToStore(){
				if(Array.isArray(this.model)&&this.model.indexOf(this.label)===-1){

					this.model.push(this.label);

				}else{

					this.model=this.trueLabel||true;

				}
			},
			handleChange(ev){
				this.$emit("change",ev);
				this.$nextTick(_ =>{
					 this.dispatch("UiCheckboxGroup","change",[this._checkboxGroup.value]);
				})
			}
		}
	}
</script>