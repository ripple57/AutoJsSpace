let utils = require("./utils.js");
log("------------------------\n包名:", currentPackage(), "\n页面:", currentActivity(), "\n-------------------------------")
utils.init();
width = 780;
heigh = 900;
wStatus = true;
words = ''
w = floaty.window(
    <vertical bg="#901e90ff" w='{{width}}px' h='{{heigh}}px' padding='1'>
        <linear id='ques' bg="#90ffffff" w="*" padding='5 2' marginBottom='1'>
            <text textSize='11sp' text="搜索: " />
            <text id='words' textSize="11sp" textColor="#ff0000" layout_weight="1" maxLines="1" ellipsize="end" text='{{words}}' />
        </linear>
        <list id="list" w='*' h='*' layout_weight="1" bg="#90ffffff" >
            <vertical w='*' >
                <text bg="#90ffffff" padding='5 0' textSize="8sp" textColor="#ff0000" visibility="{{this.title ? 'visible' : 'gone'}}" text='{{this.title}}' />
                <linear bg="#90ffffff" w="*" visibility="{{this.status ? 'visible' : 'gone'}}">
                    <text id="sex" textSize="11sp" textColor="{{this.status=='1'?'#1e90ff':'#ff1493'}}" text="{{this.status=='1'?'男:':'女:'}}" />
                    <text id="huida" textSize="11sp" layout_weight="1" textColor="#929292" text="{{this.chatTitle}}" />
                    <text id='copy' text='复制' padding='1' marginRight='2' bg='#ffc201' layout_gravity="center" textSize='8sp'></text>
                </linear>
                <View w="*" h='2' visibility="{{this.showLine ? 'visible' : 'gone'}}" />
            </vertical>
        </list>
        <linear w="*" padding='2 2' marginTop='1'>
            <linear id='btns' layout_weight="1" paddingRight='3' >
                <text id='Bexit' text='退出' padding='2 0' margin='2 0' layout_weight="1" gravity="center" bg="#d6d7d7" h="25" textSize="12sp" />
                <text id='Bsearch1' text='内置' padding='2 0' margin='2 0' layout_weight="1" gravity="center" bg="#d6d7d7" h="25" textSize="12sp" />
                <text id='Bsearch2' text='搜索复制' padding='2 0' margin='2 0' layout_weight="1" gravity="center" bg="#d6d7d7" h="25" textSize="12sp" />
                <text id='Bsearch3' text='手动搜索' padding='2 0' margin='2 0' layout_weight="1" gravity="center" bg="#d6d7d7" h="25" textSize="12sp" />
                <text id='Bmin' text='最小化' padding='2 0' margin='2 0' layout_weight="1" gravity="center" bg="#d6d7d7" h="25" textSize="12sp" />
            </linear>
            <text id='Bsearch4' text=' 智能搜 ' padding='2 0' gravity="center" bg="#d6ffd7" h="25" textSize="12sp" textColor="#ff0000" />
        </linear>
    </vertical>
)
w.setPosition(100, 100);
w.exitOnClose();
var x = 0, y = 0;//记录按键被按下时的触摸坐标
var windowX, windowY;//记录按键被按下时的悬浮窗位置
w.Bexit.click(() => {
    exit()
});
w.Bsearch1.click(() => {
    // exit()
});
w.Bsearch2.click(() => {
    // exit()
});
w.Bsearch3.click(() => {
    // exit()
});
w.Bmin.click(() => {
    w.ques.visibility = 8;
    w.btns.visibility = 8;
    w.list.visibility = 8;
    w.setSize(212, 170);
    w.setPosition(w.getX() + 650, w.getY() + 800);
    wStatus = false;
});
w.Bsearch4.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = w.getX();
            windowY = w.getY();

            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            w.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            windowX = w.getX();
            windowY = w.getY();
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                if (!wStatus) {
                    w.ques.visibility = 0;
                    w.btns.visibility = 0;
                    w.list.visibility = 0;
                    w.setSize(width + 100, heigh + 100);
                    w.setPosition(windowX - 650, windowY - 800);
                    wStatus = true;
                }
                search();

            }
            return true;
    }
    return true;
});


function search() {
    threads.start(function () {
        datas = [];
        words = getWords();
        var res = http.get("http://lovetalk.51niucard.com/loveTalk/search?pageNo=1&words=" + words)
        // console.log(res.body.json.toString());

        items = res.body.json().data.filter(function (obj) {
            return !obj.hidden;
        })
        items.forEach(element => {
            if (element.title) {
                datas.push({ 'title': element.title })
            }
            datas = datas.concat(JSON.parse(element.content));
            datas.push({ 'showLine': true })
        });
        ui.run(() => {
            w.list.setDataSource(datas);
            w.list.on("item_bind", function (itemView, itemHolder) {
                itemView.copy.on("click", function () {
                    setText(itemView.huida.text());
                });
            })
        })
    })
}
function getWords() {
    
}
function dp2px(dp) {
    return Math.floor(dp * context.getResources().getDisplayMetrics().density + 0.5);
}
setInterval(() => {

}, 1000);
