import Vue from "vue";
import deepmerge from "deepmerge";
import Format from "./format";
import defaultLang from "../locale/lang/zh-CN.js";

const format = Format(Vue);
let lang = defaultLang;
let merged = false;

let i18nHandler=function(){
	const vuei18n=Object.getPrototypeOf(this||Vue).$t;
	if(typeof vuei18n=='function'){
		if(!merged){
			merged=true;
			Vue.locale(Vue.config.lang,
				deepmerge(lang,Vue.locale(Vue.config.lang)||{},{clone:true}))
		}
		return vuei18n.apply(this,arguments);
	}
}