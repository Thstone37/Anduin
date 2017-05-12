import Vue from "vue";
import deepmerge from "deepmerge";
import Format from "./format";
import defaultLang from "../locale/lang/zh-CN.js";

const format=Format(Vue);
let lang=defaultLang;
let merged=false;