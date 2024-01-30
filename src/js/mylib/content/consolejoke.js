//========================================================
//
//  consoleログに出力する ネタ
//
//========================================================
export default class consolejoke {
    constructor() {
        this.common = null;
    }

    task() {
    }

    toDataURL(src, callback){
        var image = new Image();
        image.crossOrigin = 'Anonymous';
     
        image.onload = function(){
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          context.drawImage(this, 0, 0);
          var dataURL = canvas.toDataURL('image/png');
          callback(dataURL);
        };
        image.src = src;
      }

/*
    JavaScript Consoleに面白い出力をしているサービス
    https://qiita.com/oohira/items/6c30bdf3636a134cf119

    consoleで画像表示は2022年には使えなくなっていた？
    https://shigurezuki.jp/articles/console.log-img
    ・urlが使用不可になり、data64変換すれば使用可能

    画像をdata64に変換する方法
    https://www.delftstack.com/ja/howto/javascript/convert-an-image-into-base64-string-using-javascript/
*/
    //  イベント登録
    eventRegistration( i_common ) {
        //  共有変数クラスの確保
        this.common = i_common;
        //  画像のURL
        let imgurl = this.common.wp_imagePath;
        let sizew = 400;
        let sizeh = 256;

        //  送信完了ページ
        if( this.common.wp_template == "page-contact-complete.php" ){
            imgurl += 'console/ari.png';
            sizew = 300;
            sizeh = 534;
        }
        //  通常時
        else{
            var random = Math.floor( Math.random() * 2 );
            //  ランダム画像
            switch( random ){
            case 0 : imgurl += 'console/otu.png';     break;
            case 1 : imgurl += 'console/kyuukei.png';
              sizew = 200;
              sizeh = 250;
              break;
            default: imgurl += 'console/otu.png';  break;
            }
        }

        let imgdataurl = "";
        //  画像のbase64変換
        this.toDataURL(imgurl, function(dataURL){
            imgdataurl = dataURL;
            let txt_css = 'background-image: ';
            txt_css += 'url("'+imgdataurl+'");';
            txt_css += ' background-size: contain; background-repeat : no-repeat; background-position : bottom; ';
            txt_css += 'padding: calc('+sizeh+'px / 2) calc('+sizew+'px / 2); color : transparent;  border-bottom: solid 8px lightgreen;';
            //  画像をconsoleに出力
            console.log('%c ', txt_css);
        });

    }

}