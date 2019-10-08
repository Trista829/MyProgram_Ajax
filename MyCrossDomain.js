function myAjax(obj) {
    // 设置默认值
    var defaults = {
        type: "get",
        url: "#",
        data: {},
        async: true,
        success: function (data) {
            console.log(data);
        },
        jsonp: "callback",
        jsonpCallback:"hehe"
    };
    for (var key in obj) {
        defaults[key] = obj[key];
    }

    var params = "";
    for (var attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
        defaults.url += "?" + params;
    }
    defaults.url += "&" + defaults.jsonp + "="+defaults.jsonpCallback;

    var script = document.createElement("script");
    script.src = defaults.url;

    window[defaults.jsonpCallback] = function (data) {
        defaults.success(data);
    }

    var head = document.querySelector("head");
    head.appendChild(script);

}