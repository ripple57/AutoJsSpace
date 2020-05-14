
let utils = require("./utils.js");
utils.init();
let lastChat, chat, friend;

initChat();
setInterval(() => {
    autoChat();
}, 1000);
function initChat() {
    // if (!id("com.tencent.mm:id/lt").exists()) return;
    friend = id("com.tencent.mm:id/lt").findOne().text();
    let other = id("com.tencent.mm:id/pq").depth(13).find();
    lastChat = other.get(other.size() - 1).contentDescription;
    console.log("初始化机器人" + lastChat);

}
function autoChat() {
    if (!id("com.tencent.mm:id/aqd").className("ScrollView").exists() || friend != id("com.tencent.mm:id/lt").findOne().text()) return;
    let other = id("com.tencent.mm:id/pq").depth(13).find();
    chat = other.get(other.size() - 1).contentDescription;
    // log("chat" + chat + "lastChat" + lastChat);
    if (chat.toString().match(/(停止|关闭|退出)(机器人|自动回复)/)||chat.toString()=="自动回复") {
        home();
        utils.stopScript("机器人",true);
    }
    if (chat.toString() == lastChat) {
        // console.log("相等");
        return;
    }
    // console.log("不相等");
    lastChat = chat;
    let input = getAnswer(chat);
    if (input) {
        setText(input);
        className("Button").text("发送").findOne().click();
    }
}

function getAnswer(text) {
    var url = "http://www.tuling123.com/openapi/api";
    r = http.postJson(url, {
        key: "65458a5df537443b89b31f1c03202a80",
        info: text,
        userid: "156",
    });
    var b = r.body.json();
    if (b.code == "100000") {
        return b.text;
    } else {
        return null;
    }
}
