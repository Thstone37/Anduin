import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
Vue.use(VueRouter);

var router=new VueRouter({
	mode:'history',
    routes
})

const app=new Vue({
	router
}).$mount("#app");