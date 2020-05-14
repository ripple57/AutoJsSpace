"ui";
// var list = files.listDir(files.cwd());
// var jsFiles = list.filter((file)=>files.getExtension(file)=="js");
// console.log(files.path("./GetScore.js" ));
var path, time;
__global__ = typeof __global__ === "undefined" ? this : __global__;
let timers = require("./Modules/__timers__pro_v37")(runtime, __global__);
var scriptsPath = "/sdcard/脚本/";
if (!files.exists(scriptsPath)) {
    scriptsPath = "/sdcard/Scripts/";
}
var scriptFiles = files.listDir(scriptsPath, function (name) {
    return name.endsWith(".js") && name != "设置定时任务.js";
});
dialogs.singleChoice("请选择定时任务", scriptFiles).then(i => {
    path = files.join(scriptsPath, scriptFiles[i]);
    if(i<0)exit();
    return scriptFiles[i];
}).then(o => {
    ui.layout(
        <vertical padding="16">
            <text id="title" text="滑动时间选择" textColor="black" textSize="25sp" marginTop="16" />
            <timepicker id="timePicker" timePickerMode="spinner" />
            <horizontal gravity="center_horizontal" marginBottom="20">
                <text text="已选择: " />
                <text id="time1" text="" />
            </horizontal>
            <horizontal gravity="center_horizontal">
                <button id="back" text="返回" marginRight="15" />
                <button id="confirm" text="确认" marginLeft="15" />
            </horizontal>
        </vertical>
    );
    ui.title.setText("设置"+o+"的运行时间");
    ui.timePicker.setIs24HourView(true);
    ui.time1.setText(setTimeStr());
    ui.timePicker.setOnTimeChangedListener(setTimeStr);
    ui.back.on("click", (click) => {
        exit();
    });
    ui.confirm.on("click", (checked) => {
        time = ui.time1.getText();
        var task = timers.addDailyTask({
            path: path,
            time: ui.time1.getText()
        });
        if (task) {
            toast("设置成功");
            exit();
        };
    });
});

function setTimeStr() {
    var minute = ui.timePicker.getMinute();
    var showTime = ui.timePicker.getHour() + ":" + (minute<10?("0"+minute):minute);
    ui.time1.setText(showTime);
    return showTime;
}




