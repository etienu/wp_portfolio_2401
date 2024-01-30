//---------------------------------------------
//
//  iPhone以下の画面サイズへの対応
//  ViewPortを書き換え縮小させる
//
//---------------------------------------------
export default class adjustViewport {
    constructor() {}

    //------------------------------------------------
    //  起動時375px以下なら375pxで固定
    //------------------------------------------------
    set(_executeWindowWidth) {

        const executeWindowWidth = _executeWindowWidth || 375;
        const elmViewport = document.querySelector('meta[name="viewport"]');
        let valueViewportSP_Normal =`width=${executeWindowWidth}, user-scalable=no`;
        let valueViewportSP_iPhone =`width=${executeWindowWidth}, user-scalable=no, viewport-fit=cover`;
        //  iPhone場合apple用の設定
        let valueViewportSP =navigator.userAgent.indexOf('iPhone') > 0 ?
                valueViewportSP_iPhone :valueViewportSP_Normal;
        let valueViewportPC ='width=device-width, initial-scale=1';
        const valueViewport = window.innerWidth < executeWindowWidth ?
            valueViewportSP : valueViewportPC;

        if( elmViewport ){
            elmViewport.setAttribute('content', valueViewport);
        }
        return;
    }

    //------------------------------------------------
    //  resizeイベントで使用
    //  低予算爆速対応の場合使用する、デザインの固定化
    //------------------------------------------------
    task(){
        //  未使用の場合
//        return;

        let fFixed = false;
        const ww = window.outerWidth;   //  ブラウザのリアル幅( リアル幅なのでリアルタイム変更に対応できる )
        //const ww = window.innerWidth; //  コンテンツ領域の幅( viewport固定したら以降そのままになってしまう )
        const elmViewport = document.querySelector('meta[name="viewport"]');
        let fixedwidth = 375;
/*
        //  TAB時の画面固定化
        //  PCデザイン(1440px)～SPデザイン入るまでの間
        if( 768 < ww && ww <= 1440  ){
            fFixed = true;
            fixedwidth = 1440;
        }

        //  SP時の画面固定化
        //  SP時(768px以下)デザインの完全固定化
        else if(  ww <= 768  ){
            fFixed = true;
            fixedwidth = 375;
        }
*/
        //  SP時(375px以下)デザインの縮小方向固定化
//        else if(  ww <= 375  ){
        if(  ww <= 375  ){
            fFixed = true;
            fixedwidth = 375;
        }

        //  固定範囲なので固定する / 固定しない時は通常に戻す
        let valueViewport = fFixed ? `width=${fixedwidth}, user-scalable=no` : 'width=device-width, initial-scale=1';
        if( elmViewport ){
            elmViewport.setAttribute('content', valueViewport);
        }
    }
}
