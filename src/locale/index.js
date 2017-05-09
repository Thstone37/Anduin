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
    var messageObj=require("../locale/lang/"+message+"-CN");
    i18n=new VueI18n({locale: locale,messages: messageObj});
    exports.i18n=i18n;
}
exports.use=use;
