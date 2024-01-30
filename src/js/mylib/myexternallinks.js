//----------------------------------------
//
//  WP External Linksの代わり
//  全a hrefにチェックを入れ、外部なら外部ページ処理する
//
//----------------------------------------
//
//  23/10/27
//  aタグの「target=”_blank”」だけCSSを指定する
//  https://tech.kurojica.com/archives/2031/
//  ↑外部リンクにtarget="_blank"を入れ、CSSでそれを見る
//  判別方法でもよければ不要になる
//
//----------------------------------------
export default class myExternalLinks {
    constructor() {
        //  全てのa hrefを取得
        this.hrefs = document.querySelectorAll('a');
    }

    //  外部リンクの修正
    fixingExternalLinks() {
        this.hrefs.forEach((target) => {
            let url = target.href;
            var reg = new RegExp("^(http?:)?\/\/" + location.hostname);
            var regs = new RegExp("^(https?:)?\/\/" + location.hostname);
            //console.log("[External]" + url  + " [ reg ] :  " + reg );
            if (url.match(reg) ||
                url.match(regs) ||
                url.charAt(0) === "/" ||
                url.charAt(0) === "#" ) {
                //  内部リンク時の処理
                    //console.log("内部 : " + url);
            }
            //  外部リンクである
            else {
                let fexception = false;
                //  例外判定
                if (url.indexOf('twitter.com/etienu352') !== -1) {
                    fexception = true;
                    //    console.log("例外 : " + url);
                }
                if (!fexception) {
                    //    console.log("外部 : " + url);
                    let acls = "c-link__exicon";
                    if (target.classList.contains("exi-xs")) {
                        acls += " c-link__exicon--xs";
                    } else if (target.classList.contains("exi-md")) {
                        acls += " c-link__exicon--md";
                    }

                    //属性追加
                    target.setAttribute("rel", "noopener noreferrer");
                    target.setAttribute("target", "_blank");
                    //  fontawesome軽量型
                    if (true) {
                        let ne = document.createElement('i');
                        ne.setAttribute("class", "fa-solid fa-external-link-alt");
                        target.appendChild(ne);
                    }
                    //  object式 - 色変更ができない
                    if (false) {
                        let ne = document.createElement('object');
                        ne.setAttribute("class", acls);
                        ne.setAttribute("data", wp_imgpath + "common/external-link-alt-solid.svg");
                        target.appendChild(ne);
                    }
                }
            }
        });
    }
}