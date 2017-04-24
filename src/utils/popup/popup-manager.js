import Vue from "vue";
import {addClass,hasClass} from  "../dom.js";
const PopupManager={
  zIndex:2000,
  nextZIndex: function() {
    return this.zIndex++;
  },
}

export default PopupManager;