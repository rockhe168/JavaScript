define(function (require, exports, module) {
    alert();
    var $ = require('./js/lib/jquery');
    var data = require('./js/app/firstDemo/json/data');
    var css = require("./css/style.css");

    $(".author").html(data.authro);
    $(".blog").attr("href",data.blog);
});