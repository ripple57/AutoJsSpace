auto.waitFor();

importClass(android.graphics.Color);
//记录按键被按下时的触摸坐标
var x = 0, y = 0;
var sellPosition = -1;
//记录按键被按下时的悬浮窗位置
var windowX, windowY, window;
//记录按键被按下的时间以便判断长按等动作
var downTime;
var options = ["复活甲", "名刀", "辉月", "血魔", "炽热", "自定义"];
var storage = storages.create("auto_change");
var uiType = storage.get("uiType", 0);


window = floaty.window(
    <horizontal id="flo" w="auto" h="auto" bg="#550062" gravity="center">
        <horizontal id="h1" gravity="center" visibility="visible">
            <vertical >
                <horizontal id="sell" w="*" padding="5" bg="#7700ffff" >
                    <text textColor="black" >卖: </text>
                    <text id="sell_text" w="*" text="复活甲" gravity="center" />
                </horizontal>
                <horizontal id="buy" w="*" padding="5" bg="#77ff00ff">
                    <text textColor="black" >买:</text>
                    <text id="buy_text" w="*" text="名刀" gravity="center" />
                </horizontal>
            </vertical>
            <frame id="change" w="35" h="35" margin="5" alpha="0.5"  >
                <img w="*" h="*" src="#40a5f3" circle="true" />
                <img w="29" h="29" src="@drawable/ic_play_arrow_black_48dp" tint="#ffffff" margin="3" />
            </frame>
        </horizontal>
        <frame id="simpleChange" w="35" h="35" alpha="0.5" visibility="visible" >
            <img w="*" h="*" src="#ee534f" circle="true" />
            <img w="*" h="*" src="file:///sdcard/脚本/Images/change.png" tint="#00ff00" />
        </frame>
    </horizontal>
);
window.exitOnClose();
initListener();
updateFloaty(uiType);

setInterval(() => {
}, 1000);


//初始化监听
function initListener() {
    window.sell.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                log("手指down")
                return true;
            case event.ACTION_MOVE:
                //按下的时间
                let changeTime = new Date().getTime() - downTime;
                console.log(changeTime);
                if (changeTime > 5000) {////5秒判断为超长按，关闭脚本
                    exit();
                } else if (changeTime > 4000) {//即将关闭
                    window.flo.setBackgroundColor(Color.parseColor("#77ff0000"));
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                } else if (changeTime > 1000) {//1秒判断为长按，移动脚本
                    window.flo.setBackgroundColor(Color.parseColor("#77555555"));
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    sellOnClick();
                }
                window.flo.setBackgroundColor(Color.TRANSPARENT);
                log("手指up")
                return true;
        }
        return true;
    });
    window.buy.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                log("手指down")
                return true;
            case event.ACTION_MOVE:
                //按下的时间
                let changeTime = new Date().getTime() - downTime;
                console.log(changeTime);
                if (changeTime > 5000) {////5秒判断为超长按，关闭脚本
                    exit();
                } else if (changeTime > 4000) {//即将关闭
                    window.flo.setBackgroundColor(Color.parseColor("#77ff0000"));
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                } else if (changeTime > 1000) {//1秒判断为长按，移动脚本
                    window.flo.setBackgroundColor(Color.parseColor("#77555555"));
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                }
                return true;
            case event.ACTION_UP:
                // 手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    buyOnClick();
                }
                window.flo.setBackgroundColor(Color.TRANSPARENT);
                log("手指up")
                return true;
        }
        return true;
    });
    // window.flo.longClick(() => {
    //     window.setAdjustEnabled(!window.isAdjustEnabled());
    //     return true;
    // });
    window.change.click(() => {
        log("自动换");
        threads.start(function () {
            if (currentPackage() != "com.tencent.tmgp.sgame") return;
            autoChange(window.sell_text.getText(), window.buy_text.getText());
        })
    });
    window.simpleChange.click(() => {
        log("预购换");
        threads.start(function () {
            if (currentPackage() != "com.tencent.tmgp.sgame") return;
            simpleChange();
        })
    });
    window.change.longClick(() => {
        console.log("change.longClick" + uiType);
        selectShowUI();
        return true;
    });
    window.simpleChange.longClick(() => {
        console.log("simpleChange.longClick" + uiType);
        if (uiType == 2) {
            window.setAdjustEnabled(!window.isAdjustEnabled());
        } else {
            selectShowUI();
        }
        return true;
    });
}
//选择悬浮框样式
function selectShowUI() {
    dialogs.select("请选择浮窗模式", ["全部显示", "智能换装", "预购换装"])
        .then(i => {
            updateFloaty(i)
        });
}

