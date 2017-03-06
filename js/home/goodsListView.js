/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    function GoodsListView(url,data,superView,getItemsCallback) {

        this.showListView(url,data,superView,getItemsCallback);

        HTTPClient.call(this);

    }

    GoodsListView.prototype = new HTTPClient();

    GoodsListView.prototype.showListView = function (url,data,superView,getItemsCallback) {

        this.goodsContainer = $("<ul class='goods-container'></ul>");
        superView.html(this.goodsContainer);

        var self = this;

        this.getJsonp(url,data,function (result) {

            $(result).each(function () {
                var goods = new GoodsItem(this,self.goodsContainer);
            });
        });
    };

    function GoodsItem(info,superView) {

        this.info = info;

        var imageName = info.goodsListImg;
        var className = info.goodsName;

        var target = "html/goodsDetail.html?"+info.goodsID+"";
        this.li = $("<li><a href="+target+"><img src="+imageName+" alt=''><p>"+className+"</p></a></li>");
        superView.append(this.li);

    }

    window.GoodsListView = GoodsListView;
})();