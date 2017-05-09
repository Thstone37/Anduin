import {t} from "../locale/index";

export default{
	methods:{
		t(...args){
			t.apply(this,args);
		}
	}
}
