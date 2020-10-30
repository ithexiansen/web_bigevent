$(function () {
  getUserInfo();
  $("#btnLoginout").on("click", function () {
    //弹出退出确认框
    var layer = layui.layer;
    layer.confirm("确认退出登录？", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      // 清空本地存储
      localStorage.removeItem("token");
      // 返回登录页面
      location.href = "/login.html";
      layer.close(index);
    });
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("请求失败");
      }
      //调用 renderAvatar 渲染页面
      renderAvatar(res.data);
    },
    // 不论是成功还失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     //强制清空token
    //     localStorage.removeItem("token");
    //     //强制跳转到login页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}
// 渲染函数
function renderAvatar(user) {
  console.log(user);
  //获取用户名称
  var name = user.nickname || user.username;
  //设置欢迎的文本
  $("#welcome").html("欢迎&nbsp:&nbsp" + name);
  //按需渲染用户的头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
