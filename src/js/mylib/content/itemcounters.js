//------------------------------------------------------------
//  
//  サイトのあらゆる要素に対応できるアイテムカウンター
//
//------------------------------------------------------------
export default class itemcounters {
    constructor() {
    }

    //----------------------------------------
    //  PHPを実行
    //----------------------------------------
    runPHP = ( i_fileName, i_id ) => {
        const fname = this.wptaskdir+i_fileName;    //assets/task/以下のファイルを実行
        var xhr = new XMLHttpRequest();     // (1)XMLHttpRequestオブジェクトを作成
        // (2)onreadystatechangeイベントで処理の状況変化を監視
        xhr.onreadystatechange = function(data) {
            //  失敗
            if(this.readyState == 4 && this.status == 200){
            //    console.log( this.responseText );
            }
            if(this.readyState == 4 && this.status == 500){
            //    console.log( this.responseText );
            }
            //  成功
            //console.log("成功しとる");
        }
        xhr.open('POST', fname, true );     // (3)HTTPのPOSTメソッドとアクセスする場所を指定
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');// (3)送信する内容の形式を設定
        let send_txt = 'id='+i_id;
        xhr.send( send_txt );                       // (4)HTTPリクエストを送信
    }


    //----------------------------------------
    //  要素によって処理を分類
    //----------------------------------------
    set_itemcounters(){
        let ics = document.querySelectorAll('[data-jsitemcounter]');
        const runphp = this.runPHP;
        //  全に対して処理
        ics.forEach((el) => {
            //  id取得
            const el_id = el.dataset['jsitemcounter'];  //  "about_myvideo"など
            const el_id_play = el_id + "_play";
            const el_id_end = el_id + "_end";
            //  この要素が何タグが判別
            switch( el.tagName ){
            //  videoタグ
            case 'VIDEO':
                //console.log( "itemcounter : video :[ID] " + el_id );
                //  両方ともスマホで発火しない？
                //  再生時に発火
                el.addEventListener('playing', function() {
                    //  phpの実行、IDを渡す
                    runphp( "task_itemcounter.php", el_id_play );
                });
                //  再生終了時に発火
                el.addEventListener('ended', function() {
                    runphp( "task_itemcounter.php", el_id_end );
                });
                break;
            }
        });        
    }

    //----------------------------------------
    //  各種イベントの登録
    //----------------------------------------
    eventRegistration( i_common ) {
        this.common = i_common;
        this.wptaskdir = this.common.wp_rootpath+"/assets/php/task/";

       //  全アイテムカウンター取得して設定
        this.set_itemcounters();
    }
}