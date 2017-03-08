import SelectDropdown from "./src/select-dropdown.vue";

SelectDropdown.install=function(){
	Vue.component(SelectDropdown.name,SelectDropdown);
}

export default SelectDropdown;