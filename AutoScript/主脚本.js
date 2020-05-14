
let utils = require("./utils.js");
let observe = require("./后台监听.js");
let adUtil = require("./自动跳广告.js");
utils.init();
observe.start();
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function(event){
    utils.stopOtherScript();
});
setInterval(() => {
    if (device.isScreenOn()) {
        adUtil.skipAd();
    }
},500);



