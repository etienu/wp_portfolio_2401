//----------------------------------------
//
//  タブグループ
//
//----------------------------------------
export default class tabGroup {
    constructor() {
        this.tabgroup = [];
        this.common = null;
        //  スライドの情報アニメ制御用
        this.tl_slideinfo_rect = [];

    }

    //----------------------------------------
    //  タブ全体閉じる
    //----------------------------------------
    tabdisableall( i_group ) {
        //  タブの取得
        let tabs = i_group.querySelectorAll('[data-js="tabitem"]');
        //  全タブのstate削除
        tabs.forEach((tab) => {
            delete tab.dataset.state;
        });
        
    }

    //----------------------------------------
    //  タブをアクティブに
    //----------------------------------------
    tabactive( i_tab ){
        i_tab.dataset['state'] = "open";
    }

    activeTab( i_tab ) {
        //  親(グループ)を取得する
        let parent = i_tab.parentNode;
        //  グループの全てを非アクティブにする
        this.tabdisableall( parent );
        //  グループの自分のタブをアクティブにする
        this.tabactive( i_tab );
        return parent;
    }
    //----------------------------------------
    //  タブの設定 : WORKS
    //----------------------------------------
    registTab_works( i_tab, i_group ) {
        //  タブのホバー設定
        i_tab.addEventListener("mouseover", () => {           
            this.activeTab( i_tab );
            //--------------------------------
            //  タブごとの固有処理( data-key指定 )
            let key = i_tab.dataset['key'];
            //  swiperの取得
            let swi = null;
            swi = this.common.swipers['works'];
            let bg = document.querySelector('.l-works__content-bg-inner');
            //  配列に変換
            //  info : 実績情報
            let bgiw = bg.querySelectorAll('.l-works__slideinfo__wrapper');
            //  picture: 実績画像
            let bgs = bg.querySelector('.swiper');
            bg.dataset['disp'] = "true";
            let ci = 0; // changeindex
            switch( key ){
            case 'worksswiper1' : ci=1; break;
            case 'worksswiper2' : ci=2; break;
            case 'worksswiper3' : ci=3; break;
            default : ci = 0; break;
            }
            //  変更したい番号と現在の番号が違っている場合は変更演出
            if( swi.activeIndex != ci ){
                //  一回全ての情報を非表示
                bgiw.forEach((iw) => { iw.classList.remove("disp"); });
                bgiw.item(ci-1).classList.add("disp");
                let bgsi = bgiw.item(ci-1).querySelectorAll('.l-works__slideinfo__inner');
                let bgsp = bgs.querySelectorAll('picture');    //  スライドの下のpictureを取得して配列にする
                swi.slideTo(ci);
                //  [背景] 配列があれば実行 ( pictureがない空スライドもある )
                if( 0 < bgsp.length ){
                    gsap.fromTo(bgsp.item(ci-1),{scale:1},{scale:1.05, duration :5} );
                }
                //  [INFO] info以下のdivを全て取得
                if( 0 < bgsi.length ){
                    let bgsii =bgsi[0].querySelectorAll('div');
                    let cnt = 0;
                    //  タイトル・時期・日数・一言
                    bgsii.forEach((tar) => {
                        let rects= tar.querySelectorAll('.rect');  //  rectはdiv１つにつき1つなので1回のみ
                        if( 0 < rects.length ){
                            let rect = rects.item(0);
                            const tl = gsap.timeline();
                            //  ※直接要素に変数を保存してしまうことで個別対応する
                            //  ※gsapも直接要素に追加しているようなので真似する
                            if( rect.tl_slide_info )
                                rect.tl_slide_info.progress( 1 ); // すでに前回のtlがあれば終了させる
                            rect.tl_slide_info = tl;   //  新しくセットする

                            gsap.set(tar,{ opacity : 0, y: 10});
                            gsap.set(rect,{ x: "0%"});
                            tl.to( tar,{ opacity: 1, y:0, duration :0.5,ease: "power1.out", delay : cnt*0.2} )
                            .to( rect,{ x: "105%"} );
                            cnt ++;
                        }
                    });
                }
            }

        });
        //  タブから離れたら
        //i_tab.addEventListener("mouseleave", () => {
        //});
        //  一覧ボタンにホバーしたら背景白に
        let btn = document.querySelector('.l-works__imagebutton__wrapper a');
        btn.addEventListener("mouseover", () => {
            let bg = document.querySelector('.l-works__content-bg .swiper');
            let bgs = bg.querySelectorAll('.swiper-slide');
            let swi = this.common.swipers['works'];
            let ci = 0;
            if( swi.activeIndex != ci ){
                let bgsp = [...bgs.item(ci).querySelectorAll('p')];
                bg.dataset['disp'] = "false";
                //  変えなくていい
                //swi.slideTo(ci);
                //  映像スライドとは違って逆に止まっている方がよい感じ
                if( 0 < bgsp.length ){
                   // gsap.fromTo(bgsp[ci],{scale:1},{scale:1.05, duration :5} );
                }
            }
        });
    }


    //----------------------------------------
    //  タブの設定 : SKILL
    //----------------------------------------
    registTab_skill( i_tab ) {
        //  タブのクリック設定
        i_tab.addEventListener("click", () => {
            this.activeTab( i_tab );
            //--------------------------------
            //  タブごとの固有処理( data-key指定 )
            let key = i_tab.dataset['key'];
            //  swiperの取得
            let swi = null;
            swi = this.common.swipers['skill'];
            switch( key ){
            case 'skillswiper1' : swi.slideTo(0); break;
            case 'skillswiper2' : swi.slideTo(1); break;
            default : break;
            }
        });
    }

    //----------------------------------------
    //  タブグループの設定
    //  グループ内のタブしか検索しないのでグループ名は不要
    //----------------------------------------
    registGroup( i_group ) {
        //  開いているタブ番号を設定
        i_group.dataset['tabindex'] = 0;

        //  タブの取得
        let tabs = i_group.querySelectorAll('[data-js="tabitem"]');
        let groupkey = i_group.dataset['key'];
        switch( groupkey ){
        case "works" : 
            tabs.forEach((tab) => {
                this.registTab_works( tab, i_group );
            });
            break;

        case "skill" : 
            tabs.forEach((tab) => {
                this.registTab_skill( tab );
            });
            break;
        }
    }

    //----------------------------------------
    //  各種イベントの登録
    //----------------------------------------
    eventRegistration( i_common ) {
        //  共有変数クラスの確保
        this.common = i_common;
        //  data-js : タブグループの取得
        let tabgroup = document.querySelectorAll('[data-js="tabgroup"]');
        //  タブグループの数だけループ
        tabgroup.forEach((tgroup) => {
            this.registGroup( tgroup );
        });
    }
}