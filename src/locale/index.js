import VueI18n from "vue-i18n";
import Vue from "vue";
// import defaultMessage from "../locale/lang/zh-CN.js";

Vue.use(VueI18n);
let message = null;
let locale=null;
let i18n=null;
const getLang = function(message) {
    let lang = '';
    Object.keys(message).forEach(key => {
        lang = key;
    })
    return lang;
}
// let locale = getLang(message);

const use = function(m) {
    message = m || message;
    locale=getLang(message);
    i18n=new VueI18n({locale: locale,messages: message})
}
console.log(i18n);
export default {
    i18n: i18n,
    use:use,
}
