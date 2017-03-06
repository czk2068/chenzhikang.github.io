/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    function init() {

        var goodsID = location.search.replace("?","");
        new GoodsView("http://datainfo.duapp.com/shopdata/getGoods.php",goodsID,$(".goods-container"));

    }

    init();

})();