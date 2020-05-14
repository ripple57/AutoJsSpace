let utils = require("./utils.js");
utils.init();
var box = {
  "x": 0, "y": 0, "w": 0, "h": 0
}
var box_q = {
  "x": 0, "y": 0, "w": 0, "h": 0
}
var box_a = {
  "x": 0, "y": 0, "w": 0, "h": 0
}
var 搜索网址 = ["https://m.baidu.com/s?word=", "https://m.sogou.com/web/searchList.jsp?keyword=", "https://m.so.com/s?q=", "http://so.m.sm.cn/s?q="]
var yinQingIndex = 0;
var 题目 = '';
var tip = '请先选好问题区域,然后点击问题区域按钮后使用';
var rect_q, rect_a, rect;
auto();
requestScreenCapture();
xuanfuchuang()

function xiuGaiZuoBiao() {
  box.x = rect.getX();
  box.y = rect.getY() + 83;
  box.w = rect.getWidth() - 73;
  box.h = rect.getHeight() - 72;
}
function initRect() {
  rect.setPosition(100, 700 - 82)
  rect.setSize(800 + 80, 300);
  sleep(100)
  xiuGaiZuoBiao();
  log("初始化rect:  ", rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight());
  log("初始化box:  ", box.x, box.y, box.w, box.h);
}
function xuanfuchuang() {
  rect = floaty.window(
    <frame id='a' w="*" h='*' alpha="0.4" bg='#ff0000'>
    </frame>
  )
  initRect();
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
        xiuGaiZuoBiao()
        log("抬起后box:  ", box.x, box.y, box.w, box.h);
        return true;
    }
    return true;
  });

  w = floaty.window(
    <horizontal id="action" bg="#90251911" w="280" h="310" padding="2">

      <vertical id='qu' layout_weight="1" >
        <vertical>
          <text id="question_qu" bg="#40251911" color="#ff0000" textSize="10sp">{tip}</text>
        </vertical>
        <ScrollView id='answer_qu' visibility='gone' h="70" w="*" bg="#22251911" >
          <vertical>
            <vertical>
              <text id="baidu" color="#ffffffff" textSize="9sp"></text>
              <text id="sogou" color="#ffffffff" textSize="9sp"></text>
              <text id="s360" color="#ffffffff" textSize="9sp"></text>
              <text id="uc" color="#ffffffff" textSize="9sp"></text>
            </vertical>
          </vertical>
        </ScrollView>
        <vertical >
          <webview id="web" alpha="1" />
        </vertical>
      </vertical>
      <vertical w='auto'   >
        <button id="Bmin" text="小化" w="40" h="40" textSize="8sp" />
        <button id="shitu" text="截图搜索" w="40" h="60" textSize="8sp" />
        <button id="qiehuan" text="切换" w="40" h="40" textSize="8sp" />
        <button id="fanhui" text="返回" w="40" h="40" textSize="8sp" />
        <button id="ques" text="问题区域" color="#ff0000" w="40" h="40" textSize="8sp" />
        <button id="answer" text="答案区域" w="40" h="40" textSize="8sp" />
        <button id="tuichu" text="退出" w="40" h="40" textSize="8sp" />
      </vertical>
    </horizontal>
  );
  setInterval(() => { }, 1000);
  w.setPosition(100, 1000);

  w.ques.click(() => {
    threads.start(function name(params) {
      if (rect_q) {
        rect_q.close();
        rect_q = null;
      }
      if (rect.getWidth() != 0) {//正在选区
        ui.run(() => {
          w.ques.setTextColor(colors.parseColor("#000000"))
          w.question_qu.setTextColor(colors.parseColor("#00ff00"))
          w.question_qu.setText("问题区域已就绪,可以使用")
        })
        rect.setSize(0, 0);
        log("截图区域:  ", box.x, box.y, box.w, box.h);
        rect_q = floaty.rawWindow(
          <frame id='a' w="{{box.w}}px" h='{{box.h}}px' alpha="0.1" bg='#0000ff' />
        )
        rect_q.setPosition(box.x, box.y);
        rect_q.setTouchable(false);
        box_q = { "x": box.x, "y": box.y, "w": box.w, "h": box.h }
      } else {//没有选区
        ui.run(() => {
          w.ques.setTextColor(colors.parseColor("#ff0000"))
          w.question_qu.setTextColor(colors.parseColor("#ff0000"))
          w.question_qu.setText(tip)
        })
        initRect();
      }
    });


  });
  w.answer.click(() => {
    threads.start(function name(params) {
      if (rect_a) {
        rect_a.close();
        rect_a = null;
      }
      if (rect.getWidth() != 0) {//正在选区
        ui.run(() => {
          w.answer_qu.visibility = 0
        })
        rect.setSize(0, 0);
        log("截图区域:  ", box.x, box.y, box.w, box.h);
        rect_a = floaty.rawWindow(
          <frame id='a' w="{{box.w}}px" h='{{box.h}}px' alpha="0.1" bg='#00FF00' />
        )
        rect_a.setPosition(box.x, box.y);
        rect_a.setTouchable(false);
        box_a = { "x": box.x, "y": box.y, "w": box.w, "h": box.h }
      } else {//没有选区
        ui.run(() => {
          w.answer_qu.visibility = 8
        })
        initRect();
      }
    });

  });
  w.qiehuan.click(() => {
    if (yinQingIndex == 搜索网址.length - 1) {
      yinQingIndex = 0;
    } else {
      yinQingIndex++;
    }
    webSearch(题目);
  });
  w.fanhui.click(() => {
    w.web.goBack();
  });
  w.shitu.click(() => {
    shitu()
  });

  w.tuichu.click(() => {
    toast("退出");
    w.close();
    exit()
  });

  var x = 0, y = 0;//记录按键被按下时的触摸坐标
  var windowX, windowY;//记录按键被按下时的悬浮窗位置
  var downTime;//记录按键被按下的时间以便判断长按等动作
  ui.run(function () {
    windowWidth = w.getWidth();
    windowHeight = w.getHeight();

    settings = w.web.getSettings()
    settings.setSupportZoom(true);
    settings.setUseWideViewPort(true);
    settings.setTextZoom(40); //设置字体
  }
  );
  w.Bmin.setOnTouchListener(function (view, event) {
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
          if (w.Bmin.text() == "小化") {
            w.Bmin.setText("搜索");
            w.qu.visibility = 8;
            w.setSize(190, 190);
            w.setPosition(windowX + dp2px(240), windowY);
          } else {
            w.Bmin.setText("识别中");
            shitu()
            ui.post(function name(params) {
              w.Bmin.setText("小化");
              w.qu.visibility = 0;
              w.setSize(windowWidth, windowHeight);
              w.setPosition(windowX - dp2px(240), windowY);
            }, 500)
          }
        }
        return true;
    }
    return true;
  });
}

