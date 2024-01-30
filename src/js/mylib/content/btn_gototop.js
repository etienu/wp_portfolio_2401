//========================================================
//
//  コンテンツ / トップに戻るボタン
//  読み込み
//  import buttonGotoTop from './content/btn_gototop';
//  初期化
//  const btnGotoTop = new buttonGotoTop(ボタンのクラス, 切替Y位置);
//  const btnGotoTop = new buttonGotoTop('.js-gotoTop', 80);
//  使い方
//  window.addEventListener('scroll', () => {
//    btnGotoTop.task();
//  });
//
//========================================================
export default class buttonGotoTop {
    constructor(i_id, i_overPosition) {
        this.btn = document.querySelector(i_id);
        this.overPosition = i_overPosition;
        this.init();
    }

    init() {
        this.task();
    }

    //  指定Y位置超えてるか確認
    checkOver() {
        return (document.documentElement.scrollTop > this.overPosition);
    }

    //  hideを消して表示
    disp() {
        this.btn.classList.remove("hide");
    }

    //  hideを付けて非表示
    hide() {
        this.btn.classList.add("hide");
    }

    //  スクロールイベント内で処理
    task() {
        this.checkOver() ? this.disp() : this.hide();
    }

    //  イベント登録
    eventRegistration() {
        //  クリックイベントセット
        this.btn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

}