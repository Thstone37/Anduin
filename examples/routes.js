const routes=[
  {
  	path:"",
  	name:"index",
  	component:resolve => require(['./src/components/col.vue'],resolve)
  }

]

module.exports=routes