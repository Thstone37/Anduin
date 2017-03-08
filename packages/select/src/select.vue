<template>
	<div class="ui-select">
		<input type="text"/>
		<slot></slot>
	</div>
</template>
<script>
    import emit from "../../../src/mixins/emit.js";
    import UiOption from "../../option/src/option.vue";
    import UiOptionGroup from "../../option-group/src/option-group.vue";
    import UiSelectDropdown from "../../select-dropdown/src/select-dropdown.vue";
	export default{
        name:"UiSelect",
        componentName:"UiSelect",
        mixins:[emit],

        components:{
          UiOption,
          UiOptionGroup,
          UiSelectDropdown
        }
	}
</script>