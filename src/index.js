import  Col from "../packages/col";
const components=[
  Col
];

const install=function(Vue){
   components.map(component =>{
      Vue.component(component.name,component);
   })	
}
module.exports={
	version:"0.0.1",
	Col,
}