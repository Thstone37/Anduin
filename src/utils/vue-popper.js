import Vue from "vue";
const PopperJs = Vue.prototype.$isServer ? function() {} : require("./popper.es5.js");
export default {

}