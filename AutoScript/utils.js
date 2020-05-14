const DEVICE_WIDTH = device.width || 1080;
const DEVICE_HEIGH = device.heigh || 2340;
let utils = {
    prePackage: currentPackage()
};
utils.init = () => {
    console.log("初始化之前的包名", utils.prePackage);
    console.log("关闭同名其他脚本");
    utils.stopScript(engines.myEngine().getSource());
}

utils.autoStart = (startFun, delaySec, jsName) => {
    if (device.isScreenOn()) {
        if (delaySec == 0) {
            startFun();
        }else{
            utils.showDelayDialog(startFun, delaySec, jsName);
        }
    } else {
        utils.autoUnLock("186523");
        log("unlock  success");
        startFun(true);
        utils.endFun(true);

    }
}
utils.endFun = (autoLock) => {
    if (autoLock) {
        home();
        console.log("一键锁屏");
        app.launchApp("一键锁屏")

    } else if (utils.prePackage == 'com.oppo.launcher') {
        home();
    } else if (utils.prePackage != currentPackage()) {
        utils.backLastApp();
    }
}

/**
 * 根据文件名启动脚本
 */
utils.startScript = (scriptName) => {
    try {
        engines.execScriptFile(engines.myEngine().cwd() + "/" + scriptName);
    } catch (error) {
        console.log("开启脚本" + scriptName + "错误:" + error);
    }
}
/**
 * 根据名称关闭脚本 
 * self 是否关闭自己
 */
utils.stopScript = function (scriptName, stopSelf) {
    log("将关闭的脚本名称:  " + scriptName);
    let currentScript = engines.myEngine().toString();
    let allEngs = engines.all();
    log("目前运行的脚本: \n" + allEngs);
    allEngs.forEach((script) => {
        if (currentScript != script.toString() && script.getSource().toString().indexOf(scriptName) != -1) {
            script.forceStop();
            console.log(script.getSource() + "强制关闭了");
        }
    })
    if (stopSelf && currentScript.indexOf(scriptName) > -1) {
        engines.myEngine().forceStop();
    }
}
/**
 * 关闭除当前外的其他脚本
 * */
utils.stopOtherScript = () => {
    let allEngs = engines.all();
    let currentScript = engines.myEngine().toString();
    log(currentScript);
    allEngs.forEach((script) => {
        if (currentScript != script.toString()) {
            script.forceStop();
        }
    })
}
/**
 * 根据输入的密码解锁手机屏幕
 * @param {*} password 
 */
