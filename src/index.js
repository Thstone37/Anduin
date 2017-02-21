import Col from "../packages/col";
const components=[
  Col
];

const install=function(Vue){
  /* istanbul ignore if */
  if (install.installed) return;
   components.map(component =>{
      Vue.component(component.name,component);
   })	
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
module.exports={
	version:"0.0.1",
	install,
	Col,
}