// 每次调用$.post()或$.get()或$.ajax()时先调用ajaxPrefilter函数，用于获取给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的ajax请求前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})