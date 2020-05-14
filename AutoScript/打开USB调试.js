var prePackage = currentPackage();
console.log(prePackage + "--------" + currentActivity());
function backPreApp() {
    var i = 0;
    while (currentPackage() != prePackage) {
        back();
        sleep(100);
        console.log("返回了" + i + "次" + currentPackage());
        if (i++ > 30) {
            break;
        }
    }
    exit();
}
goDebugView();
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
    console.log("尝试打开usb");

    id("android:id/title").text("USB 调试").findOne().parent().parent().children().forEach(child => {
        var target = child.findOne(id("android:id/switch_widget"));
        if (target != null) {
            openUSB(target)
        }
    });
}
function openUSB(target) {
    console.log("open  usb");
    if (!target.checked()) {
        console.log("aaaa");
        target.click();
        sleep(500);
        if (text("确定").exists()) {
            while (!click("确定"));
        }
        toastLog("USB调试已打开!");
    }
    toastLog("USB调试已打开!");
}
function goDebugView() {
    try {
        var intent = new Intent("android.settings.APPLICATION_DEVELOPMENT_SETTINGS");
        app.startActivity(intent);
    } catch (err1) {
        console.log("err1====>" + err1);
        try {
            app.startActivity({
                action: "VIEW",
                packageName: "com.android.settings",
                className: "com.android.settings.DevelopmentSettings",
            });
        } catch (e1) {
            console.log("e1====>" + e1);
            toast("打开开发者模式失败")
            exit();
        }
    }
}