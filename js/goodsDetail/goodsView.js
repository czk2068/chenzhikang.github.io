/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    function GoodsView(url,id,superView) {

        this.showGoods(url,id,superView);
    }

    GoodsView.prototype = new HTTPClient();

    GoodsView.prototype.showGoods = function (url,id,superView) {

        var self = this;

        this.getJsonp(url,{goodsID:id},function (result) {

            console.log(result);

            self.createView(result[0],superView);

            self.addClick();
            self.bigAndSmall();

        });
    };

    GoodsView.prototype.createView = function (info,superView) {

        var images = info.imgsUrl.slice(2,info.imgsUrl.length-2).split("\",\"");

        superView.append(

            "<div class='goods-header'>" +
            "▶ 您的位置：" +
            "<a href='../../../时尚潮流/index.html'>潮流首页</a> > " +
            "<span>"+info.goodsName+"</span>" +
            "</div>" +

            "<hr size='1px' color='#e5e5e5'>" +

            "<div id='container'>	<div id='box'> " +
            "<div id='big'>" +
            "<ul>" +
            "<li class='cur'><img src="+images[0]+" alt=''></li> " +
            "<li><img src="+images[1]+" alt=''></li> " +
            "<li><img src="+images[2]+" alt=''></li> " +
            "</ul> " +
            "<div id='mask'></div> " +
            "<span id='shade'></span> </div> " +
            "<div id='small'> " +
            "<ul> " +
            "<li class='cur'><img src="+images[0]+" alt=''></li> " +
            "<li><img src="+images[1]+" alt=''></li> " +
            "<li><img src="+images[2]+" alt=''></li> " +
            "</ul> " +
            "</div> " +
            "<div id='fdj'> " +
            "<ul> " +
            "<li class='cur'><img src="+images[0]+" alt=''></li> " +
            "<li><img src="+images[1]+" alt=''></li> " +
            "<li><img src="+images[2]+" alt=''></li> " +
            "</ul> " +
            "</div> </div>"+

            "<div class='goods-right'>" +

            "<p class='goodsName'>"+info.goodsName+"</p>" +

            "<p class='price'>品　　牌： " +
            "<u>Moschino</u> (莫斯奇诺) " +
            "<u>已有666条品牌评论</u> 商品编号：66666666" +
            "</p>" +

            "<hr size='1px' color='#e5e5e5' style='margin-bottom: 10px'>" +

            "<p class='price'>潮 流 价： " +
            "<b>￥"+info.price+"</b>" +
            "</p>" +

            "<p class='price'>发 货 地： " +
            "<span>香港 预计6-16天送达</span> " +
            "<u>查看配送流程</u>" +
            "</p>" +

            "<p class='price'>税　　费： 由海外卖家承担 " +
            "<u>详细说明</u>" +
            "</p>" +

            "<hr size='1px' color='#e5e5e5' style='margin-top: 10px'>" +

            "<p class='color'>颜　　色：" +
            "<span>黑色</span>" +
            "<span>白色</span>" +
            "<span>灰色</span>" +
            "</p>" +

            "<p class='color'>尺　　码：" +
            "<span>S</span>" +
            "<span>XS</span>" +
            "<span>M</span>" +
            "<span>XM</span>" +
            "<span>L</span>" +
            "<span>XL</span>" +
            "<span>XXL</span>" +
            "</p>" +

            "<p class='number'>数　　量：" +
            "<span class='jian'>-</span>" +
            "<input class='num' value='1'>" +
            "<span class='add'>+</span>" +
            "</p>" +

            "<p class='number' style='color: black'>支持分期付款　　" +
            "由Parafuns 发货　　" +
            "由潮流网提供售后服务" +
            "</p>" +

            "<div class='buying-button'>立即购买</div>" +
            "<div class='buy-button'>放入购物袋</div>" +
            "<div class='buyed-button'>＋收藏</div>" +

            "<br>" +
            "<br>" +

            "<p class='buy-phone'>电话订购：" +
            " <b>666-666-6666</b>" +
            " <span>（08:00-24:00）</span>" +
            "</p>" +

            "<hr size='1px' color='#e5e5e5' style='margin-top: 10px'>" +

            "<div class='photo'></div>" +

        "</div>" +

            "<div class='information'>" +
            "<div class='information-header'>商品信息" +
            "</div>" +
            "<p>"+info.detail+"</p>" +
            "</div>" +

        "<div class='information-img'></div>"

        );

        GoodsView.prototype.addClick = function () {
            $(document).ready(function () {

                $(".add").click(function () {
                    var n = $(this).prev().val();
                    var num = parseInt(n) + 1;
                    if (num == 0) {
                        return;
                    }
                    $(this).prev().val(num);
                });

                $(".jian").click(function () {
                    var n = $(this).next().val();
                    var num = parseInt(n) - 1;
                    if (num == 0) {
                        return
                    }
                    $(this).next().val(num);
                });
            });
        };

    };

    GoodsView.prototype.bigAndSmall = function () {
        var box=document.getElementById("box");
        var Big=document.getElementById("big");
        var Small=document.getElementById("small");
        var fdj=document.getElementById("fdj");
        var BigLi=Big.getElementsByTagName("li");
        var SmallLi=Small.getElementsByTagName("li");
        var FdjLi=fdj.getElementsByTagName("li");
        var _index=0;

        for(var i=0; i<SmallLi.length; i++){
            SmallLi[i].index=i;
            SmallLi[i].onmouseover=function(){
                for(var i=0; i<SmallLi.length; i++){
                    SmallLi[i].className="";
                    BigLi[i].className="";
                    FdjLi[i].className="";
                }
                this.className="cur";
                BigLi[this.index].className="cur";
                FdjLi[this.index].className="cur";
                _index=this.index;
            }
        }

        var shade=document.getElementById("shade");
        var mask=document.getElementById("mask");

        shade.onmouseover=function(){
            mask.style.display="block";
            fdj.style.display="block";
        };
        shade.onmouseout=function(){
            mask.style.display="none";
            fdj.style.display="none";
        };

        shade.onmousemove=function(event){

            var event=event||window.event;

            var x=event.clientX;
            var y=event.clientY;

            var l=box.offsetLeft;
            var t=box.offsetTop;

            var w=mask.offsetWidth/2;
            var h=mask.offsetHeight/2+4;

            var _left=x-l-w;
            var _top=y-t-h;



            if(_top<0){
                _top=0
            }else if(_top>Big.offsetHeight-2*h){
                _top=Big.offsetHeight-2*h;
            }

            if(_left<0){
                _left=0
            }else if(_left>Big.offsetWidth-2*w){
                _left=Big.offsetWidth-2*w
            }

            mask.style.left=_left+"px";
            mask.style.top=_top+"px";

            var ydmax_w=Big.offsetWidth-2*w;
            var ydmax_h=Big.offsetHeight-2*h;

            var yd_wbl=_left/ydmax_w;
            var yd_hbl=_top/ydmax_h;

            var fImg=fdj.getElementsByTagName("img");


            var b_left=(fImg[_index].offsetWidth-fdj.offsetWidth)*yd_wbl+10;

            var b_top=(fImg[_index].offsetWidth-fdj.offsetWidth)*yd_hbl;

            fImg[_index].style.left=-b_left+"px";
            fImg[_index].style.top=-b_top+"px";
        }

    };


    window.GoodsView = GoodsView;
})();