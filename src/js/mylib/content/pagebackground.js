//----------------------------------------
//
//  コンテンツの処理
//  背景
//  ※単純にz-indexの上下関係でうまくまとめた方が無難の可能性。
//  要素が取れないなどでJS暴発でファーストビューに現れる可能性もアリ
//
//----------------------------------------
export default class pageBackGround {
    constructor() {
        this.herobg = document.querySelector('.l-hero__background');
        this.aboutbg = document.querySelector('.l-about__background');
        this.contactbg = document.querySelector('.l-contact__background');
        //  スマホでPC時1000では足りない
        this.hidePosition = 3000;
        this.hidePosition_about = 3000;
        this.hidePosition_contact = 500;
    }

    taskScroll() {
        var scroll = document.documentElement.scrollTop;
        //  ヒーロー背景
        if( this.herobg ){
            if (scroll > this.hidePosition) {
                this.herobg.classList.add("hide");
            } else {
                this.herobg.classList.remove("hide");
            }
        }

        //  about背景
        if( this.aboutbg ){
            //  一定距離よりも前なら
            if (scroll < this.hidePosition_about ) {
                this.aboutbg.classList.remove("disp");
            } else {
                this.aboutbg.classList.add("disp");
            }
        }

        //  contact背景
        if( this.contactbg ){
            //  一定距離よりも前なら 背景隠す
            if ( scroll < this.hidePosition_contact ) {
            //    this.contactbg.classList.remove("disp");
            } else {
            //    this.contactbg.classList.add("disp");
            }
        }
    }

    //  読み込み時の処理
    taskLoad() {
        if (!this.herobg) return;
        //  hero
        var scroll = document.documentElement.scrollTop;
        //  読み込み時に指定位置を超えていたらヒーロー背景隠す
        if( this.herobg ){
            if (scroll > this.hidePosition) {
                this.herobg.classList.remove("hide");
            }
        }

        //  about
        //  読み込み時に指定位置より先なら表示
        if( this.aboutbg ){
            if (this.hidePosition_about < scroll ) {
                this.aboutbg.classList.add("disp");
            }
        }

        //  contact
        //  読み込み時に指定位置より先なら表示
        if( this.contactbg ){
            if (this.hidePosition_contact < scroll ) {
                this.contactbg.classList.add("disp");
            }
        }

    }
}