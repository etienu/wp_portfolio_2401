//----------------------------------------
//  ハンバーガー
//----------------------------------------
export default class buttonHumburger {
    constructor(i_id, i_header, i_spmenu) {
        this.btn = document.querySelector(i_id);
        this.header = document.querySelector(i_header);
        this.spmenu = document.querySelector(i_spmenu);

    }

    //----------------------------------------
    // スクロールを禁止にする関数
    //----------------------------------------
    disableScroll(event) {
        event.preventDefault();
    }
    addScrollStop() {
        document.addEventListener('touchmove', this.disableScroll, { passive: false });
        document.addEventListener('mousewheel', this.disableScroll, { passive: false });
    }
    removeScrollStop() {
        document.removeEventListener('touchmove', this.disableScroll, { passive: false });
        document.removeEventListener('mousewheel', this.disableScroll, { passive: false });
    }

    //----------------------------------------
    //  ハンバーガー開く
    //----------------------------------------
    open() {
        this.btn.classList.toggle("open");
        this.spmenu.classList.toggle("open");
        this.header.classList.toggle("open");
        //  開いた スクロール停止
        if (this.btn.classList.contains("open")) {
            gsap.fromTo('.p-spmenu__background .stripe',{x:"100%"},{x:"0%",stagger:{each:0.1,from:"end"}});
            gsap.fromTo('.p-spmenu__inner',{opacity:0},{opacity:1, duration :1.5} );

            this.addScrollStop();
        }
        //  閉じた スクロール解除
        else {
            gsap.fromTo('.p-spmenu__background .stripe',{x:"0%"},{x:"100%",stagger:{each:0.1,from:"end"}});
            gsap.fromTo('.p-spmenu__inner',{opacity:1},{opacity:0});

            this.removeScrollStop();
        }
    }

    //----------------------------------------
    //  ハンバーガー閉じる( 主にメニュークリック時 )
    //----------------------------------------
    close() {
        //  開いている場合
        if (this.btn.classList.contains("open")) {
            //console.log("SP→タブなので強制的に閉じます");
            this.btn.classList.remove("open");
            this.spmenu.classList.remove("open");
            this.header.classList.remove("open");
            gsap.fromTo('.p-spmenu__background .stripe',{x:"0%"},{x:"100%",stagger:{each:0.1,from:"end"}});
            gsap.fromTo('.p-spmenu__inner',{opacity:1},{opacity:0});
            // スクロール解除
            this.removeScrollStop();
        }
    }

    //----------------------------------------
    //  PC時強制的に閉じる
    //----------------------------------------
    isPC_close() {
        //  ブラウザのリアル幅( リアル幅なのでリアルタイム変更に対応できる )
        const ww = window.outerWidth;
        //  commonを使ってサイトの分岐幅を設定しておくこと
        //  タブレット以上なら強制的に閉じる処理
        if( 768 <= ww ){
            this.close();
        }
    }

    //----------------------------------------
    //  各種イベントの登録
    //----------------------------------------
    eventRegistration(i_inner, i_ullia, i_contact) {
        //  クリックイベントセット
        this.btn.addEventListener("click", () => { this.open(); });
        //  ul liのメニューがクリックされたら閉じる
        let str_ullia = i_inner + " " + i_ullia;
        let spmenu_li_a = document.querySelectorAll(str_ullia);
        spmenu_li_a.forEach((lia) => {
            lia.addEventListener("click", () => { this.close(); });
        });

        //  コンタクトボタンが押されたら閉じる
        let str_contact = i_inner + " " + i_contact;
        //console.log(str_contact);
        let spmenu_contact = document.querySelectorAll(str_contact);
        spmenu_contact.forEach((lia) => {
            lia.addEventListener("click", () => { this.close(); });
        });
    }
}