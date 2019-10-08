function myAjax(obj){
    if(obj.dataType=="jsonp"){
        myAjax4cross(obj);
    }else{
        myAjax4normal(obj);
    }
}


function myAjax4cross(obj) {
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

function myAjax4normal(obj) {
    // 设置默认值
    var defaults = {
        type: "get",
        url: "#",
        dataType: "json",
        data: {},
        async: true,
        success: function (result) {
            console.log(result);
        }
    };
    // obj中的属性，覆盖到defaults中的属性
    // 1、如果有一些属性只存在obj中，会给defaults中增加属性
    // 2、如果有一些属性在obj和defaults中都存在，会将defaults中的默认值覆盖
    // 3、如果有一些属性只在defaults中存在，在obj中不存在，这时候defaults中将保留预定义的属性
    for (var key in obj) {
        defaults[key] = obj[key];
    }

    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var params = "";
    for (var attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
    }
    if (defaults.type == "get") {
        defaults.url += "?" + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);
    if (defaults.type == "get") {
        xhr.send(null);
    } else if (defaults.type == "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    if (defaults.async) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var result = null;
                    if (defaults.dataType == "json") {
                        result = xhr.responseText;
                        result = JSON.parse(result);
                    } else if (defaults.dataType == "xml") {
                        result = xhr.responseXML;
                    } else {
                        result = xhr.responseText;
                    }
                    defaults.success(result);
                }
            }
        };
    } else {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var result = null;
                if (defaults.dataType == "json") {
                    result = xhr.responseText;
                    result = JSON.parse(result);
                } else if (defaults.dataType == "xml") {
                    result = xhr.responseXML;
                } else {
                    result = xhr.responseText;
                }
                defaults.success(result);
            }
        }
    }

}