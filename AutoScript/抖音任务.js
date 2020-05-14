

let utils = require("./utils.js");
utils.init();
console.log(engines.myEngine());
main();

function main(params) {
    if (!device.isScreenOn()) {
        utils.autoUnLock("186523");
    }
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
    app.launchApp("抖音极速版");
    while (true) {
        console.log("点击开宝箱一次");
        if (utils.clickImageForName("开宝箱.png")) break;
        sleep(1000);
    }
    text("天天提").waitFor();
    getCrash();
    while (true) {
        console.log("打开宝箱一次");
        if (baoxiang()) break;
        sleep(1000);
    }
    while (true) {
        console.log("看广告查找一次");
        if (lookAd()) break;
        sleep(1000);
    }


}
function baoxiang(params) {
    if (text("开宝箱得金币").exists()) {
        console.log("开宝箱得金币");
        click("开宝箱得金币");
        sleep(1500);
        click("看广告视频再赚");
        sleep(1000);
        return true;
    }
    return false;
}
function lookAd() {
    if (text("去领取").exists()) {
        console.log("限时任务赚金币");
        utils.clickText("去领取");
        sleep(1500);
        click("看广告视频再赚");
        sleep(1000);
        return true;
    }
    return false;
}


function getCrash() {
    if (new Date().getHours() > 10) {//11点以后才能提现
        if (text("去提现").exists()) {
            console.log("抖音提现");
            utils.clickText("去提现");
            text("天天提").waitFor()
            sleep(1000)
            console.log(utils.clickText("天天提"));
            console.log(utils.clickText("立即提现"));
            text("账户确认").waitFor();
            console.log(click("立即提现"));
            text("提现成功").waitFor();
            sleep(1000);
            back();
            return true;
        }
    }
    return false;
}