utils.autoUnLock = function (password) {
    device.wakeUp();
    sleep(500)
    // 进入解锁页面
    /**
    *viewId: com.android.systemui:id/container; 华为密码输入区域;
    *viewId: com.android.systemui:id/lock_digital_view//oppo密码键盘区
    *viewId: com.android.systemui:id/lockPatternView图案密码区域
    */
    log(0 + currentPackage() + "==>" + currentActivity())
    if ("com.android.systemui" == currentPackage() && "android.widget.FrameLayout" == currentActivity()) {//唤醒页面
        while (true) {
            if (text("紧急呼叫").exists()) break;
            log("滑动进入解锁页swipeUp:" + swipe(100, 1500, 120, 1000, 80));
            sleep(500);
        }
        if (text("1").exists() && !className("android.widget.EditText").exists()) {//华为手机
            log("荣耀数字解锁")
            let btn = function (num) {
                return text(num).clickable().exists() ? text(num).findOne() : text(num).findOne().parent();
            }
            password.split("").forEach((num) => {
                console.log("click: " + num + btn(num).click());
            });

        } else if (desc("1").exists() && !className("android.widget.EditText").exists()) {//oppo手机
            log("oppo数字解锁")
            let btn = function (num) {
                return desc(num).clickable().exists() ? desc(num).findOne() : desc(num).findOne().parent();
            }
            password.split("").forEach((num) => {
                console.log("click: " + num + btn(num).click());
            });
        } else if (id("com.android.systemui:id/lockPatternView").exists()) {//图案解锁
            log("图案解锁")
            let lockPatternView_bounds = id("com.android.systemui:id/lockPatternView").findOne().bounds();
            let params = [];
            password.split("").forEach((num) => {
                params.push(getPosition(num, lockPatternView_bounds));
            });
            eval("gesture(800," + JSON.stringify(params).slice(1, -1) + ")");
        } else if (id("com.android.systemui:id/input_entry").exists()) {//oppo混合密码
            log("oppo混合密码")
            id("com.android.systemui:id/input_entry").findOne().setText(password);
            click(DEVICE_WIDTH - 80, DEVICE_HEIGH - 80);
        } else if (id("com.android.systemui:id/passwordEntry").exists()) {//荣耀混合密码
            log("荣耀混合密码")
            input(0, password.slice(0, -1));
            setText(0, password);
        } else {
            toastLog("该手机解锁功能尚未实现!")
        }
    }
    sleep(1000);//500 ms 后根据是否进入桌面判断成功与否,手机性能不好可适当调大该值
    console.log(currentPackage() + "===" + (".launcher" == currentPackage().slice(-9)) + "结束");
    return ".launcher" == currentPackage().slice(-9);
}
/**
 * 获取数字对应屏幕上的坐标点
 * @param {*} num 数字(图案解锁为该点对应的位置)
 * @param {*} bounds 解锁视图的Rect
 */
function getPosition(num, bounds) {
    let w = bounds.width();
    let h = bounds.height();
    let result = [];
    switch (parseInt(num)) {
        case 1:
            result = [w / 6, h / 6];
            break;
        case 2:
            result = [w / 2, h / 6];
            break;
        case 3:
            result = [w * 5 / 6, h / 6];
            break;
        case 4:
            result = [w / 6, h / 2];
            break;
        case 5:
            result = [w / 2, h / 2];
            break;
        case 6:
            result = [w * 5 / 6, h / 2];
            break;
        case 7:
            result = [w / 6, h * 5 / 6];
            break;
        case 8:
            result = [w / 2, h * 5 / 6];
            break;
        case 9:
            result = [w * 5 / 6, h * 5 / 6];
            break;
        default:
            break;
    }
    result = [result[0] + bounds.left, result[1] + bounds.top];
    return result;
}

/**
 * 在手机锁屏的情况下,输出锁屏页面布局
 */
utils.printViewList = function () {
    let cutP = 0;
    let dep = 0;
    try {
        let root = className("android.widget.FrameLayout").depth(0).findOne();
        // let root = className("android.widget.Button").findOne();
        logChildren(root);
    } catch (error) {
        log(error);
    }

    function logChildren(parent) {
        cutP = dep++;
        console.log(cutP + "+++parent====================>" + parent);
        if (parent.childCount() == 0) {
            console.log("=========该视图没有子视图============");
            return;
        }
        let childs = parent.children();
        for (let i = 0; i < childs.length; i++) {
            log(cutP + "+++parent:第" + (i + 1) + "个子视图\n" + childs[i].className());
            // if (cutP == 0 && i == 2) {
            //     console.log(cutP + "parent:第" + i + "个子视图的详细信息:==============>\n" + childs[i]);
            // }
            logChildren(childs[i]);
        };
    }
}

/** 
  *添加一个一次性定时任务
  * @param {*} task 
  * @example
  * addDisposableTask({
  *    path: "./test.js",
  *    timeMills: new Date().getTime() + 10 * 1000,,//脚本立即执行
  *    delay:20000//脚本里的方法延时20s后再运行
  *    interval:0,//几秒执行一次
  *    loopTimes:1//循环次数
  * });
  */
