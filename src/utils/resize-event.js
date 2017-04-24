const isServer = typeof window === "undefined"
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
})()
