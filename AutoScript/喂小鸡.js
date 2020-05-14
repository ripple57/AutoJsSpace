let utils = require("./utils.js");
utils.init();
const ant_manor = {
    action: "VIEW",
    data: "alipays://platformapi/startapp?appId=66666674"
}
utils.autoStart(main);
function main() {
    //请求截图
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
    app.startActivity(ant_manor);
    utils.imageWaitFor("道具.png");
    console.log('欢迎来到蚂蚁庄园');
    赶走小鸡()
    找回小鸡()
    添饲料()
    back();
    sleep(1000)
}
function 赶走小鸡() {
    sleep(1000);
    console.log('赶走小鸡');
    while (1) {
        if (utils.clickImageForName('别人的小鸡.png')) {
            console.log('赶走小鸡 一只');
            utils.clickImageWaitFor('胖揍.png');
            console.log('胖揍小鸡 一只')
            utils.clickImageWaitFor('不留言.png');
            console.log('不给对方留言')
            sleep(1500);
        } else {//
            console.log('没有别人的小鸡');
            break;
        }
    }

}
function 找回小鸡() {
    console.log('找回小鸡');
    sleep(1000);
    if (utils.clickImageForName('去找小鸡.png')) {
        textEndsWith("的蚂蚁庄园").waitFor();
        console.log('在别人的庄园');
        point = utils.imageWaitFor("我的小鸡.png");
        click(point.x, point.y + 200);
        idEndsWith('h5_tv_title').text('蚂蚁庄园').waitFor();
    }
}
function 添饲料() {
    console.log('添饲料');
    sleep(1500);
    if (!images.findColorInRegion(images.captureScreen(), "#ffd000", 780, 1820, 170, 80)) {
        console.log('没有饲料了,需要添加');
        click(927, 2156)// utils.clickImageForName("我的饲料.png");
        sleep(500)
        click(972, 674)//utils.clickImageForName("道具.png");
        sleep(1000)
        click(200, 1400)//加速卡
        sleep(500)
        click(700, 1440)//使用按钮
        let task = {
            path: engines.myEngine().getSource().toString(),
            timeMills: new Date().getTime() + 30 * 60 * 1000
        }
        utils.removeTaskByName("喂小鸡");
        utils.addDisposableTask(task);
        sleep(6000)
    } else {//有饲料的,不需要喂
        console.log('有饲料了,不需要添加');
        str = utils.ocrText(810, 1755, 152, 150);
        if (str == null) {
            str = '30分';
            log('时间没有识别出来,修改时间')
        }
        timeStr = str.replace(/\d+秒/, "").replace("分", "").replace("小时", "*60+").replace(/\+$/, "");
        console.log("延时时间计算:  " + timeStr);
        let delayMinute = eval(timeStr) + 1;
        let task = {
            path: engines.myEngine().getSource().toString(),
            timeMills: new Date().getTime() + delayMinute * 60 * 1000
        }
        utils.removeTaskByName("喂小鸡");
        utils.addDisposableTask(task);
    }
    sleep(1000);
}
