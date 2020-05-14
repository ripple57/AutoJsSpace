
function 从平台获取手机号码() {
  var 返回代码对照表 = {
    1001: '参数token不能为空',
    1002: '参数action不能为空',
    1003: '参数action错误',
    1004: 'token失效',
    1005: '用户名或密码错误',
    1006: '用户名不能为空',
    1007: '密码不能为空',
    1008: '账户余额不足',
    1009: '账户被禁用',
    1010: '参数错误',
    1011: '账户待审核',
    1012: '登录数达到上限',
    2001: '参数itemid不能为空',
    2002: '项目不存在',
    2003: '项目未启用',
    2004: '暂时没有可用的号码',
    2005: '获取号码数量已达到上限',
    2006: '参数mobile不能为空',
    2007: '号码已被释放',
    2008: '号码已离线',
    2009: '发送内容不能为空',
    2010: '号码正在使用中',
    3001: '尚未收到短信',
    3002: '等待发送',
    3003: '正在发送',
    3004: '发送失败',
    3005: '订单不存在',
    3006: '专属通道不存在',
    3007: '专属通道未启用',
    3008: '专属通道密码与项目不匹配',
    9001: '系统错误',
    9002: '系统异常',
    9003: '系统繁忙'
  }

  var 项目编号 = 配置文件内容.项目编号
  var TOKEN = 配置文件内容.TOKEN
  var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=' + TOKEN + '&itemid=' + 项目编号 + '&excludeno=170.171.180.198'
  var r = http.get(baseUrl);
  log("从平台获取手机号码code = " + r.statusCode);
  var result = r.body.string()
  log("从平台获取手机号码html = " + result);
  if (result.indexOf('success') != -1) {
    result = result.split('|');
    var 手机号码 = result[1]
    log('手机号码=', 手机号码)
    return 手机号码
  } else {
    log(返回代码对照表[result])
    log('从平台获取手机号码异常,请检查网络或者Token是否失效,脚本停止')
    exit()
  }
}
从平台获取手机号码()
