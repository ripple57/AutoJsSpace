
let utils = require("./utils.js");
function start() {
    events.observeToast();
    events.onToast(function (toast) {
        log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
    });

    events.observeNotification();
    events.on("notification", function (n) {
        log("收到新通知:\n 标题: %s, 内容: %s, \n包名: %s", n.getTitle(), n.getText(), n.getPackageName());
        if (n.getText() == null) {
            return;
        }
        var fileName;
        if (n.getPackageName() == "com.eg.android.AlipayGphone" && n.getTitle().match(/你的能量快成熟了/)) {
            let task = {
                path: "./偷能量.js",
                timeMills: new Date().getTime() + 60 * 1000,//60s后执行
            }
            utils.addDisposableTask(task);
        } else if (n.getText().match(/(执行|开启)\S+\.js$/i)) {//执行脚本
            fileName = n.getText().match(/(执行|开启)\S+\.js$/i)[0].slice(2);
            log("执行脚本:" + fileName);
            engines.execScriptFile(engines.myEngine().cwd() + "/" + fileName);
        } else if (n.getText().match(/停止\S+\.js$/i)) {//停止脚本
            fileName = n.getText().match(/停止\S+\.js$/i)[0].slice(2);
            log("关闭脚本:" + fileName);
            utils.stopScript(fileName, true);
        } else if (n.getText().match(/当前脚本$/)) {//微信返回正在运行的脚本
            n.click();
            className("EditText").waitFor();
            setText(engines.all().toString());
            className("Button").text("发送").findOne().click();
        } else if (n.getPackageName() == "com.tencent.mm") {//微信的机器人自动回复
            weChatAuto(n);
        } else if (n.getPackageName() == "com.android.mms" && n.getText().match(/验证码|随机码|校验码/)) {
            var index = n.getText().search(/验证码|随机码|校验码/) + 3;
            var code = n.getText().slice(index);
            setClip(code.match(/\d+/)[0]);
            if (et = textMatches(/\S*(验证码|随机码|校验码)\S*/).className("EditText").findOne(1000)) {
                et.setText(code.match(/\d+/)[0]);
            };
        }

    });
}
function weChatAuto(n) {
    if (n.getText().slice(n.getText().indexOf(": ") + 2) == "拍照") {
        app.launchApp("相机");
        sleep(2000)
        id('com.oppo.camera:id/shutter_button').findOne(5000).click();
    } else if (n.getText().match(/(开启|打开)(机器人|自动回复)$/) || n.getText().toString() == "自动回复") {
        n.click();
        utils.startScript("机器人.js");
    } else if (n.getText().match(/(停止|关闭|退出)(机器人|自动回复)$/)) {
        utils.stopScript("机器人.js");
    } else if (engines.all().toString().indexOf("机器人.js") > -1) {
        n.click();
    }
}
module.exports = {
    start: start
};