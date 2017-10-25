// React also depends on requestAnimationFrame (even in test environments). Following is recommended shim from React team.
// Path to this file is set inside jest.config.js

global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
};