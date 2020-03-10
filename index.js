// 通过拦截器 mock本地数据
let mockData = function() {
  let book = {
    name: "JavaScript高级程序设计",
    num: 1,
    id: 1
  };
  axios.interceptors.response.use(function(response) {
    let {
      config: { url, data, method }
    } = response;
    if (url === "/book/1" && method === "get") {
      debugger;
      response.data = book;
    } else if (url === "/book/1" && method === "put") {
      Object.assign(book, data);
      response.data = book;
    }
    return response;
  });
};

mockData();

// 绑定事件
let $view = $("#app");

$view.on("click", ".add", function() {
  let originNum = $(".num").text();
  let newNum = originNum - 0 + 1;
  $(".num").text(newNum);
});

$view.on("click", ".minus", function() {
  let originNum = $(".num").text();
  let newNum = originNum - 0 - 1;
  $(".num").text(newNum);
});

$view.on("click", ".clear", function() {
  $(".num").text(0);
});

// 请求数据，渲染页面
axios.get("/book/1").then(({ data }) => {
  let originHtml = $view.html();
  let newHtml = originHtml
    .replace("__name__", data.name)
    .replace("__num__", data.num);
  $view.html(newHtml);
});
