let utils = require("./utils.js");
utils.autoStart(main);
function main(autoFlag) {
    launchApp("支付宝");
    id("com.alipay.android.phone.wealth.home:id/tab_description").text("我的").waitFor();
    while (!id("com.alipay.android.phone.wealth.home:id/tab_description").findOne().parent().click()) {
        console.log("点击我的");
    };

    id("com.alipay.mobile.antui:id/list_right_text").waitFor();

    var list = id("com.alipay.mobile.antui:id/list_right_text").find();
    var canGet = list.findOne(textEndsWith("积分待领取"));
    console.log(canGet);
    if (canGet != null) {
        console.log("可以点击");
        while (!click("支付宝会员")) {
            console.log("点击支付宝会员");
        };
        text("领积分").waitFor();
        while (!click("领积分")) {
            console.log("点击领积分");
        };
        text("点击领取").waitFor();
        while (text("点击领取").exists()) {
            click("点击领取");
            sleep(200);
            console.log("点击领取一次");
        }
        toastLog("领取完毕");
    } else {
        toastLog("没有可领取的积分");
    }
}
console.log("执行完毕");