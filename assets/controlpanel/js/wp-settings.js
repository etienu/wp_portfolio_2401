//----------------------------------------------------------------
//
//  ワードプレス管理画面用js
//  独自管理ページのボタンに対するphp実行処理
//
//----------------------------------------------------------------
//  読み込み時の処理
document.addEventListener("DOMContentLoaded",()=>{
    // テーマ名固定に注意( テーマより更に上の位置からはじまっているため )
    const wpdir = "../wp-content/themes/blanktheme/assets/controlpanel";
//    const wpdir = "../wp-content/themes/eec/assets/controlpanel";

    //----------------------------------------------------
    //  管理画面にあるidを取得して、なければ管理画面ではないので終了
    //----------------------------------------------------
    const post = document.querySelector("#wpcontent");
    if( !post ){
        console.log( "管理画面ではありません" );
        return;
    }

    //================================================
    //  管理画面追加ページ : 「テーマ設定」
    //================================================
    //----------------------------------------
    // ボタンの処理
    //----------------------------------------
    //  記事リセット
    const btnms_vr = document.querySelector("#my-wp-setting-viewreset");
    if( btnms_vr )
        btnms_vr.addEventListener("click", () => {
            //  「ファイル」の配置位置
            //  管理画面の話なのでテーマより上にあった方がよいかもしれない
            //  しかし、wp-migration一発で終わらせたい事を考えるとテーマ下で管理したいとも思う
            runPHP( wpdir+"/php/wp-setting-viewreset.php", "custompost" );
        });

    //  アイテムカウンター : リセットボタン
    const btnms_itemcounter = document.querySelector("#my-wp-setting-itemcounterreset");
    if( btnms_itemcounter )
        btnms_itemcounter.addEventListener("click", () => {
            runPHP( wpdir+"/php/wp-setting-viewreset.php", "itemcounter" );
        });

    //----------------------------------------
    //  PHPの実行
    //----------------------------------------
    const runPHP = ( i_fileName, i_id ) => {
        console.log( ">>> runPHP <<<" );
        // (1)XMLHttpRequestオブジェクトを作成
        var xhr = new XMLHttpRequest();

        // (2)onreadystatechangeイベントで処理の状況変化を監視
        xhr.onreadystatechange = function(data) {
            if(this.readyState == 4 && this.status == 200){
                console.log( this.responseText );
            }
            if(this.readyState == 4 && this.status == 500){
                console.log( this.responseText );
            }
            //  リロードする
            location.reload();            
        }
        // (3)HTTPのPOSTメソッドとアクセスする場所を指定
        xhr.open('POST', i_fileName, true );
        // (3)送信する内容の形式を設定
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let send_txt = 'id=' + i_id;
        // (4)HTTPリクエストを送信
        xhr.send( send_txt );
    }

});