function sellOnClick() {
    dialogs.select("请选择要卖的装备", options)
        .then(i => {
            if (i == 5) {
                var op = ["第1件", "第2件", "第3件", "第4件", "第5件", "第6件",]
                dialogs.select("您要卖第几件装备?", op)
                    .then(i => {
                        window.sell_text.setText(op[i]);
                        sellPosition = -1;
                    });
            } else if (i >= 0) {
                window.sell_text.setText(options[i]);
                sellPosition = -1;
            }
        });
}
function buyOnClick() {
    dialogs.select("请选择要买的装备", options)
        .then(i => {
            if (i == 5) {
                dialogs.rawInput("请输入要买装备的位置(1-7)", "126").then(position => {
                    window.buy_text.setText(position);
                });
            } else if (i >= 0) {
                window.buy_text.setText(options[i]);
            }
        });
}
//更新悬浮框样式
function updateFloaty(uiType) {
    console.log(threads.currentThread() + "0000555");
    if (uiType < 0) {
        return;
    }
    threads.start(function () {
        storage.put("uiType", uiType);
        if (uiType == 0 || uiType == 1) {
            if (!requestScreenCapture()) {
                toastLog("请求截图失败");
                exit();
            }
        }
    });

    console.log(threads.currentThread() + "111111" + uiType);

    ui.run(() => {
        console.log(threads.currentThread() + "52222");
        switch (uiType) {
            case 0:
                //0:visible||4:inVisible||8:gone
                window.simpleChange.setVisibility(0);
                window.h1.setVisibility(0);
                break;
            case 1:
                window.simpleChange.setVisibility(8);
                window.h1.setVisibility(0);
                break;
            case 2:
                window.simpleChange.setVisibility(0);
                window.h1.setVisibility(8);
                break;
            default:
                break;
        }
    });
}
//智能换装
function autoChange(sellName, buyName) {
    // click(150, 474);//左侧出装  960-780
    click(2180, 60);//右侧出装
    sleep(150);
    var index = sellPosition > 0 ? sellPosition : sellName.slice(1, 2);
    if (/\d/.test(index)) {//是第几个 780 940
        sellPosition = index;
        click(600 + index * 180, 940);//点击sell图标
        sleep(50);
        click(1957, 860);//点击出售
        autoBuy(buyName)
    } else {//装备名称
        var sell = images.read("/sdcard/脚本/Images/" + sellName + ".png");
        var p = images.findImageInRegion(images.captureScreen(), sell, 700, 870);
        if (p != null) {
            for (var i = 6; i > 0; i--) {
                if (p.x > 490 + i * 180) {
                    sellPosition = i;
                    break;
                }
            }
            click(p.x + 40, p.y + 40);//点击sell图标
            sleep(50);
            click(1957, 860);//点击出售
            autoBuy(buyName);
        } else {
            click(2000, 100)//关闭按钮
            toastLog("没有找到装备:" + sellName);
        }
        sell.recycle();
    }
};
//
function autoBuy(buyName) {
    var buyType, buyRaw, buyColumn, next;
    if (buyName == "复活甲") {//复活甲
        buyType = 3;
        buyRaw = 3;
        buyColumn = 7;
        next = "名刀";
    } else if (buyName == "名刀") {
        buyType = 1;
        buyRaw = 2;
        buyColumn = 6;
        next = "辉月";
    } else if (buyName == "辉月") {
        buyType = 2;
        buyRaw = 5;
        buyColumn = 3;
        next = "炽热";
    } else if (buyName == "血魔") {
        buyType = 3;
        buyRaw = 2;
        buyColumn = 7;
        next = "332";
    } else if (buyName == "炽热") {
        buyType = 2;
        buyRaw = 2;
        buyColumn = 6;
        next = "名刀";
    } else if (/[1-6]/.test(buyName[0]) && /[1-5]/.test(buyName[1]) && /[1-7]/.test(buyName[2])) {
        buyType = buyName[0];
        buyRaw = buyName[1];
        buyColumn = buyName[2];
        next = "名刀";
    } else {
        toastLog("购买的装备,输入不合规");
        click(2000, 100)//关闭按钮
        return;
    }
    console.log(buyType, buyRaw, buyColumn);

    switch (buyType) {
        case 1://攻击(360,380) 
            console.log("攻击" + click(360, 380));
            break;
        case 2://法术(360,500)
            // click(360, 500)
            console.log("法术" + click(360, 500));
            break;
        case 3://防御(360,620)
            // click(360, 620)
            console.log("防御" + click(360, 620));
            break;
        case 4://移动(360,740)
            // click(360, 740);
            console.log("移动" + click(360, 740));
            break;
        case 5://打野(360,860)
            // click(360, 860)
            console.log("打野" + click(360, 860));
            break;
        case 6://辅助(360,960)
            // click(360, 960);
            console.log("辅助" + click(360, 960));
            break;
    }
    sleep(100);
    //第1行,第一列坐标点[1,1]=>(660,155)  位置变化x,y =>  162 
    click(660 + (buyColumn - 1) * 162, 155 + (buyRaw - 1) * 162);//点击要买的装备图标
    sleep(50)
    click(1972, 953);//点击购买
    click(2000, 100)//关闭按钮
    ui.run(() => {
        window.sell_text.setText(buyName);
        window.buy_text.setText(next);
    });
}
// 预购换装
function simpleChange() {
    log("出装:" + click(2180, 60));//右侧出装
    sleep(150);
    log("出售:" + click(1957, 860));//出售
    log("关闭按钮:" + click(2000, 100))//关闭按钮
    sleep(150);
    log("预购装备:" + click(2180, 166))//预购装备
}