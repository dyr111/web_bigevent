$(function() {
    //调用getUserInfo() 获取用户的基本资料
    getUserInfo();

    //点击按钮实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //console.log('okk');
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' },
            function(index) {

                //1.清空本地存储的token

                localStorage.removeItem('token')

                //2.重新跳转到登录页面

                location.href = '/login.html'

                //关闭询问框
                layer.close(index)
            })
    })
})


//获取用户的基本资料
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },

        // //不论成功还是失败，最终都会调用 complete 回调函数
        // //该回调函数目的：不登录永远无法跳转后台主页
        // complete: function(res) {
        //     //在complete函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据


        //     // console.log('执行了回调函数');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.清空本地存储的token

        //         localStorage.removeItem('token')

        //         //2.重新跳转到登录页面

        //         location.href = '/login.html'

        //     }
        // }
    })
}



//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
        //2.设置欢迎的文本
        //console.log(name);
    $('#welcome').html('欢迎' + name)
        //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}