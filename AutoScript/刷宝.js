
// app.launchApp("刷宝短视频");
var haveTask = false;
var count =0;
var maxCount = 500;
var commentText = "刷视频太慢了，我面来点赞吧！";
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
if ("com.jm.video" != currentPackage()) {
    app.launchApp("刷宝短视频");
    waitForActivity("com.jm.video.ui.main.MainActivity");
}
//可以删除了
// id("com.jm.video:id/tabLayout").waitFor();
// execTask();
mainFunc();


function exitScript() {
    home();
    exit();
}
function mainFunc() {
    if (count>maxCount) exitScript();
    console.log("判断一次");

    //在新线程执行的代码
    text("推荐").waitFor();
    // if(id().exists())
    var bound;
    var equals = true;
    try {
        bound = id("seek_bar").findOne(3000).bounds();
        console.log("判断推荐");
        var img = captureScreen();
        console.log("截屏");
        equals = colors.equals(images.pixel(img, 1, bound.top), images.pixel(img, bound.right - 200, bound.top));
    } catch (error) {

    }
    if (equals) {
        if (random(1, 10) == 1) {//点赞
            clickPraise();
        }
        if (random(1, 15) == 1) {//关注
            addAttention();
        }
        if (random(1, 15) == 1) {//评论
            goComment();
        }
        sleep(1000);
        swipeUp();
        count++;
        toastLog("已刷"+count+"个视频");
        sleep(6000);
    }
    sleep(1000);
    mainFunc();


    // threads.start(function () {
    //     while (!haveTask) {
    //         console.log("循环一次");
    //         if (random(0, 10) == 1) {//点赞
    //             clickPraise();
    //         }
    //         if (random(0, 20) == 1) {//关注
    //             addAttention();
    //         }
    //         if (random(0, 20) == 1) {//评论
    //             goComment();
    //         }
    //         swipeUp();
    //         sleep(random(10, 15) * 1000);
    //     }
    //     execTask();
    // })
}
function clickPraise() {
    try {
        id("com.jm.video:id/praise").exists() && id("com.jm.video:id/praise").findOnce().click();
        log("点赞");
        sleep(500);
    } catch (error) {
        console.log(error);
    }
}
function addAttention() {
    try {
        id("com.jm.video:id/attention").exists() && id("com.jm.video:id/attention").findOnce().click();
        log("关注");
        sleep(500);
    } catch (error) {
        console.log(error);
    }
}

function goComment() {
    log("评论");
    if (!id("com.jm.video:id/comment").exists()) return;
    try {
        var diff = className("android.widget.LinearLayout").depth(1).findOne().bounds().height() - 1920;
        console.log("diff===>" + diff);
        var btn_comment = id("com.jm.video:id/comment").findOne();
        if (parseInt(btn_comment.text()) > 2) {
            log(btn_comment.click());
            textMatches("/[0-9]+条评论/").waitFor();
            var content = id("android:id/list").findOne().child(1).child(0).child(3).text();
            console.log("点击输入框:" + id("com.jm.video:id/editComment").findOne().click());
            id("com.jm.video:id/et_comment").waitFor();
            if (random(0, 2) == 0) {
                content = commentText;
            }
            console.log("设置文本:" + id("com.jm.video:id/et_comment").findOne().setText(content));
            sleep(1000);
            log("点击发送: " + (1500 + diff) + click(1000, 1500 + diff));
            sleep(1000);
            log("点击关闭:" + id("com.jm.video:id/imgClose").findOne().click());
            sleep(1000);
            if (text("今日评论次数已达上限").exists()) log("监测到评论上限")
        }
    } catch (error) {
        console.log(error);
    }
}

function swipeLeft() {
    swipe(700, 1500, 300, 1600, 30);
}
function swipeRight() {
    swipe(300, 1300, 700, 1300, 30);
}
function swipeUp() {
    swipe(400, 1500, 420, 1100, 30);
}
function swipeDown() {
    swipe(500, 1100, 520, 1500, 30);
}
function clickTab(text) {
    log("clickTab" + text);
    if ("com.jm.video.ui.main.MainActivity" == currentActivity()) {
        log("点击" + text + id("com.jm.video:id/tv_tab_title").text(text).findOne().parent().parent().click());
    }
    console.log("当前线程:" + threads.currentThread());
    sleep(1000);

}

function addTastEvent() {
    if (textMatches(/\d{2}:\d{2}:\d{2}/).exists()) {
        var timeArr = textMatches(/\d{2}:\d{2}:\d{2}/).findOne().text().split(":");
        console.log(timeArr);

        var time = Number(timeArr[0]) * 60 * 60 + Number(timeArr[1]) * 60 + Number(timeArr[2]);
        console.log(time);
        threads.currentThread().setTimeout(() => {
            haveTask = true;
            console.log("任务时间到,准备执行");

        }, time * 1000);
    }
}
function execTask() {
    log("execTask")
    clickTab("任务");
    text("当前余额").waitFor();

    if (text("立即签到").className("Button").exists() && text("立即签到").className("Button").click()) {
        // 点击关闭按钮
        log("立即签到");
        text("元宝").depth(17).waitFor();
        text("元宝").depth(17).findOne().parent().child(0).click();
    };
    if (text("开箱领元宝").exists() && text("开箱领元宝").findOne().click()) {
        //  点击关闭按钮
        log("开箱领元宝")
        text("元宝").depth(17).waitFor();
        text("元宝").depth(17).findOne().parent().child(0).click();
        sleep(2000);
        addTastEvent();
    } else {
        log("设置倒计时时间")
        addTastEvent();
    };
    clickTab("首页");
    haveTask = false;

    mainFunc();
}
// var seek = id("com.jm.video:id/seek_bar").findOne();
// console.log(seek.set )