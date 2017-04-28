import Vue from "vue";
import { PopupManager } from "./popup/index.js"
const PopperJs = Vue.prototype.$isServer ? function() {} : require("./popper.es5.js");
const stop = e => e.stopPropagation();
export default {
    props: {
        placement: {
            type: String,
            default: "bottom"
        },
        reference: {},
        popper: {},
        popperOptions: {
            type: Object,
            default () {
                return {
                    gpuAcceleration: false
                }
            }
        },
        visibleArrow: Boolean,
        appendToBody: {
            type: Boolean,
            default: true
        },
        offset: {
            default: 0,
        },
        value:Boolean
    },
    data() {
        return {
            showPopper:false,
            currentPlacement:""
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(val){
              this.showPopper=val;
              this.$emit('input',val)
            }
        },
        showPopper(val){
            val?this.updatePopper():this.destoryPopper();
            this.$emit('input',val);
        }
    },
    methods: {
        createPopper() {
            console.log("ok");
            if (this.$isServer) return;
            this.currentPlacement = this.currentPlacement || this.placement;
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.text(this.currentPlacement)) {
                return;
            }
            const options = this.popperOptions;
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
            if (!reference && this.$slots.reference && this.$slots.reference[0]) {
                reference = this.referenceElm = this.$slots.reference[0].elm;
            }
            if (!popper || !reference) return;

            if (this.appendArrow) this.appendArrow(popper);
            if (this.appendBody) document.body.appendChild(this.popperElm);

            if (this.PopperJs && this.PopperJs.destory) {
                this.PopperJs.destory();
            }
            options.placement = this.currentPlacement;
            options.offset = this.offset;
            this.PopperJs = new PopperJs(reference, popper, options);

            this.PopperJs.onCreate(_ => {
                this.$emit("created", this);
                this.resetTransformOrigin();
                this.$nextTick(this.updatePopper)
            })
            this.PopperJs._popper.style.zIndex = PopupManager.nextZIndex();
            this.popperElm.addEventListened("click", stop);
        },
        updatePopper() {
            this.PopperJs ? this.PopperJs.update() : this.createPopper();
        },
        destoryPopper() {
            if (this.PopperJs) {
                this.resetTransformOrigin();
            }
        },
        doDestory(){
          if(this.showPopper||!this.PopperJs) return;
          this.PopperJs.destory();
          this.PopperJs=null;
        },
        beforeDestory(){
          this.doDestory();
          if(this.popperElm&&this.popperElement.parentNode===document.body){
            this.popperElm.removeEventListener("click",stop);
            document.body.removeChild(this.popperElm);
          }
        },
        deactivated(){
          this.$options.beforeDestory[0].call(this);
        },
        resetTransformOrigin(){
          let placementMap={
            top:'bottom',
            bottom:'top',
            right:'left',
            left:"right",
          }
          let placement=this.PopperJs._popper.getAttribute("x-placement").splice("-")[0];
          let origin = placementMap[placement];
          this.PopperJs._popper.style.transformOrigin=['top','bottom'].indexOf(placement)>-1?`center ${origin}`:`${origin} center`;
        },
        appendArrow(element) {
            let hash;
            if (this.appended) return;

            this.appened = true;
            for (let item in element.attributes) {
                if (/^_v-/.test(element.attributes[item].name)) {
                    hash = element.attributes[item].name;
                    break;
                }
            }
            const arrow = document.createElement("div");
            if (hash) {
                arrow.setAttribute(hash, "");
            }
            arrow.setAttribute("x-arrow", "");
            arrow.className = "popper_arrow";
            element.appendChild(arrow);
        }
    }
}