utils.addDisposableTask = function (task) {
    let TimedTask = org.autojs.autojs.timing.TimedTask;
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    let timedTask = new TimedTask(task.timeMills, 0, files.path(task.path), parseConfig(task));
    TimedTaskManager.addTask(timedTask);
    return timedTask;
};
//添加一个每日任务 例子:同上
utils.addDailyTask = function (task) {
    task.flag = task.flag | 0;
    let TimedTask = org.autojs.autojs.timing.TimedTask;
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    let timedTask = new TimedTask(task.timeMills, 0x7F, files.path(task.path), parseConfig(task));
    TimedTaskManager.addTask(timedTask);
    return timedTask;
};
utils.removeTask = function (task) {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    TimedTaskManager.removeTask(task);
};

utils.removeTaskByName = function (name) {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    let allTasks = TimedTaskManager.getAllTasksAsList();
    for (let index = 0; index < allTasks.size(); index++) {
        if (allTasks.get(index).getScriptPath().indexOf(name) != -1) {
            TimedTaskManager.removeTask(allTasks.get(index))
        }

    }
};
utils.getTimedTaskById = function (id) {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    return TimedTaskManager.getTimedTask(id);
};
utils.getAllTasksAsList = function () {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    return TimedTaskManager.getAllTasksAsList();
};
utils.notifyTaskScheduled = function (task) {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    TimedTaskManager.notifyTaskScheduled(task);
};
utils.updateTask = function (task) {
    let TimedTaskManager = org.autojs.autojs.timing.TimedTaskManager.getInstance();
    TimedTaskManager.updateTask(task);
};

function parseConfig(c) {
    let config = new com.stardust.autojs.execution.ExecutionConfig();
    config.delay = c.delay || 0;//
    config.interval = c.interval || 0;
    config.loopTimes = (c.loopTimes === undefined) ? 1 : c.loopTimes;
    return config;
}
utils.clickText = (txt) => {
    if (text(txt).exists()) {
        let a = text(txt).findOne().bounds();
        return click(a.centerX(), a.centerY());
    } else if (desc(txt).exists()) {
        let b = desc(txt).findOne().bounds();
        return click(b.centerX(), b.centerY());
    } else {
        return false;
    }
}
utils.clickTextMatches = (txt) => {
    if (textMatches(txt).exists()) {
        let a = textMatches(txt).findOne().bounds();
        return click(a.centerX(), a.centerY());
    } else if (descMatches(txt).exists()) {
        let b = descMatches(txt).findOne().bounds();
        return click(b.centerX(), b.centerY());
    } else {
        return false;
    }
}
utils.clickImage = (image) => {
    let point = images.findImage(images.captureScreen(), image);
    if (point) {
        return click(point.x + 5, point.y + 5);
    } else {
        return false;
    }
}
utils.clickImageForName = (imageName) => {
    let image = images.read("./res/" + imageName);
    if (image) {
        let point = images.findImage(images.captureScreen(), image);
        if (point) {
            return click(point.x + 5, point.y + 5);
        } else {
            return false;
        }
    }
    return false;
}
utils.imageWaitFor = (imageName) => {
    let image = images.read("./res/" + imageName);
    let point;
    while (1) {
        if (point = images.findImage(images.captureScreen(), image)) {
            return point;
        }
    }
    return null;
}
utils.clickImageWaitFor = (imageName) => {
    let image = images.read("./res/" + imageName);
    while (!utils.clickImage(image)) { }
}
/**
 * 裁剪图片,保存成 name.png(后四个参数,坐标点)
 */
utils.clipImage = function (name, x, y, x1, y1) {
    let clip = images.clip(images.captureScreen(), x, y, x1 - x, y1 - y);
    images.save(clip, "./res/" + name);
    console.log(engines.myEngine());
    clip.recycle();
    app.viewFile(engines.myEngine().cwd() + "/res/" + name)
}
/**
 * 通过最近任务 返回上一个app
 */
