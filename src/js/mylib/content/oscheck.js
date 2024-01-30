//----------------------------------------
//
//  OS Check
//
//----------------------------------------
export default class osCheck {
    static isPC = 0;
    static isSP = 1;
    static isTab = 2;

    constructor() {
        this.dispUserAgent();

        //  iOSのバージョンがある
        if (this.getiOSVersion()) {
            let body = document.getElementsByTagName('body')[0];
            //body.classList.add('iOS');
        }
    }

    //  userAgent確認用領域があれば、取得情報を出力
    dispUserAgent(i_output) {
        let div_ua = document.querySelector(i_output);
        if (div_ua) {
            div_ua.innerText = navigator.userAgent;
        }
    }

    //  bodyタグにclass付与する
    markBody() {
        //  識別したbodyにclass付与
        if (navigator.userAgent.indexOf('iPhone') > 0) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('iPhone');
        }
        //  識別したbodyにclass付与
        if (navigator.userAgent.indexOf('Macintosh') > 0) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('Macintosh');
        }

        if (navigator.userAgent.indexOf('iPad') > 0) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('iPad');
        }

        if (navigator.userAgent.indexOf('Android') > 0) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('Android');
        }

    }

    //  ユーザーエージェントの確認
    checkUA() {
        var ua = navigator.userAgent;
        //    console.log(ua);
        // スマートフォン用の記述

        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
            //    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
            //        console.log("isSP");
            return isSP;

            // タブレット用の記述
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            //        console.log("isTab");
            return isTab;

            // PC用の記述
        } else {
            //        console.log("isPC");
            return isPC;
        }
    }

    //  iOSバージョン
    getiOSVersion() {
        return parseFloat(
            ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
        ) || false;
    }

}