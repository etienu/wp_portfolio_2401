//----------------------------------------
//  ヘッダー処理
//  現在使っているのは
//  指定位置超えたらヘッダー浮かすという処理のみ
//----------------------------------------
export default class partsHeader {
    constructor(i_header) {
        this.lheader = document.querySelector(i_header);
        this.body = document.querySelector("body");

        this.set = 200; //ウインドウ上部からどれぐら
        this.dispPosition = 0; // 120;    //  ヘッダーの位置による

        this.boxTop = new Array;
        this.current = -1;
        this.taskFloat();
    }

    scrollTask() {
        //  ヘッダーのfloat表示
        this.taskFloat();

    }

    //--------------------------------------------------
    //      ヘッダー浮かし処理
    //--------------------------------------------------
    taskFloat() {
        var scroll = document.documentElement.scrollTop;
        //  位置を超えていたらヘッダーを浮かす
        if (scroll > this.dispPosition) {
            this.lheader.classList.add("l-header__float");
            this.body.classList.add("l-header__float");
        } else {
            this.lheader.classList.remove("l-header__float");
            this.body.classList.remove("l-header__float");

        }
    }

    //--------------------------------------------------
    //  メニューアイテムにマークを付ける
    //  今使ってないけど、Yスクロールに合わせて現在セクションの
    //  メニューに印付けたい場合
    //--------------------------------------------------
    taskMenuItemMark(secNum) {

        this.lia = document.querySelector(".header__nav li a");
        //  配列処理にすべき
        this.nav_card = document.querySelector("#hnav_card");
        this.nav_news = document.querySelector("#hnav_news");
        this.nav_price = document.querySelector("#hnav_price");
        this.nav_access = document.querySelector("#hnav_access");
        this.nav_contact = document.querySelector("#hnav_contact");

        if (secNum != current) {
            current = secNum;
            secNum2 = secNum + 1; //以下にクラス付与したい要素名と付与したいクラス名
            this.lia.classList.add('hdis-active');

            //位置によって個別に処理をしたい場合　
            if (current == 0) {
                this.nav_card.classList.add('hdis-active');
            } else if (current == 1) {
                this.nav_news.classList.add('hdis-active');
            } else if (current == 2) {
                this.nav_price.classList.add('hdis-active');
            } else if (current == 3) {
                this.nav_access.classList.add('hdis-active');
            } else if (current == 4) {
                this.nav_contact.classList.add('hdis-active');
            }

        }
    };
}