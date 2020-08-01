let baseURL = {
  requestUrl: '', //请求地址
  loginUrl: '', //跳往登陆
  backUrl: '', //跳往后台管理地址
  sockUrl: '' //websocket URL
}

if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    baseURL.requestUrl = 'http://ecsapi.ecgtool.com'
    baseURL.loginUrl = 'https://www.eccang.com/'
    baseURL.backUrl = 'http://ecs-admin.ecgtool.com'
    baseURL.sockUrl = 'ws://ecsapi.ecgtool.com:9091'
  } else if (process.env.VUE_APP_FLAG === 'test') {
    //test 测试环境
    baseURL.requestUrl = 'http://ecsapi-test.ecgtool.com'
    baseURL.loginUrl = 'http://eos-test.ecgtool.com/#/entran/login'
    baseURL.backUrl = 'http://ecstest-admin.ecgtool.com/'
    baseURL.sockUrl = 'ws://ecsapi-test.ecgtool.com:9090'
  } else if (process.env.VUE_APP_FLAG === 'intr') {
    //local 内网环境
    baseURL.requestUrl = 'http://172.16.0.6:8081'
    baseURL.loginUrl = 'http://eos-test.ecgtool.com/#/entran/login'
    baseURL.backUrl = 'http://ecstest-admin.ecgtool.com/'
    baseURL.sockUrl = 'ws://172.16.0.117:9090'
  }
} else {
  //dev 开发环境
  baseURL.loginUrl = 'http://eos-test.ecgtool.com/#/entran/login'
  baseURL.backUrl = 'http://ecstest-admin.ecgtool.com/'

  baseURL.requestUrl = 'http://172.16.20.52:8081'
  baseURL.sockUrl = 'ws://172.16.20.38:9090'
}

export default baseURL
