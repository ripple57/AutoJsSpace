
let utils = require("./utils.js");


function skipAd() {
    if ("com.android.systemui" == currentPackage()) {
        return;
    }

    switch (currentActivity()) {
        case "android.app.AlertDialog":
            // toastLog("AlertDialog")
            if (currentPackage().indexOf("android.ugc.aweme") > -1) {
                click("我知道了");
                toastLog("抖音青少年模式")
            } else if (currentPackage().indexOf("com.eg.android.AlipayGphone") > -1) {
                click("打开");
                toastLog("打开支付宝")
            } else {
                console.log("未标记的 AlertDialog");

            }
            break;

        case "com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"://刷宝广告
            if (id("com.jm.video:id/tt_video_ad_close_layout").exists()) {
                id("com.jm.video:id/tt_video_ad_close_layout").findOne().click();
            }
            break;
        case "com.ss.android.excitingvideo.ExcitingVideoActivity"://抖音视频广告
            if (text("关闭广告").exists()) {
                text("关闭广告").findOne().click();
            }
            break;
        case "com.tencent.mm.plugin.webwx.ui.ExtDeviceWXLoginUI"://微信电脑端登录验证
            utils.clickText("登录")
            break;
        // case "com.alipay.mobile.nebulax.integration.mpaas.activity.NebulaActivity":
        //     break;
        default:
            utils.clickTextMatches(/^(\s?跳过\s?)$|^(关闭|跳过)\s?(广告$|\d+[sS秒]?$)|^\d+[sS秒]?\s?(关闭|跳过)$/) && log("自动关闭了一个广告");
            break;
    }
}


module.exports = {
    skipAd: skipAd
};