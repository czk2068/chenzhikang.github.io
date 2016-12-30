/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    function init() {

        showContent("1");

        new NavBar("http://datainfo.duapp.com/shopdata/getclass.php",$(".navBar"),function (items) {
            $(items).each(function () {
                var self = this;
                this.li.click(function () {
                    showContent(self.info.classID);
                });
            });
        });
    }

    function showContent(classID) {
        new GoodsListView("http://datainfo.duapp.com/shopdata/getGoods.php",{classID:classID},$(".main-container"));
    }

    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getuser.php",
        data:{userID:localStorage.getItem("userID")},
        dataType:"JSONP",
        success:function(data){
            console.log(data);
            data = data[0];
            $(".userInfo").empty();
            $html ='<div class="userInfo-header"></div><div class="userInfo-txt"> <h5>欢迎您：'+data.userID+'</h5></div>';
            $(".userInfo").append( $html);
        }
    });

    init();

})();