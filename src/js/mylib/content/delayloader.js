//----------------------------------------
//
//  Google Speed Insight 対策
//  遅延読み込み処理
//
//----------------------------------------
export default class DelayLoader {
    constructor() {
    }

    //----------------------------------------
    //  フォント CSS 読み込み
    //  本体と分けて読み込む場合
    //----------------------------------------
    delayloadFont() {
        var fontUrl = this.wp_csspath+'font.css';
        let fontcss_notosansjp = '<link href="'+this.wp_fontpath+'googlefonts/NotoSansJP/NotoSansJP-Medium.woff2" as="font" type="font/woff2" crossorigin>';
        let fontcss_fontface = '<link href="'+this.wp_csspath+'font.css">';
        let elmhead = document.querySelector( "head" );
        elmhead.insertAdjacentHTML( "beforeend", fontcss_notosansjp );
        elmhead.insertAdjacentHTML( "beforeend", fontcss_fontface );
    }

    //----------------------------------------
    //  各種イベントの登録
    //----------------------------------------
    eventRegistration( i_common ) {
        this.common = i_common;
        this.wp_csspath = this.common.wp_csspath;
        this.wp_fontpath = this.common.wp_fontpath;
        //this.delayloadFont();
    }
}