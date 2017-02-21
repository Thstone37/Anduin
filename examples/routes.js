const routes=[
  {
  	path:"/examples/example.html",
  	name:"index",
  	component:resolve => require(['./src/components/col.vue'],resolve)
  }

]

module.exports=routes