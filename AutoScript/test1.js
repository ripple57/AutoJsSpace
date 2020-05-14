
let utils = require("./utils.js");
log("------------------------\n包名:", currentPackage(), "\n页面:", currentActivity(), "\n-------------------------------")
// utils.init();
// device.keepScreenOn()
// var rect = floaty.window(
//     <frame id='a' w="*" h='*' alpha="0.2" bg='#ff00ff'>
//     </frame>
// )
// rect.setPosition(500, 500)
// rect.setSize(100, 100);
// utils.showFloaty(200,500,50,50)
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};

// utils.printViewList()
// // console.log(utils.pr);
// setInterval(()=>{
//     console.log(click("夜之乡思头像"));
// },1000) //cfff60  cefc92  d0fe93 d0fe84 cafb7b c6f256
// et = className("EditText").findOne(1000) 
// et = textMatches(/\S*(验证码|随机码|校验码)\S*/).className("EditText").findOne(1000)
var a = 0;
var b = -1||5;
console.log(b )