function webSearch(question) {
  ui.run(function () {
    w.web.loadUrl(搜索网址[yinQingIndex] + question);//设置网址
  });
}

function shitu() {
  if (!rect_q) {//没有划定问题区域
    toast("请先划定问题区域,再进行搜索!")
    return;
  }
  threads.start(function () {
    题目 = getQuestion() || "";
    qs = "题目：" + 题目;
    if (rect_a) {//划定了答案选项区域
      daan = getSelectAnswer();
      if (daan == null || daan.length == 0) {
        return;
      }
      qs += '\n选项';
      for (var i = 0; i < daan.length; i++) {
        qs += ' ' + (i + 1) + '.' + daan[i];
      }
      引擎 = ["百度", "搜狗", "360", "UC"]
      for (var a = 0; a < 4; a++) {
        threads.start(function () {
          搜索(搜索网址[a] + 题目, 引擎[a])
        });
        sleep(50)
      }
    }
    ui.run(function () {
      w.question_qu.setText(qs);
    });
    webSearch(题目);
  });
}
// //获取dp转px值
// var scale = context.getResources().getDisplayMetrics().density;
//DP转PX
function dp2px(dp) {
  return Math.floor(dp * context.getResources().getDisplayMetrics().density + 0.5);
}
//PX转DP
function px2dp(px) {
  return Math.floor(px / context.getResources().getDisplayMetrics().density + 0.5);
}

