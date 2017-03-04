import Col from "../packages/col";
import Row from "../packages/row";
import Button from "../packages/button";
import ButtonGroup from "../packages/button-group";
import Radio from "../packages/radio";
import RadioGroup from "../packages/radio-group";
import CheckBox from "../packages/checkbox";
import CheckBoxGroup from "../packages/checkbox-group";
import CountInput from "../packages/countInput";
const components=[
  Col,
  Row,
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  CheckBox,
  CheckBoxGroup,
  CountInput
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
  Row,
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  CheckBox,
  CheckBoxGroup,
  CountInput
}