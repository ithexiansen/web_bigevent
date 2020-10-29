$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  var form = layui.form;
  var layer = layui.layer;
  // 自定义表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    //检查两次密码是否一致
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd != value) {
        return "两次密码不一致";
      }
    },
  });
  // 注册事件
  $("#from_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://ajax.frontend.itheima.net /api/reguser",
      {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功请登录");
        // 模拟点击事件
        $("#link_login").click();
      }
    );
  });
  $("#from_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
