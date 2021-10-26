// 每次调用$.post()或$.get()或$.ajax()时先调用ajaxPrefilter函数，用于获取给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的ajax请求前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)

    //统一为有权限的接口 设置 headers请求头
    if (options.url.indexOf('/my/') !== 1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete回调函数
    options.complete = function(res) {
        //在complete函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据


        // console.log('执行了回调函数');
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.清空本地存储的token

            localStorage.removeItem('token')

            //2.重新跳转到登录页面

            location.href = '/login.html'

        }
    }
})