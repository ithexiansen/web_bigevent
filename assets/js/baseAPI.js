$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 挂载全局 complete 回调函数事件
  options.complete = function (res) {
    console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //强制清空token
      localStorage.removeItem("token");
      //强制跳转到login页面
      location.href = "/login.html";
    }
  };
});
