let utils = require("./utils.js");
utils.init();

utils.autoStart(start,0)
// start();
function start(flag) {
    
    if (!requestScreenCapture(false)) {
        toastLog("请求截图失败");
        exit();
    }

    log("打开星星球界面");
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=66666782"
    });
    waitForActivity("com.alipay.mobile.nebulax.integration.mpaas.activity.NebulaActivity$Main");
    log("进入星星球成功");
    sleep(2000);

    var antManor = new AntManor();
    antManor.play();
    sleep(10000)//等待结算宝箱
    back();
}

function AntManor() {
    this.colors = ["#FF4C4C", "#4E86FF", '#ffd84c'];
    this.find_time = 1000;
    this.needScore = 200;

    this.play = function () {
        var len = this.colors.length;
        var baseline = device.height * 0.9 | 0;
        var min_height = baseline * 0.3 | 0;

        // 发球
        while (1) {
            if (point = this.findColorPoint(len)) {
                click(point.x, point.y);
                log("发球成功")
                break;
            }
        }

        while (1) {
            var point = this.findColorPoint(len);
            if (point) {
                // var x = point.x;
                // var y = point.y;
                // if (min_height <= point.y && point.y <= baseline)
                //     click(point.x, baseline);
                if (baseline - point.y > 200) {
                    click(point.x, baseline);
                } else {
                    click(point.x, baseline + 100);
                    console.log("补救一次:", point.x, baseline + 100);
                }
                var ui = idEndsWith('game-score-text');
                if (ui.exists() && parseInt(ui.findOne().text()) >= this.needScore) {
                    break;
                }
            } else {
                console.log("没有找到小球位置");
                click('再来一局');
            }

        }
    };

    this.findColorPoint = function (len) {
        var wait_time = 100;
        for (var time = 0; time < this.find_time; time += wait_time) {
            var capture = captureScreen();
            if (!capture) {
                capture = captureScreen()
                log("截图失败了一次")
            }
            for (var i = 0; i < len; i++) {
                var point = findColorEquals(capture, this.colors[i],0,0);
                if (point !== null) {
                    return point;
                }
            }
        }

        return null;
    };
}