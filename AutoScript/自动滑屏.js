
// //每5秒就发出一次hello
// var id = setInterval(function () {
//     swipe(random(900, 1000), random(1400, 1800), random(100,200), random(1400, 1800), random(200, 500));
// }, random(15000, 17000));
// //1分钟后取消循环
// setTimeout(function () {
//     clearInterval(id);
//     exit();
// }, 60 * 1000);
var prePackage = currentPackage();
console.log(prePackage + "--------" + currentActivity());
function backPreApp() {
    while (currentPackage() != prePackage) {
        back();
        console.log("返回了一次");
    }
    exit();
}
app.startActivity({
    packageName: "com.android.settings",
    className: "com.oppo.settings.SettingsActivity",

});
waitForActivity("com.oppo.settings.SettingsActivity");
swipe(500, 2000, 500, 200, 200);
while (!click("其他设置")) {
    console.log("其他设置");
}
while (!click("开发者选项")) {
    console.log("开发者选项");
}
id("android:id/title").text("开发者选项").findOne().parent().parent().children().forEach(child => {
    var target = child.findOne(id("android:id/switch_widget"));
    if (target != null) {
        if (target.checked()) {
            console.log("开发本来打开");
        } else {
            target.click();
            console.log("开发本来关闭");
        }
        swipe(200, 1000, 200, 500, 200);
        text("USB 调试").waitFor();
        openDebug();
        backPreApp();
    }
});
function openDebug() {
    id("android:id/title").text("USB 调试").findOne().parent().parent().children().forEach(child => {
        var target = child.findOne(id("android:id/switch_widget"));
        if (target != null) {
            if (target.checked()) {
                console.log("本来打开");
            } else {
                console.log("wa本来关闭");
                target.click();
                while (!target.checked());
                text("确定").waitFor();
                click("确定");
            }

        }
    });
}