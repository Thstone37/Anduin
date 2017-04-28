const isServer = typeof window === "undefined";
const requestAnimationFrame = (function() {
    if (isServer) return;
    var raf = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(fn) {
            return window.setTimeOut(fn, 20);
        };
    return function(fn) {
        return raf(fn)
    }
})();

const cancelAnimationFrame = (function() {
    if (isServer) return;
    var caf = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.clearTimeout;
    return function(id) {
        return caf(id);
    }
})();

const resetTrigger = function(element) {
    const trigger = element._resizeTrigger_;
    const expand = trigger.firstElementChild;
    const contract = trigger.lastElementChild;
    const expandChild = expand.firstElementChild;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + "px";
    expandChild.style.height = expand.offsetHeight + 1 + "px";
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
};

const checkTrigger = function(element) {
    return element.offsetWidth !== element._resizeLast_.width || element.offsetHeight !== element._resizeLast_.height;
};
const scrollListener = function(event) {
    resetTrigger(this);
    if (this._resizeRAF_) cancelAnimationFrame(this._resizeRAF_);
    this._resizeRAF_ = requestAnimationFrame(() => {
        if (checkTrigger(this)) {
            this._resizeLast_.width = this.offsetWidth;
            this._resizeLast_.height = this.offsetHeight;
            this._resizeListeners_.forEach((fn) => {
                fn.call(this, event);
            });
        }
    });
};
const attachEvent = isServer ? function() {} : document.attachEvent;
const DOM_PREFIXES = "webkit moz o ms".split(" ");
const START_EVENTS = "webkitAnimationStart animationStart oAnimationStart MSAnimationStart".split(" ");
const RESIZE_ANIMATION_NAME = "resizeAnim";
let animation = false;
let keyFramePrefix = "";
let animationStartEvent = "animationstart";

if (!attachEvent && !isServer) {
    const testElement = document.createElement("fakeelement");
    if (testElement.style.animationName !== undefined) {
        animation = true;
    }
    if (animation === false) {
        let prefix = '';
        for (var i = 0, len = DOM_PREFIXES.length; i < len; i++) {
            if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
                prefix = DOM_PREFIXES[i];
                keyFramePrefix = "-" + prefix.toLowerCase() + "-";
                animationStartEvent = START_EVENTS[i];
                animation = true;
                break;
            }
        }
    }
}

let StyleCreated = false;
const createStyle = function() {
    if (!StyleCreated && !isServer) {
        const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} {from {opacity:0;} to {opacity:0;}}`;
        const animationStyle = `${keyFramePrefix}animation:1ms ${RESIZE_ANIMATION_NAME}`;

        const css = `${animationKeyframes}
                   .resize-triggers{ ${animationStyle}; visibility:hidden;opacity:0;}
                   .resize-triggers, .resize-triggers > div, .contract-trigger:before{ content:\"\";display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}
                   .resize-triggers > div {background:#eee;overflow:auto}
                   .contract-trigger:before{width:200%;height:200%;}
                  `;
        const head = document.head || document.getElementsByTagName("head")[0];
        const style = document.createElement("style");

        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        StyleCreated = true;
    }
}
export const addResizeListener = function(element, fn) {
    if (isServer) return;
    if (attachEvent) {
        element.attachEvent("onresize", fn);
    } else {
        if (!element._resizeTrigger_) {
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }

            createStyle();
            element._resizeLast_ = {};
            element._resizeListeners_ = [];
            const resizeTrigger = element._resizeTrigger_ = document.createElement("div");
            resizeTrigger.className = "resize-triggers";
            resizeTrigger.innerHTML = "<div class='expand-trigger'><div></div></div><div class='contract-trigger'></div>";
            element.appendChild(resizeTrigger);

            resetTrigger(element);
            element.addEventListener('scroll', scrollListener, true);

            if (animationStartEvent) {
                resizeTrigger.addEventListener(animationStartEvent, function(event) {
                    if (event.animationName == "RESIZE_ANIMATION_NAME") {
                        resetTrigger(element);
                    }

                })
            }
        }
        console.log(element._resizeListeners_);
        element._resizeListeners_.push(fn);
    }
}
export const removeResizeListener = function(element, fn) {
    if (attachEvent) {
        element.detachEvent("onresize", fn)
    } else {
        element._resizeListeners_.splice(element._resizeListeners_.indexOf(fn), 1);
        if (!element._resizeListeners_.length) {
            element.removeEventListener('scroll', scrollListener);
            element._resizeTrigger_ = !element.removeChild(element._resizeTrigger_);
        }
    }
}
