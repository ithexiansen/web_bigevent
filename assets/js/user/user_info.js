$(function () {
  var form = layui.form;

  // 表单验证
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1-6个字符之间！";
      }
    },
  });
  initUserInfo();

  // 初始化表单信息
  function initUserInfo() {
    var form = layui.form;
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        // console.log("123123", res.data);
        form.val("formUserInfo", res.data);
      },
    });
  }
  // 重置按钮
  $("#btnReset").on("click", function (e) {
    //  阻止表单重置事件
    e.preventDefault();
    initUserInfo();
  });
  // 监听表单事件
  $(".layui-form").on("submit", function (e) {
    //  阻止表单提交事件
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败！");
        }
        layer.msg("更新用户信息成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
