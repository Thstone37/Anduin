import Col from "../packages/col";
import Row from "../packages/row";
import Button from "../packages/button";
import ButtonGroup from "../packages/button-group";
import Radio from "../packages/radio";
import RadioGroup from "../packages/radio-group";
import CheckBox from "../packages/checkbox";
import CheckBoxGroup from "../packages/checkbox-group";
import CountInput from "../packages/countInput";
import Option from "../packages/option";
import OptionGroup from "../packages/option-group";
import Select from "../packages/select";
import Input from "../packages/input";
import Tag from "../packages/tag";
import locale from "./locale/index.js";
const components=[
  Col,
  Row,
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  CheckBox,
  CheckBoxGroup,
  CountInput,
  Option,
  OptionGroup,
  Select,
  Input,
  Tag
];
const install=function(Vue,opts={}){
  /* istanbul ignore if */
  if (install.installed) return;
   locale.use(opts.lang);
   locale.i18n(opts.i18n);

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
  CountInput,
  Option,
  OptionGroup,
  Select,
  Input,
  Tag
}