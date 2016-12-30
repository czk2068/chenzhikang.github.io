/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    function HTTPClient() {

    }

    HTTPClient.prototype.getJson = function (url,callback) {

        $.get(url).done(function (result) {

            if (callback){
                callback(result);
            }

        });

    };

    HTTPClient.prototype.getJsonp = function (url,data,callback) {

        $.post({url:url,dataType:"jsonp",data:data}).done(function (result) {

            if (callback){
                callback(result);
            }
        });
    };

    window.HTTPClient = HTTPClient;
})();