device.keepScreenOn();
var autoAddPassengers = false;//是否需要自动添加乘车人,如已经手动添加,可改为false,加快速度
var autoRefresh = false;//是否需要自动刷新
var trainNo = "k961";//要抢车票的车次;
var ticketType = ["硬卧"];//要抢的车票类型
var passengers = ["黄少波"];//乘车人



var ticketTypes = ["一等", "二等", "软卧", "硬卧", "硬座", "无座"];
var GTypes = ["商务", "一等", "二等"];
var KTypes = ["软卧", "硬卧", "硬座", "无座"];

// waitForActivity("com.alipay.mobile.nebulacore.ui.H5Activity");
desc("前一天").waitFor();
trainNo = trainNo.toUpperCase();
var trainNoView = desc(trainNo).findOne();
console.log(trainNoView);

var ticketNumParent;
for (var i = 11; i < 14; i++) {
    ticketNumParent = trainNoView.parent().child(trainNoView.indexInParent() + i);
    if (ticketNumParent.childCount() != 0) break;
}
console.log("几个等级:"+ticketNumParent.childCount());

if (autoRefresh) {
    while (true) {//循环滑动刷新页面,等待开售后跳出循环
        if (!textContains("加载中").exists()) {
            if (ticketNumParent.child(1).desc().indexOf("*") > 0) {//未开售
                log("滑动一次")
                swipe(500, 800, 500, 1500, 300);
                sleep(1000)
            } else {
                toastLog("开始售票,退出刷新");
                break;
            }
        }
    }
}




var i = 0;
var des;
for (var index = 0; index < ticketNumParent.childCount(); index++) {
    des = ticketNumParent.child(index).desc();
    console.log(des);
    
    if (des.slice(0, 2) == ticketType[i]) {//找到自己需要的几等座
        var endChar = des.slice(-1);
        if (endChar == "张" || endChar == "有") {//有票
            log("点击了" + des + trainNoView.click());
            break;
        } else {//无票,换下一个类型
            i++;
            if (i >= ticketType.length) {
                toastLog("想要抢的票已售完!");
                exit();
                break;
            }
        }
    };
}

if (autoAddPassengers) {
    passengers.forEach((passenger) => {
        console.log("等待确认订单页面");
        text("确认订单").waitFor();//确保进入选座页面
        console.log("进入了确认订单页面");
        
        if (!desc(passenger).exists()) {//乘车人未选择
            log(passenger + "未添加");
            desc("选择乘客").findOne().click();//点击选择乘客,进入乘车人列表页面
            if (desc(passenger).findOne().click()) {//在乘车人列表页面,点击乘车人
                log("添加了:" + passenger)
                log("点击完成按钮:"+desc("完成").findOne().click());//点击完成按钮,返回提交订单页面
            };

        }
    });
}
console.log("准备提交订单了");

exit();
// while (true) {//循环点击提交按钮
//     if (text("未完成").exists()) exit();//提交成功后退出
//     log("提交一次:" + desc("提交订单").findOne().click());//点击提交按钮
// };