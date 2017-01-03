/**
 * Created by lenovo on 2016/12/29.
 */
(function () {

    $(".denglu").click(function () {
        $(".denglu").css("font-weight","bold");
        $(".denglu").css("color","#464646");
        $(".denglu").css("border-bottom","2px solid #464646");
        $(".zhuce").css("font-weight","normal");
        $(".zhuce").css("color","#afafaf");
        $(".zhuce").css("border","0");
        $(".registered-content").css("display","none");
        $(".login-content").css("display","block");

        $(function () {

            $(".login-button").bind("click", function () {

                if ($(".login-name").val() == "") {
                    alert("用户名不能为空");
                    return false;
                }
                if ($(".login-password").val() == "") {
                    alert("密码不能为空");
                    return false;
                }

                $.get(
                    "http://datainfo.duapp.com/shopdata/userinfo.php",
                    {
                        status: "login",
                        userID: $(".login-name").val(),
                        password: $(".login-password").val(),
                    },
                    function (data) {
                        if (data == 0) {
                            alert("用户名不存在，请检查");
                        } else if (data == 2) {
                            alert("用户名密码不符");
                        } else {

                            window.location.href = "../../index.html";

                            localStorage.setItem("userID", $(".login-name").val());
                        }
                    });
            });
        });
    });

    $(".zhuce").click(function () {
        $(".zhuce").css("font-weight","bold");
        $(".zhuce").css("color","#464646");
        $(".zhuce").css("border-bottom","2px solid #464646");
        $(".denglu").css("font-weight","normal");
        $(".denglu").css("color","#afafaf");
        $(".denglu").css("border","0");
        $(".login-content").css("display","none");
        $(".registered-content").css("display","block");

        $(function () {
            $(".registered-button").bind("click", function () {
                if ($(".registered-name").val() == "") {
                    alert("用户名不能为空");
                    return false;
                }
                if ($(".registered-password").val() == "") {
                    alert("密码不能为空");
                    return false;
                }
                if ($(".registered-password").val() != $(".registered-passwords").val()) {
                    alert("两次密码输入不一致，请正确输入");
                    return false;
                }

                $.get(
                    "http://datainfo.duapp.com/shopdata/userinfo.php",
                    {
                        status: "register",
                        userID: $(".registered-name").val(),
                        password: $(".registered-password").val(),
                    },
                    function (data) {
                        if (data == 0) {
                            alert("用户名已经注册，请更换");
                        }
                        if (data == 1) {
                            alert("恭喜您注册成功");
                        }
                        if (data == 2) {
                            alert("数据包出错啦");
                        }
                    });
            });
        });
    });

})();