function 搜索(网址, 引擎) {
  var 答案 = 引擎 + ":";
  var 选项个数 = daan.length;
  var 参考答案 = " | 参考:";
  var 网页 = http.get(网址);
  var 网页内容 = 网页.body.string()

  var zjda = chuxiancishu(网页内容, "最佳答案", 100)
  if (zjda) {
    答案 += "最佳:"
    var list1 = [];
    for (var a = 0; a < 选项个数; a++) {
      var 选项计数 = chuxiancishu(zjda.join(""), daan[a]).length
      if (选项计数) {
        list1.push([选项计数, daan[a]]);
      }
    }
    list1.sort(function (x, y) {
      return y[0] - x[0];
    });
    for (var v of list1) {
      答案 += "<font color='#00ff00'>" + v[1] + "</font>" + v[0] + ">"
    }
  }

  var list2 = [];
  for (var a = 0; a < 选项个数; a++) {
    var 选项计数 = chuxiancishu(网页内容, daan[a]).length
    if (选项计数) {
      list2.push([选项计数, daan[a]]);
    }
  }
  list2.sort(function (x, y) {
    return y[0] - x[0];
  });
  for (var v of list2) {
    参考答案 += "<font color='#00ff00'>" + v[1] + "</font>" + v[0] + ">"
  }
  log(答案 + 参考答案)
  显示答案(引擎, 答案 + 参考答案)
  return 答案 + 参考答案
}

function 显示答案(引擎, 答案) {
  ui.run(function () {
    if (引擎 == "百度") {
      w.baidu.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "搜狗") {
      w.sogou.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "360") {
      w.s360.setText(android.text.Html.fromHtml(答案))
    } else if (引擎 == "UC") {
      w.uc.setText(android.text.Html.fromHtml(答案))
    }
  });
}

function chuxiancishu(str, ci, zishu) {
  if (!zishu) {
    zishu = ci.length
  }
  var a = 0
  var g = 0
  var daan = []
  do {
    a = str.indexOf(ci, a + 1);
    if (a > -1) {
      daan[g] = str.substr(a, zishu)
      g++
    }
  } while (a > -1)
  if (daan.length == 0) {
    return false
  } else {
    return daan
  }
}

/**
 * 获得题目
 */
function getQuestion() {
  str = utils.ocrText(box_q.x, box_q.y, box_q.w, box_q.h)
  log('识别的结果:', str)
  // var j=id("tv_question_content").findOne(3000).text();
  // var d=id("tv_option_text").className("android.widget.TextView")
  // var a=d.findOnce(0).text()
  // var b=d.findOnce(1).text()
  // var c=d.findOnce(2).text()
  // return { "title": j, "a": a, "b": b, "c": c, }
  // return { "title": '《新世纪福音战士》中的凌波丽的配音是谁？', "a": '三石琴乃', "b": '岛本须美', "c": '林原惠', }
  // return { "title": str, "a": '多少楼台烟波中', "b": '多少楼台风雨中', "c": '多少楼台烟雨中', }
  return str;

}
function getSelectAnswer() {
  array = utils.ocrText(box_a.x, box_a.y, box_a.w, box_a.h, true);
  array = array.map(val => filter(val));
  return array;
}
/**
 * 文字过滤
 */
function filter(text) {
  text = text.replace(/(^[ABCD\d]?[、\.]?)/, '');//过滤标题序号
  text = text.replace(/(\n)/g, '');//过滤换行
  return text;
}

