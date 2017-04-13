/**
 * Created by huhanwen on 2017/4/13.
 */

let regTel = new RegExp('1+[3578]+\\d{9}');

// 获取验证码
$('#getIdCode').on('click', function () {
    if($(this).hasClass('disabled')){
        return
    }
    var userTel = $('#uName2').val();
    if(!regTel.test(userTel)){
        $('#uName2Meg').show();
        return
    }else{
        $('#uName2Meg').hide();
    }
    $.ajax({
        url: root + 'user/sendMobile',
        type: 'post',
        data: {
            'phone': userTel
        },
        /**
         * .disabled{
         * background-color:'#eee';
         * cursor: default
         * }
         *
         *
         *
         * **/
        success: function (res) {
            let data = JSON.parse(res);
            let $getIdCode =  $('#getIdCode');
            if (data.state === 'success') {
                $getIdCode.addClass('disabled').html("60s");
                let idCodeTimeId;
                let numIndex = 59;
                idCodeTimeId = setInterval(function () {
                    $getIdCode.html(numIndex + 's');
                    numIndex--;
                    if (0 > numIndex) {
                        clearInterval(idCodeTimeId);
                        $('#getIdCode').attr('disabled', false)
                            .removeClass('disabled').html('获取验证码');
                    }
                }, 1000);
            }

            if (data.state === 'error') {
                $('#uName2Meg').show();
            }

            if (data.state === 'fail') {
                $('#uName2Meg').show();
            }
        },
        statusCode: {
            404: function () {
                console.log('404');
            }
        }
    });


});

/*********** inputs blur **********/
//tel
$('#uName2').on('blur', function () {
    let tel = $(this).val();
    let regTel = new RegExp('^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$');
    if(!regTel.test(tel)){
        $('#uName2Meg').show();
    }else{
        $('#uName2Meg').hide();
    }
});
//idcode
$('#idCode').on('blur', function () {
    let idCode = $(this).val();
    let regCode = new RegExp('\\d{6}');
    if(!regCode.test(idCode)){
        $('#idCode-error').show();
    }else{
        $('#idCode-error').hide();
    }
});
//pwd2
$('#pwd2').on('blur', function () {
    let pwd2 = $(this).val();
    let pwd3 = $('#pwd3').val();
    let regPwd = new RegExp('^[!"#$%&\'\(\)*+,-./0-9:;<=>?@A-Z[\\]^_`a-z{|}~]{8,16}$');
    if(!regPwd.test(pwd2)){
        $('#tip-find-back-pwd').show();
    }else{
        $('#tip-find-back-pwd').hide();
        let $sureTip = $('#findBackSurePwd');
        if(pwd2 === pwd3 && $sureTip.css('display')!='none') {
            $sureTip.hide();
        }
    }
    //
    if(pwd3 == pwd2 && regPwd.test(pwd3)) {
        $('#findBackSurePwd').hide();
    }
});
//pwd3
$('#pwd3').on('blur', function () {
    let pwd2 = $('#pwd2').val();
    let pwd3 = $(this).val();
    let regPwd = new RegExp('^[!"#$%&\'\(\)*+,-./0-9:;<=>?@A-Z[\\]^_`a-z{|}~]{8,16}$');
    if(!regPwd.test(pwd3) || pwd2 != pwd3){
        $('#findBackSurePwd').show();
    }else{
        $('#findBackSurePwd').hide();
    }
});
$('#findBackSure').on('click', function () {
    console.log('submit');
    let $userNameInPwdBack = $('#uName2');
    let $idCode = $('#idCode');
    let uName2 = $userNameInPwdBack.val();
    let idCode = $idCode.val();
    let $pwd2 = $('#pwd2');
    let $pwd3 = $('#pwd3');
    let pwd2 = $pwd2.val();
    let pwd3 = $pwd3.val();
    // let reg = regex.tel.test($userNameInPwdBack.val());
    // let regIdCode = (/^\d{6}$/).test($idCode.val());
    let regIdCode = new RegExp('^\\d{6}$');
    let regPwd = new RegExp('^[!"#$%&\'\(\)*+,-./0-9:;<=>?@A-Z[\\]^_`a-z{|}~]{8,16}$');
    let regTel = new RegExp('^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$');

    if (!regIdCode.test(idCode) || !regTel.test(uName2) || pwd2 != pwd3 || !regPwd.test(pwd2) || !regPwd.test(pwd3)) {
        $userNameInPwdBack.blur();
        $idCode.blur();
        $pwd2.blur();
        $pwd3.blur();
        //TODO:what is the time to make submitBtn disabled
        // $(this).attr('disabled', true);
        return
    }
/**********************************************/
/*************  submit to server  *************/
/**********************************************/
});