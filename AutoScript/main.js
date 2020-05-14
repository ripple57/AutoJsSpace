
let utils = require("./utils.js");
let observe = require("./后台监听.js");
utils.init();
observe.start();
setInterval(() => {
    if (device.isScreenOn()) {
        skipAd();
    }
}, 1000);


function skipAd() {
    console.log("包名" + currentPackage() + "\n活动" + currentActivity())
    switch (currentActivity()) {
        case "com.ss.android.article.base.feature.splash.SplashActivity"://头条
            click("跳过广告");
            console.log("头条")
            printViewList();
            break;
        case "android.app.AlertDialog":
            toastLog("AlertDialog")
            if (currentPackage().indexOf("android.ugc.aweme") > -1) {
                click("我知道了");
                toastLog("抖音青少年模式")
            } else if (currentPackage().indexOf("com.eg.android.AlipayGphone") > -1) {
                click("打开");
                toastLog("打开支付宝")
            }
            break;

        case "com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"://刷宝广告
            if (id("com.jm.video:id/tt_video_ad_close").exists()) {
                id("com.jm.video:id/tt_video_ad_close").findOne().click();
            }
            break;
        case "com.ss.android.excitingvideo.ExcitingVideoActivity"://抖音视频广告
            if (text("关闭广告").exists()) {
                text("关闭广告").findOne().click();
            }
            break;
        case "com.rnx.react.activityfork.ReactActivity1"://便利蜂
            console.log("便利蜂")
            clickText("跳过");
            break;
        case "enfc.metro.main.MainActivity"://亿通行
            console.log("亿通行");
            if (!text("北京轨道交通乘车码").exists()) {
                id("enfc.metro:id/mBottomItemQrCode").findOne().click();
            }
            break;
        default:

            break;
    }
}

function clickText(txt) {
    if (text(txt).exists()) {
        var a = text(txt).findOne().bounds();
        return click(a.centerX(), a.centerY());
    } else if (desc(txt).exists()) {
        var b = desc(txt).findOne().bounds();
        return click(b.centerX(), b.centerY());
    } else {
        return false;
    }
}
