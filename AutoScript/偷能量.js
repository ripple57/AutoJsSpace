let utils = require("./utils.js");
utils.init();
const ant_forest = {
    action: "VIEW",
    data: "alipays://platformapi/startapp?appId=60000002"
}
utils.autoStart(main);

function main(autoFlag) {
    helpFriendCollect = autoFlag;
    //请求截图
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
    var help_img = images.read("./res/help_collect.jpg");
    var friend_img = images.read("./res/friend_collect.jpg");
    var end_img = images.read("./res/end_tag.jpg");
    app.startActivity(ant_forest);
    collectSelf();
    text("查看更多好友").findOne().click();
    text("周排行榜").waitFor();
    sleep(1000);
    while (true) {
        var templ = images.captureScreen();
        var point = images.findImage(templ, friend_img);
        console.log("好友point" + point);
        if (point == null) {
            if (helpFriendCollect) {
                point = images.findImage(templ, help_img);
            }
            if (point == null) {
                while (1) {
                    if (text("加载中...").depth(14).exists()) {
                        log("wait loading....");
                        sleep(1000);
                    } else {
                        break;
                    }
                }
                if (images.findImage(templ, end_img)) {
                    break;
                }
                swipe(500, 2000, 500, 150, 500);
                sleep(500);
                continue;
            }
        }
        if (point.x > 100) {
            click(point.x - 100, point.y + 50);
            collect();
            sleep(300);
        }

    }

    toastLog("好友能量收取完毕");
    help_img.recycle();
    friend_img.recycle();
    back();
    sleep(1000);
}
function collectSelf() {
    text("成就").waitFor();
    while (text("成就").findOne().bounds().top < 50) {
        console.log("滑动");
        scrollUp();
    }
    sleep(200);
    while (point = images.findColorInRegion(images.captureScreen(), '#ceff5f', 0, 400, 1080, 500)) {
        click(point.x + 10, point.y + 10);
        console.log("收能量 点击位置:", point);

    }
    // var list = textMatches("/收集能量[0-9]+克/").find();
    // if (list.nonEmpty()) {
    //     console.log("可收数量:" + list.size());
    //     list.forEach((btn) => {
    //         var b = btn.bounds();
    //         // click(b.centerX(), b.centerY());
    //         console.log("点击收能量了",b.centerX(), b.centerY());
    //         sleep(200);
    //     });
    // } else {
    //     console.log("集合为空");
    // }
}
/**
 * 收能量
 */
function collect() {
    console.log("collect");
    text("TA收取你").waitFor();
    sleep(500);


    if (helpFriendCollect) { //帮忙收集能量
        while (point = images.findColorInRegion(images.captureScreen(), '#ceff5f', 0, 400, 1080, 500,6)) {
            click(point.x + 10, point.y + 10);
            console.log(point);
        }
    } else {
        //只偷不帮的点击事件
        while (point = images.findColorInRegion(images.captureScreen(), '#ceff5f', 0, 400, 1080, 500)) {
            click(point.x + 10, point.y + 10);
            console.log(point);

        }
    }
    back();
}
//cfff60  cefc92  d0fe93