utils.backLastApp = function () {
    recents();
    var listV = id('overview_panel').findOne();
    if (listV.childCount() < 2) {
        home();
        console.log("后台只有一个应用");

    } else {
        listV.child(listV.childCount() - 2).click();
        console.log("切换到前一个应用");
    }
}
/**
 * 不能在主线程创建
 */
utils.showFloaty = function (x, y, w, h) {
    var rect = floaty.window(
        <frame id='a' w="*" h='*' alpha="0.2" bg='#ff00ff'>
        </frame>
    )
    rect.setPosition(x, y - 82)
    rect.setSize(w + 80, h);
    var x1, y1 = 0;//记录按键被按下时的触摸坐标
    var windowX1, windowY1, centerX;//记录按键被按下时的悬浮窗位置
    rect.a.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x1 = event.getRawX();
                y1 = event.getRawY();
                windowX1 = rect.getX();
                windowY1 = rect.getY();
                centerX = windowX1 + rect.getWidth() / 2;
                return true;
            case event.ACTION_MOVE:
                if (x1 < centerX) {
                    //移动手指时调整悬浮窗位置
                    tempx = windowX1 + (event.getRawX() - x1)
                    tempy = windowY1 + (event.getRawY() - y1)
                    rect.setPosition(tempx < 0 ? 0 : tempx, tempy < 0 ? 0 : tempy);
                } else {
                    log("移动x坐标:  ", event.getRawX(), windowX1)
                    rect.setSize((event.getRawX() - windowX1 + 72),
                        (event.getRawY() - windowY1));
                }

                return true;
            case event.ACTION_UP:
                // box.x = rect.getX();
                // box.y = rect.getY() + 82;
                // box.w = rect.getWidth() - 80;
                // box.h = rect.getHeight() - 80;
                // log("抬起后box:  ", box.x, box.y, box.w, box.h);
                return true;
        }
        return true;
    });
    return rect;
}
utils.showDelayDialog = function (startFun, delaySec, jsName) {
    var sec = delaySec || 3;
    var sourceStr = engines.myEngine().getSource().toString();
    var js_name = jsName || sourceStr.slice(sourceStr.lastIndexOf('/') + 1);
    var content_text = sec + " 秒后运行[" + js_name.replace(".js", '') + "]任务";
    let dia = dialogs.build({
        //对话框标题
        title: "运行提示",
        //对话框内容
        content: content_text,
        //确定键内容
        positive: "立即开始",
        positiveColor: "#7b1fa2",
        //取消键内容
        negative: "放弃任务",
        negativeColor: "#ff3d00",
        //中性键内容
        neutral: "推迟运行",
        negativeColor: "#f57c00",
        canceledOnTouchOutside: false
    }).on("positive", () => { //立即开始
        sec = 0;
        log('立即开始')
        threads.start(function () {
            startFun();
            utils.endFun();
        })
    }).on("negative", () => { //放弃任务
        sec = 0;
        log('放弃任务')
        // exit();
    }).on("neutral", () => {//推迟运行
        sec = 0;
        // exit();
        delayDialog();
    }).show();

    while (sec > 0) {
        dia.setContent(content_text.replace(/\d+/, sec));
        sleep(1000);
        if (!--sec) {
            dia.dismiss();
            log('到点开始');
            startFun(true);
            utils.endFun();
        }
    }
}
function delayDialog() {
    let singleDia = dialogs.build({
        //对话框标题
        title: "设置任务推迟时间",
        items: ["1 min", "3 min", "5 min", "10 min", "30 min"],
        itemsSelectMode: "single",
        itemsSelectedIndex: 2,
        //确定键内容
        positive: "确定",
        positiveColor: "#7b1fa2",
        //取消键内容
        negative: "放弃任务",
        negativeColor: "#ff3d00",
        canceledOnTouchOutside: false
    }).on("single_choice", (index, item) => {
        console.log("选择的内容:==>" + index + item);
        let delayMinute = parseInt(item.slice(0, 2))
        let task = {
            path: engines.myEngine().getSource().toString(),
            timeMills: new Date().getTime() + delayMinute * 60 * 1000
        }
        utils.addDisposableTask(task);

    }).on("negative", () => {
        console.log("negative");
        // exit();
    }).show();
}
utils.ocrText = function (left, top, width, height, returnArray) {
    var start = new Date().getTime();
    left = left > 0 ? left : 0;
    top = top > 0 ? top : 0;
    var dw = DEVICE_WIDTH - (left + width);
    var dh = DEVICE_HEIGH - (top + height);
    if (dw < 0) {
        width += dw;
    }
    if (dw < 0) {
        height += dh;
    }

    let ocr = images.clip(images.captureScreen(), left, top, width, height);
    images.save(ocr, "./res/ocrImage.png");
    dur = new Date().getTime();
    // log("保存图片时间", a = dur - start)
    var url = http.postMultipart("http://d.aroot.cn/addons/yidu_tupian/core/index.php?mch_id=340&s=/api/user/uploadFile&path_name=flower_plant_mygj",
        {
            "file_upload": open('./res/ocrImage.png')
        }, {
        "headers": {
            "Connection": "Keep-Alive",
            "referer": "https://servicewechat.com/wx552b87a99d56e00a/6/page-frame.html",
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android ' + device.release + '; zh-cn; ' + device.model + ' Build/' + device.buildId + ') AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            "Content-Type": "multipart/form-data; boundary=1561019505328",
            "Content-Length": "15713",
            "Host": "d.aroot.cn"
        }
    }).body.json();
    dur1 = new Date().getTime();
    // log("上传图片时间", b = dur1 - dur)
    if (url.code == 0) {
        var result = http.get("http://d.aroot.cn/addons/yidu_tupian/core/index.php?mch_id=340&s=/api/Vision/get_word&path_url=" + url.info + "&scene=3", {
            "headers": {
                "charset": "utf-8",
                "referer": "https://servicewechat.com/wx552b87a99d56e00a/6/page-frame.html",
                'User-Agent': 'Mozilla/5.0 (Linux; U; Android ' + device.release + '; zh-cn; ' + device.model + ' Build/' + device.buildId + ') AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                "content-type": "application/x-www-form-urlencoded",
                "Host": "d.aroot.cn",
                "Connection": "Keep-Alive"
            }
        }).body.json();
        if (result.code == 0) {
            var text = '';
            var array = [];
            result.info.forEach(function (value) {
                text += value.source_text;
                array.push(value.source_text);
            })
            dur2 = new Date().getTime();
            // log("结束识别时间", c = dur2 - dur1)
            log("\n识别时间: ", dur2 - start, "\n识别结果: ", returnArray ? array : text)
            return returnArray ? array : text;
        }
        return null;
    } else {
        return null;
    }
}
utils.Baidu_OCR = function (left, top, width, height, returnArray) {
    var start = new Date().getTime();
    left = left > 0 ? left : 0;
    top = top > 0 ? top : 0;
    var dw = DEVICE_WIDTH - (left + width);
    var dh = DEVICE_HEIGH - (top + height);
    if (dw < 0) {
        width += dw;
    }
    if (dw < 0) {
        height += dh;
    }
    imag64 = images.toBase64(images.clip(images.captureScreen(), left, top, width, height));
    dur = new Date().getTime();
    log("获取图片时间", a = new Date().getTime() - start)

    access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;

    dur1 = new Date().getTime();
    log("获取token时间", b = dur1 - dur)

    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    res = http.post(url, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, image: imag64, image_type: "BASE64", language_type: "JAP" });
    array = JSON.parse(res.body.string()).words_result.map(val => val.words);
    dur2 = new Date().getTime();
    log("结束识别时间", c = dur2 - dur1)
    log("识别时间===", a + b + c)
    return returnArray ? array : array.jion('');
}
module.exports = utils;