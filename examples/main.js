import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
// import Anduin from "../dist/Anduin.common.js"
Vue.use(VueRouter);
// Vue.use(Anduin);

var router=new VueRouter({
	mode:'history',
    routes
})

const app=new Vue({
	router
}).$mount("#app");