/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mylib/adjustviewport.js":
/*!****************************************!*\
  !*** ./src/js/mylib/adjustviewport.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ adjustViewport; }
/* harmony export */ });
//---------------------------------------------
//
//  iPhone以下の画面サイズへの対応
//  ViewPortを書き換え縮小させる
//
//---------------------------------------------
class adjustViewport {
  constructor() {}

  //------------------------------------------------
  //  起動時375px以下なら375pxで固定
  //------------------------------------------------
  set(_executeWindowWidth) {
    const executeWindowWidth = _executeWindowWidth || 375;
    const elmViewport = document.querySelector('meta[name="viewport"]');
    let valueViewportSP_Normal = `width=${executeWindowWidth}, user-scalable=no`;
    let valueViewportSP_iPhone = `width=${executeWindowWidth}, user-scalable=no, viewport-fit=cover`;
    //  iPhone場合apple用の設定
    let valueViewportSP = navigator.userAgent.indexOf('iPhone') > 0 ? valueViewportSP_iPhone : valueViewportSP_Normal;
    let valueViewportPC = 'width=device-width, initial-scale=1';
    const valueViewport = window.innerWidth < executeWindowWidth ? valueViewportSP : valueViewportPC;
    if (elmViewport) {
      elmViewport.setAttribute('content', valueViewport);
    }
    return;
  }

  //------------------------------------------------
  //  resizeイベントで使用
  //  低予算爆速対応の場合使用する、デザインの固定化
  //------------------------------------------------
  task() {
    //  未使用の場合
    //        return;

    let fFixed = false;
    const ww = window.outerWidth; //  ブラウザのリアル幅( リアル幅なのでリアルタイム変更に対応できる )
    //const ww = window.innerWidth; //  コンテンツ領域の幅( viewport固定したら以降そのままになってしまう )
    const elmViewport = document.querySelector('meta[name="viewport"]');
    let fixedwidth = 375;
    /*
            //  TAB時の画面固定化
            //  PCデザイン(1440px)～SPデザイン入るまでの間
            if( 768 < ww && ww <= 1440  ){
                fFixed = true;
                fixedwidth = 1440;
            }
    
            //  SP時の画面固定化
            //  SP時(768px以下)デザインの完全固定化
            else if(  ww <= 768  ){
                fFixed = true;
                fixedwidth = 375;
            }
    */
    //  SP時(375px以下)デザインの縮小方向固定化
    //        else if(  ww <= 375  ){
    if (ww <= 375) {
      fFixed = true;
      fixedwidth = 375;
    }

    //  固定範囲なので固定する / 固定しない時は通常に戻す
    let valueViewport = fFixed ? `width=${fixedwidth}, user-scalable=no` : 'width=device-width, initial-scale=1';
    if (elmViewport) {
      elmViewport.setAttribute('content', valueViewport);
    }
  }
}

/***/ }),

/***/ "./src/js/mylib/content/accordion.js":
/*!*******************************************!*\
  !*** ./src/js/mylib/content/accordion.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ accordion; }
/* harmony export */ });
// GSAP使用
//------------------------------------------------------------
//  
//  アコーディオンを閉じる時のアニメーション
//
//------------------------------------------------------------
const closingAnim = (content, element) => gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.4,
  //ease: "power3.out",
  overwrite: true,
  onComplete: () => {
    // アニメーションの完了後にopen属性を取り除く( <details>用 )
    element.removeAttribute("open");
  }
});

//------------------------------------------------------------
//
//  アコーディオンを開く時のアニメーション
//
//------------------------------------------------------------
const openingAnim = content => gsap.fromTo(content, {
  height: 0,
  opacity: 0
}, {
  height: "auto",
  opacity: 1,
  duration: 0.4,
  ease: "power3.out",
  overwrite: true
});

//----------------------------------------
//  アコーディオン処理
//  
//----------------------------------------
class accordion {
  constructor() {}

  //----------------------------------------
  //
  //  GSAPを使ってアコーディオンのアニメーションを制御
  //
  //----------------------------------------
  set_accordions__details() {
    //  全てのdata属性"accordion-details"を取得
    //  直接<datails>タグを取得してもよい。しかし万が一他の処理と被る場合を考慮し指定している
    const details = document.querySelectorAll('[data-js="accordion-details"]');
    //  全detailsに対して処理
    details.forEach(element => {
      //  <summary> Q 質問部分
      const summary = element.querySelector('[data-js="accordion-summary"]');
      //  <div> A 出現する返答部分
      const content = element.querySelector('[data-js="accordion-content"]');

      //  <summary>部分にクリックイベント追加
      summary.addEventListener("click", event => {
        // デフォルトの挙動を無効化
        event.preventDefault();
        //  "data-open"と"open"の二種類の属性の違い
        //  "open" : <details>の開閉機能に関わるフラグ
        //  "data-open" : アイコンや開閉のアニメーション切り替えフラグ
        //  タイミングが違う

        //  クリック時data-openがtrueならアコーディオン閉じる処理
        if (element.dataset["open"] == "true") {
          // アイコン操作用フラグを倒す
          element.dataset["open"] = "false";
          content.dataset["open"] = "false";
          // アニメーション実行
          closingAnim(content, element).restart();

          //  クリック時data-openがfalseならアコーディオン開く処理
        } else {
          //  必要とあらば他の全detailsを閉じる処理

          // アイコン操作用フラグを立てる
          element.dataset["open"] = "true";
          content.dataset["open"] = "true";
          // 属性"open"を付与
          element.setAttribute("open", "true");

          // アニメーション実行
          openingAnim(content).restart();
        }
      });
    });
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration() {
    //  全アコーディオンを取得して設定
    this.set_accordions__details();
  }
}

/***/ }),

/***/ "./src/js/mylib/content/btn_gototop.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/content/btn_gototop.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buttonGotoTop; }
/* harmony export */ });
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
class buttonGotoTop {
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
    return document.documentElement.scrollTop > this.overPosition;
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

/***/ }),

/***/ "./src/js/mylib/content/btn_humburger.js":
/*!***********************************************!*\
  !*** ./src/js/mylib/content/btn_humburger.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buttonHumburger; }
/* harmony export */ });
//----------------------------------------
//  ハンバーガー
//----------------------------------------
class buttonHumburger {
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
    document.addEventListener('touchmove', this.disableScroll, {
      passive: false
    });
    document.addEventListener('mousewheel', this.disableScroll, {
      passive: false
    });
  }
  removeScrollStop() {
    document.removeEventListener('touchmove', this.disableScroll, {
      passive: false
    });
    document.removeEventListener('mousewheel', this.disableScroll, {
      passive: false
    });
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
      gsap.fromTo('.p-spmenu__background .stripe', {
        x: "100%"
      }, {
        x: "0%",
        stagger: {
          each: 0.1,
          from: "end"
        }
      });
      gsap.fromTo('.p-spmenu__inner', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.5
      });
      this.addScrollStop();
    }
    //  閉じた スクロール解除
    else {
      gsap.fromTo('.p-spmenu__background .stripe', {
        x: "0%"
      }, {
        x: "100%",
        stagger: {
          each: 0.1,
          from: "end"
        }
      });
      gsap.fromTo('.p-spmenu__inner', {
        opacity: 1
      }, {
        opacity: 0
      });
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
      gsap.fromTo('.p-spmenu__background .stripe', {
        x: "0%"
      }, {
        x: "100%",
        stagger: {
          each: 0.1,
          from: "end"
        }
      });
      gsap.fromTo('.p-spmenu__inner', {
        opacity: 1
      }, {
        opacity: 0
      });
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
    if (768 <= ww) {
      this.close();
    }
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_inner, i_ullia, i_contact) {
    //  クリックイベントセット
    this.btn.addEventListener("click", () => {
      this.open();
    });
    //  ul liのメニューがクリックされたら閉じる
    let str_ullia = i_inner + " " + i_ullia;
    let spmenu_li_a = document.querySelectorAll(str_ullia);
    spmenu_li_a.forEach(lia => {
      lia.addEventListener("click", () => {
        this.close();
      });
    });

    //  コンタクトボタンが押されたら閉じる
    let str_contact = i_inner + " " + i_contact;
    //console.log(str_contact);
    let spmenu_contact = document.querySelectorAll(str_contact);
    spmenu_contact.forEach(lia => {
      lia.addEventListener("click", () => {
        this.close();
      });
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/content/common.js":
/*!****************************************!*\
  !*** ./src/js/mylib/content/common.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   commonGSAP: function() { return /* binding */ commonGSAP; },
/* harmony export */   "default": function() { return /* binding */ Common; }
/* harmony export */ });
//----------------------------------------
//  共有変数グループ
//----------------------------------------
class commonGSAP {
  constructor(i_tl, i_tar) {
    this.tl = i_tl;
    this.tar = t_tar;
    this.state = 0;
  }
}
class Common {
  constructor() {
    //  ワードプレス : function.phpで請け渡しているワードプレスの配列
    this.wp_imagePath = wp_var.imgpath; //  画像パス
    this.wp_rootpath = wp_var.rootpath; //  ルートパス
    this.wp_template = wp_var.templatepath;

    //  静的サイト : header.phpで受け渡しているワードプレス画像のパス
    //this.wp_imagePath = wp_imgpath;     //  画像パス
    //this.wp_rootpath = wp_rootpath;    //  ルートパス
    this.wp_csspath = this.wp_rootpath + "/assets/css/";
    this.wp_fontpath = this.wp_rootpath + "/assets/webfonts/";

    //  header.phpで受け渡しているワードプレスのテンプレートファイル名
    //this.wp_template = wp_template;
    //  recaptchaのキー
    this.reCAPTCHA_site_key = "6Ld-v70lAAAAAH-rR-4E3UJISYwe2Kd7ihL7FM20";
    this.gsap = [];
    this.gsaptar = [];
    this.gsapstate = [];
  }

  //------------------------------------------------
  //  指定要素内の指定タグをspanで分割する
  //------------------------------------------------
  splitTarget_span(i_target, i_tag, i_reverse) {
    let divs = i_target;
    let spanText = null;
    //  タグが指定されていない場合
    if (i_tag == "" || i_tag == null) {
      //console.log("タグ指定なし : " );
      //console.log(i_target );
      divs = i_target;
      //  指定されている場合は取得
      spanText = divs.innerHTML;
    } else {
      //console.log("タグ指定あり : " + i_tag );
      divs = i_target.querySelector(i_tag);
      console.log(i_target);
      spanText = divs.innerHTML;
    }
    //  要素内文字をspanで分割
    let newText = "";
    spanText.split('').forEach(char => {
      //  反転 :全て頭に入れ込む
      if (i_reverse) {
        newText = '<span>' + char + '</span>' + newText;
      } else {
        newText += '<span>' + char + '</span>';
      }
    });
    divs.innerHTML = newText;
    return divs;
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration() {}
}

/***/ }),

/***/ "./src/js/mylib/content/consolejoke.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/content/consolejoke.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ consolejoke; }
/* harmony export */ });
//========================================================
//
//  consoleログに出力する ネタ
//
//========================================================
class consolejoke {
  constructor() {
    this.common = null;
  }
  task() {}
  toDataURL(src, callback) {
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
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
  eventRegistration(i_common) {
    //  共有変数クラスの確保
    this.common = i_common;
    //  画像のURL
    let imgurl = this.common.wp_imagePath;
    let sizew = 400;
    let sizeh = 256;

    //  送信完了ページ
    if (this.common.wp_template == "page-contact-complete.php") {
      imgurl += 'console/ari.png';
      sizew = 300;
      sizeh = 534;
    }
    //  通常時
    else {
      var random = Math.floor(Math.random() * 2);
      //  ランダム画像
      switch (random) {
        case 0:
          imgurl += 'console/otu.png';
          break;
        case 1:
          imgurl += 'console/kyuukei.png';
          sizew = 200;
          sizeh = 250;
          break;
        default:
          imgurl += 'console/otu.png';
          break;
      }
    }
    let imgdataurl = "";
    //  画像のbase64変換
    this.toDataURL(imgurl, function (dataURL) {
      imgdataurl = dataURL;
      let txt_css = 'background-image: ';
      txt_css += 'url("' + imgdataurl + '");';
      txt_css += ' background-size: contain; background-repeat : no-repeat; background-position : bottom; ';
      txt_css += 'padding: calc(' + sizeh + 'px / 2) calc(' + sizew + 'px / 2); color : transparent;  border-bottom: solid 8px lightgreen;';
      //  画像をconsoleに出力
      console.log('%c ', txt_css);
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/content/contactform.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/content/contactform.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contactForm; }
/* harmony export */ });
//========================================================
//
//  コンタクトフォーム
//
//========================================================
class contactForm {
  constructor() {
    //  変数
    //  メールアドレス正規表現(Regular expressions)
    this.regex = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    this.rx_tel = /^0\d{9,10}$/;
    this.CFI_NONE = 0; // 入力が空
    this.CFI_OK = 1; //  入力受付
    this.CFI_WARNING = 2; //  入力内容に問題

    this.id_ContactName = document.querySelector('#js_contact_name');
    this.id_ReqName = document.querySelector('#req-name');
    this.id_ContactEMail = document.querySelector('#js_contact_email');
    this.id_ReqEMail = document.querySelector('#req-email');
    this.id_ReqEMail2 = document.querySelector('#req-email2');
    this.id_ContactCheck = document.querySelector('#js_contact_check');
    this.id_ContactMessage = document.querySelector('#js_contact_message');
    this.id_ReqMessage = document.querySelector('#req-message');
    this.pp_cpl = document.querySelector('.p-contact__form-checkpplabel');
    this.cci = document.querySelector('.p-common-check-icon');
    this.pfcf_form = document.querySelector('#id_contact');
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.mdlpp = document.querySelector('#js-mdlpp');
    this.mdlpp_overlay = document.querySelector('#js-mdlpp-overlay');
    this.mdlpp_close = document.querySelector('#js-mdlpp-close');
    this.mdlpp_open = document.querySelector('#js-mdlpp-open');
    this.pointY = 0;
    this.in_yourname = document.querySelector('input[name="your-name"]');
    this.in_yourmail = document.querySelector('input[name="your-email"]');
    this.in_yourmessage = document.querySelector('textarea[name="your-message"]');
    this.in_yourcheck = document.querySelector('input[name="your-check"]');
    this.in_submit = document.querySelector("input[name='your-submit']");
    this.bn_submit = document.querySelector("button[name='your-submit']");
    this.init();
  }

  //  javaScript
  init() {
    let elements = document.getElementsByTagName('button');
    for (let element of elements) {
      if (element.getAttribute('data-id')) {
        element.addEventListener('click', testLoad);
      }
    }
  }

  //  読み込み時の処理
  loadTask() {
    var list = document.getElementsByTagName("input");
    for (var i = 0; i < list.length; i++) {
      if (list[i].type == 'email' || list[i].type == 'password' || list[i].type == 'text' || list[i].type == 'number' || list[i].type == 'tel') {
        list[i].addEventListener("keydown", event => {
          return this.submitStop(event);
        });
      }
    }
  }
  submitStop(e) {
    if (!e) var e = window.event;
    if (e.keyCode == 13) {
      // 現在の要素からフォーカスを外す
      document.activeElement.blur();
      return false;
    }
  }

  //--------------------------------------------------
  //      contact - 送信ボタンの有効/無効
  //--------------------------------------------------
  //  サブミットのON/OFF
  enableYourSubmit(i_flag) {
    let button = this.in_submit;
    if (button == null) {
      button = this.bn_submit;
    }
    //  全てのフォーム入力が正常でない場合は有効にしない
    if (!this.check_cfi_all()) {
      i_flag = false;
    }
    if (i_flag) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
    return i_flag;
  }
  //--------------------------------------------------
  //  「に同意して送信」と連動するチェックボックス反応
  //--------------------------------------------------
  //  イベント登録
  eventRegistration = i_common => {
    //  共有変数クラスの確保
    this.common = i_common;
    if (!this.pfcf_form) return;
    this.pfcf_form.addEventListener('submit', e => {
      let ret = this.check_cfi_all(this);
    });

    // ラベルに乗った
    if (this.pp_cpl) {
      this.pp_cpl.addEventListener('mouseenter', () => {
        this.cci.addClass("hover");
      });
      //  ラベルから離れた
      this.pp_cpl.addEventListener('mouseleave', () => {
        this.cci.removeClass("hover");
      });
    }
    // 疑似チェックボックスに乗った
    if (this.cci) {
      this.cci.addEventListener('mouseenter', () => {
        this.pp_cpl.addClass("hover");
        this.cci.addClass("hover");
      });
      // 疑似チェックボックスから離れた
      this.cci.addEventListener('mouseleave', () => {
        this.pp_cpl.removeClass("hover");
        this.cci.removeClass("hover");
      });
    }
    //--------------------------------------------------
    //      モーダルリンクをクリック
    //--------------------------------------------------
    if (this.mdlpp_open) this.mdlpp_open.addEventListener('click', () => {
      //ボタンをクリックしたら
      //        console.log("モーダルクリック");
      var jsccn = document.querySelector("input[name='your-check']");
      jsccn.setAttribute("disabled", true);
      thid.mdlpp.classList.add("p-mdlpp__open"); // modalクラスにopenクラス付与
      thid.mdlpp_overlay.classList.add("p-mdlpp__open"); // overlayクラスにopenクラス付与
      //  スクロールバーを隠す前にバーの幅調べる
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      //        console.log("[sbw]" + scrollBarWidth + " : (" + window.innerWidth + ") - (" + document.body.clientWidth + ")");
      this.body.style.paddingRight = scrollBarWidth + 'px';
      this.header.style.paddingRight = scrollBarWidth + 'px';
      this.body.style.overflowY = 'hidden'; // 本文の縦スクロールを無効
      jsccn.attr("disabled", false);
    });
    //  ×ボタンをクリックしたら
    if (this.mdlpp_close) this.mdlpp_close.addEventListener('click', () => {
      this.close_modalpp();
    });
    //  オーバーレイをクリックしたら
    if (this.mdlpp_overlay) this.mdlpp_overlay.addEventListener('click', () => {
      this.close_modalpp();
    });
    //--------------------------------------------------------
    //  change処理  ContactFormInput
    //--------------------------------
    //  お名前
    this.in_yourname.addEventListener('change', () => {
      this.judge_cfi_name();
    });
    // メールアドレス
    this.in_yourmail.addEventListener('change', () => {
      this.judge_cfi_email();
    });
    // 問い合わせ内容
    // テキストエリアはhtmlのタグにjsを入れて判定する
    if (this.in_yourmessage) {
      this.in_yourmessage.addEventListener('change', () => {
        this.judge_cfi_message();
      });
      this.in_yourmessage.addEventListener('keyup', () => {
        this.judge_cfi_message();
      });
    }
    //--------------------------------
    //  チェックボックス
    if (this.in_yourcheck) this.in_yourcheck.addEventListener('change', () => {
      this.judge_cfi_checkbox();
    });

    //--------------------------------
    //作成したrecaptha関数をフォームデータ送信時に実行されるように設定
    var form_id_contact = document.getElementById("id_contact");
    if (form_id_contact) {
      form_id_contact.addEventListener('submit', e => {
        this.grc_sendFormData(this.common, e);
      });
    }
  }; // eventRegistration END

  //--------------------------------
  //  モーダルを閉じる
  //--------------------------------
  close_modalpp = () => {
    //        console.log("モーダルクローズ");
    this.mdlpp.classList.remove("p-mdlpp__open"); // overlayクラスからopenクラスを外す
    this.mdlpp_overlay.classList.remove("p-mdlpp__open"); // overlayクラスからopenクラスを外す
    this.body.style.overflowY = 'auto'; // 本文の縦スクロールを有効
    this.body.style.paddingRight = '0px';
    this.header.style.paddingRight = '0px';
  };

  //--------------------------------------------------------
  //  changeで使う関数 ContactFormInput
  //  お名前
  // 有効判定を返す
  check_cfi_name() {
    let inp = this.id_ContactName;
    // 空入力
    if (inp.value === "") {
      return this.CFI_NONE;
    } else {
      return this.CFI_OK;
    }
  }
  // 有効判定を返し、状態によって警告処理
  judge_cfi_name() {
    let inp = this.id_ContactName;
    let req1 = this.id_ReqName;
    //        inp.css('border', '1px solid red');
    inp.classList.add("c-form__border-required");
    inp.classList.remove("c-form__border-normal");
    req1.style.display = 'none';
    // 空入力
    if (inp.value === "") {
      req1.style.display = 'block'; // 警告「必須項目です」
      return this.enableYourSubmit(false);
    } else {
      // なんらかの入力あり
      inp.classList.add("c-form__border-normal");
      inp.classList.remove("c-form__border-required");
      this.enableYourSubmit(true);
    }
    return true;
  }
  //--------------------------------
  // メール入力
  check_cfi_email() {
    let inp = this.id_ContactEMail;
    // 空入力
    if (inp.value === "") {
      return this.CFI_NONE;
    } else {
      if (this.regex.test(inp.value)) {
        return this.CFI_OK;
      }
      return this.CFI_WARNING;
    }
  }
  // 有効判定を返し、状態によって警告処理
  judge_cfi_email() {
    let inp = this.id_ContactEMail;
    let req1 = this.id_ReqEMail;
    let req2 = this.id_ReqEMail2;
    inp.classList.add("c-form__border-required");
    inp.classList.remove("c-form__border-normal");
    req1.style.display = 'none';
    req2.style.display = 'none';
    // 空入力
    if (inp.value === "") {
      req1.style.display = 'block'; // 警告「必須項目です」
      return this.enableYourSubmit(false);
      // なんらかの入力あり
    } else {
      //  有効そうなアドレスが入力されている
      if (this.regex.test(inp.value)) {
        inp.classList.add("c-form__border-normal");
        inp.classList.remove("c-form__border-required");
        this.enableYourSubmit(true);
        //  無効な文字列
      } else {
        // console.log("[cfi_email] NG:" + inp.val());
        req2.style.display = 'block'; //  警告「有効なアドレスを入力して下さい」
        return this.enableYourSubmit(false);
      }
    }
    return true;
  }
  //--------------------------------------------------------
  //  お問い合わせ内容
  check_cfi_message() {
    let inp = this.id_ContactMessage;
    // 空入力
    if (inp.value === "") {
      return this.CFI_NONE;
    } else {
      return this.CFI_OK;
    }
  }
  // 有効判定を返し、状態によって警告処理
  judge_cfi_message() {
    let inp = this.id_ContactMessage;
    let req1 = this.id_ReqMessage;
    inp.classList.add("c-form__border-required");
    inp.classList.remove("c-form__border-normal");
    req1.style.display = 'none';
    // 空入力
    if (inp.value === "") {
      req1.style.display = 'block'; // 警告「必須項目です」
      return this.enableYourSubmit(false);
      // なんらかの入力あり
    } else {
      inp.classList.add("c-form__border-normal");
      inp.classList.remove("c-form__border-required");
      this.enableYourSubmit(true);
    }
    return true;
  }
  //--------------------------------------------------------
  //  チェックボックス
  check_cfi_checkbox() {
    // チェックボックスだけ配列なので注意
    let inp = this.id_ContactCheck;
    return inp[0].checked;
  }
  judge_cfi_checkbox() {
    let inp = this.id_ContactCheck;
    inp.style.border = '1px solid red';
    let ret = this.check_cfi_checkbox();
    // チェックあり
    if (ret) {
      this.judge_cfi_all();
      this.enableYourSubmit(true);

      //なし
    } else {
      return this.enableYourSubmit(false);
    }
    return true;
  }
  //--------------------------------
  //  インプット全部チェック
  check_cfi_all() {
    let ret = true;
    if (this.check_cfi_name() !== this.CFI_OK) ret = false;
    if (this.check_cfi_email() !== this.CFI_OK) ret = false;
    if (this.check_cfi_message() !== this.CFI_OK) ret = false;
    return ret;
  }
  //  インプット全部チェックと処理
  judge_cfi_all() {
    let ret = true;
    if (!this.judge_cfi_name()) ret = false;
    if (!this.judge_cfi_email()) ret = false;
    if (!this.judge_cfi_message()) ret = false;
    return ret;
  }
  //--------------------------------------------------
  //      google reCAPTCHA
  //--------------------------------------------------
  //reCAPTCHA認証APIを実行して返ってきたトークンをフォームに設置する関数
  grc_sendFormData(i_common, e) {
    const reCAPTCHA_site_key = i_common.reCAPTCHA_site_key;
    //元のsubmitをいったんキャンセル
    if (e) e.preventDefault();
    //  recaptcha実行 actionは任意の文字指定(管理画面で反映される)
    grecaptcha.ready(function () {
      //  recaptcha実行 actionは任意の文字指定(管理画面で反映される)
      grecaptcha.execute(reCAPTCHA_site_key, {
        action: 'submit'
      }).then(function (token) {
        //  Add your logic to submit to your backend server here.
        //console.log('grecaptcha.execute token=' + token);
        //   recaptcha認証後のトークンをフォームで送信するために設定
        document.getElementById('grc_token').value = token;
        //console.log('フォームデータを送信');
        document.getElementById("id_contact").submit();
      }).catch(function (e) {
        console.error(e);
        alert('reCAPTCHAでのエラーが発生したためフォームデータを送信できません');
        return false;
      });
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/content/delayloader.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/content/delayloader.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DelayLoader; }
/* harmony export */ });
//----------------------------------------
//
//  Google Speed Insight 対策
//  遅延読み込み処理
//
//----------------------------------------
class DelayLoader {
  constructor() {}

  //----------------------------------------
  //  フォント CSS 読み込み
  //  本体と分けて読み込む場合
  //----------------------------------------
  delayloadFont() {
    var fontUrl = this.wp_csspath + 'font.css';
    let fontcss_notosansjp = '<link href="' + this.wp_fontpath + 'googlefonts/NotoSansJP/NotoSansJP-Medium.woff2" as="font" type="font/woff2" crossorigin>';
    let fontcss_fontface = '<link href="' + this.wp_csspath + 'font.css">';
    let elmhead = document.querySelector("head");
    elmhead.insertAdjacentHTML("beforeend", fontcss_notosansjp);
    elmhead.insertAdjacentHTML("beforeend", fontcss_fontface);
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_common) {
    this.common = i_common;
    this.wp_csspath = this.common.wp_csspath;
    this.wp_fontpath = this.common.wp_fontpath;
    //this.delayloadFont();
  }
}

/***/ }),

/***/ "./src/js/mylib/content/disp_loader.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/content/disp_loader.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ displayLoader; }
/* harmony export */ });
//========================================================
//
//  コンテンツ / 読み込み画面
//
//========================================================
class displayLoader {
  constructor() {
    this.init();
  }

  //  javaScript
  init() {
    let elements = document.getElementsByTagName('button');
    for (let element of elements) {
      if (element.getAttribute('data-id')) {
        element.addEventListener('click', testLoad);
      }
    }
    this.stopAllLoad();
  }
  startLoad(id) {
    if (!id) return;
    document.getElementById(id).style.visibility = 'visible';
    setTimeout(self.stopAllLoad, 3000);
  }
  testLoad() {
    let dataId = "loading";
    this.startLoad(dataId);
    this.stopAllLoad();
  }
  stopAllLoad() {
    let elements = document.getElementsByClassName('l-loader');
    for (let element of elements) {
      element.classList.add("hide");
      //  消しておく
      setTimeout(function () {
        element.classList.add("delete");
      }, 1000);
    }
  }

  //  イベント登録
  eventRegistration() {
    //この登録の仕方だとthisがここになっしまいエラー。
    //window.addEventListener('load', this.testLoad );
    //  ここでアロー関数で登録するとthisが使える
    window.addEventListener('load', () => {
      this.testLoad();
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/content/header.js":
/*!****************************************!*\
  !*** ./src/js/mylib/content/header.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ partsHeader; }
/* harmony export */ });
//----------------------------------------
//  ヘッダー処理
//  現在使っているのは
//  指定位置超えたらヘッダー浮かすという処理のみ
//----------------------------------------
class partsHeader {
  constructor(i_header) {
    this.lheader = document.querySelector(i_header);
    this.body = document.querySelector("body");
    this.set = 200; //ウインドウ上部からどれぐら
    this.dispPosition = 0; // 120;    //  ヘッダーの位置による

    this.boxTop = new Array();
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
  }
}

/***/ }),

/***/ "./src/js/mylib/content/itemCounters.js":
/*!**********************************************!*\
  !*** ./src/js/mylib/content/itemCounters.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ itemcounters; }
/* harmony export */ });
//------------------------------------------------------------
//  
//  サイトのあらゆる要素に対応できるアイテムカウンター
//
//------------------------------------------------------------
class itemcounters {
  constructor() {}

  //----------------------------------------
  //  PHPを実行
  //----------------------------------------
  runPHP = (i_fileName, i_id) => {
    const fname = this.wptaskdir + i_fileName; //assets/task/以下のファイルを実行
    var xhr = new XMLHttpRequest(); // (1)XMLHttpRequestオブジェクトを作成
    // (2)onreadystatechangeイベントで処理の状況変化を監視
    xhr.onreadystatechange = function (data) {
      //  失敗
      if (this.readyState == 4 && this.status == 200) {
        //    console.log( this.responseText );
      }
      if (this.readyState == 4 && this.status == 500) {
        //    console.log( this.responseText );
      }
      //  成功
      //console.log("成功しとる");
    };
    xhr.open('POST', fname, true); // (3)HTTPのPOSTメソッドとアクセスする場所を指定
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // (3)送信する内容の形式を設定
    let send_txt = 'id=' + i_id;
    xhr.send(send_txt); // (4)HTTPリクエストを送信
  };

  //----------------------------------------
  //  要素によって処理を分類
  //----------------------------------------
  set_itemcounters() {
    let ics = document.querySelectorAll('[data-jsitemcounter]');
    const runphp = this.runPHP;
    //  全に対して処理
    ics.forEach(el => {
      //  id取得
      const el_id = el.dataset['jsitemcounter']; //  "about_myvideo"など
      const el_id_play = el_id + "_play";
      const el_id_end = el_id + "_end";
      //  この要素が何タグが判別
      switch (el.tagName) {
        //  videoタグ
        case 'VIDEO':
          //console.log( "itemcounter : video :[ID] " + el_id );
          //  両方ともスマホで発火しない？
          //  再生時に発火
          el.addEventListener('playing', function () {
            //  phpの実行、IDを渡す
            runphp("task_itemcounter.php", el_id_play);
          });
          //  再生終了時に発火
          el.addEventListener('ended', function () {
            runphp("task_itemcounter.php", el_id_end);
          });
          break;
      }
    });
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_common) {
    this.common = i_common;
    this.wptaskdir = this.common.wp_rootpath + "/assets/php/task/";

    //  全アイテムカウンター取得して設定
    this.set_itemcounters();
  }
}

/***/ }),

/***/ "./src/js/mylib/content/oscheck.js":
/*!*****************************************!*\
  !*** ./src/js/mylib/content/oscheck.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ osCheck; }
/* harmony export */ });
//----------------------------------------
//
//  OS Check
//
//----------------------------------------
class osCheck {
  static isPC = 0;
  static isSP = 1;
  static isTab = 2;
  constructor() {
    this.dispUserAgent();

    //  iOSのバージョンがある
    if (this.getiOSVersion()) {
      let body = document.getElementsByTagName('body')[0];
      //body.classList.add('iOS');
    }
  }

  //  userAgent確認用領域があれば、取得情報を出力
  dispUserAgent(i_output) {
    let div_ua = document.querySelector(i_output);
    if (div_ua) {
      div_ua.innerText = navigator.userAgent;
    }
  }

  //  bodyタグにclass付与する
  markBody() {
    //  識別したbodyにclass付与
    if (navigator.userAgent.indexOf('iPhone') > 0) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add('iPhone');
    }
    //  識別したbodyにclass付与
    if (navigator.userAgent.indexOf('Macintosh') > 0) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add('Macintosh');
    }
    if (navigator.userAgent.indexOf('iPad') > 0) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add('iPad');
    }
    if (navigator.userAgent.indexOf('Android') > 0) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add('Android');
    }
  }

  //  ユーザーエージェントの確認
  checkUA() {
    var ua = navigator.userAgent;
    //    console.log(ua);
    // スマートフォン用の記述

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
      //    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
      //        console.log("isSP");
      return isSP;

      // タブレット用の記述
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      //        console.log("isTab");
      return isTab;

      // PC用の記述
    } else {
      //        console.log("isPC");
      return isPC;
    }
  }

  //  iOSバージョン
  getiOSVersion() {
    return parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false;
  }
}

/***/ }),

/***/ "./src/js/mylib/content/pagebackground.js":
/*!************************************************!*\
  !*** ./src/js/mylib/content/pagebackground.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ pageBackGround; }
/* harmony export */ });
//----------------------------------------
//
//  コンテンツの処理
//  背景
//  ※単純にz-indexの上下関係でうまくまとめた方が無難の可能性。
//  要素が取れないなどでJS暴発でファーストビューに現れる可能性もアリ
//
//----------------------------------------
class pageBackGround {
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
    if (this.herobg) {
      if (scroll > this.hidePosition) {
        this.herobg.classList.add("hide");
      } else {
        this.herobg.classList.remove("hide");
      }
    }

    //  about背景
    if (this.aboutbg) {
      //  一定距離よりも前なら
      if (scroll < this.hidePosition_about) {
        this.aboutbg.classList.remove("disp");
      } else {
        this.aboutbg.classList.add("disp");
      }
    }

    //  contact背景
    if (this.contactbg) {
      //  一定距離よりも前なら 背景隠す
      if (scroll < this.hidePosition_contact) {
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
    if (this.herobg) {
      if (scroll > this.hidePosition) {
        this.herobg.classList.remove("hide");
      }
    }

    //  about
    //  読み込み時に指定位置より先なら表示
    if (this.aboutbg) {
      if (this.hidePosition_about < scroll) {
        this.aboutbg.classList.add("disp");
      }
    }

    //  contact
    //  読み込み時に指定位置より先なら表示
    if (this.contactbg) {
      if (this.hidePosition_contact < scroll) {
        this.contactbg.classList.add("disp");
      }
    }
  }
}

/***/ }),

/***/ "./src/js/mylib/content/tabgroup.js":
/*!******************************************!*\
  !*** ./src/js/mylib/content/tabgroup.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ tabGroup; }
/* harmony export */ });
//----------------------------------------
//
//  タブグループ
//
//----------------------------------------
class tabGroup {
  constructor() {
    this.tabgroup = [];
    this.common = null;
    //  スライドの情報アニメ制御用
    this.tl_slideinfo_rect = [];
  }

  //----------------------------------------
  //  タブ全体閉じる
  //----------------------------------------
  tabdisableall(i_group) {
    //  タブの取得
    let tabs = i_group.querySelectorAll('[data-js="tabitem"]');
    //  全タブのstate削除
    tabs.forEach(tab => {
      delete tab.dataset.state;
    });
  }

  //----------------------------------------
  //  タブをアクティブに
  //----------------------------------------
  tabactive(i_tab) {
    i_tab.dataset['state'] = "open";
  }
  activeTab(i_tab) {
    //  親(グループ)を取得する
    let parent = i_tab.parentNode;
    //  グループの全てを非アクティブにする
    this.tabdisableall(parent);
    //  グループの自分のタブをアクティブにする
    this.tabactive(i_tab);
    return parent;
  }
  //----------------------------------------
  //  タブの設定 : WORKS
  //----------------------------------------
  registTab_works(i_tab, i_group) {
    //  タブのホバー設定
    i_tab.addEventListener("mouseover", () => {
      this.activeTab(i_tab);
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
      switch (key) {
        case 'worksswiper1':
          ci = 1;
          break;
        case 'worksswiper2':
          ci = 2;
          break;
        case 'worksswiper3':
          ci = 3;
          break;
        default:
          ci = 0;
          break;
      }
      //  変更したい番号と現在の番号が違っている場合は変更演出
      if (swi.activeIndex != ci) {
        //  一回全ての情報を非表示
        bgiw.forEach(iw => {
          iw.classList.remove("disp");
        });
        bgiw.item(ci - 1).classList.add("disp");
        let bgsi = bgiw.item(ci - 1).querySelectorAll('.l-works__slideinfo__inner');
        let bgsp = bgs.querySelectorAll('picture'); //  スライドの下のpictureを取得して配列にする
        swi.slideTo(ci);
        //  [背景] 配列があれば実行 ( pictureがない空スライドもある )
        if (0 < bgsp.length) {
          gsap.fromTo(bgsp.item(ci - 1), {
            scale: 1
          }, {
            scale: 1.05,
            duration: 5
          });
        }
        //  [INFO] info以下のdivを全て取得
        if (0 < bgsi.length) {
          let bgsii = bgsi[0].querySelectorAll('div');
          let cnt = 0;
          //  タイトル・時期・日数・一言
          bgsii.forEach(tar => {
            let rects = tar.querySelectorAll('.rect'); //  rectはdiv１つにつき1つなので1回のみ
            if (0 < rects.length) {
              let rect = rects.item(0);
              const tl = gsap.timeline();
              //  ※直接要素に変数を保存してしまうことで個別対応する
              //  ※gsapも直接要素に追加しているようなので真似する
              if (rect.tl_slide_info) rect.tl_slide_info.progress(1); // すでに前回のtlがあれば終了させる
              rect.tl_slide_info = tl; //  新しくセットする

              gsap.set(tar, {
                opacity: 0,
                y: 10
              });
              gsap.set(rect, {
                x: "0%"
              });
              tl.to(tar, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power1.out",
                delay: cnt * 0.2
              }).to(rect, {
                x: "105%"
              });
              cnt++;
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
      if (swi.activeIndex != ci) {
        let bgsp = [...bgs.item(ci).querySelectorAll('p')];
        bg.dataset['disp'] = "false";
        //  変えなくていい
        //swi.slideTo(ci);
        //  映像スライドとは違って逆に止まっている方がよい感じ
        if (0 < bgsp.length) {
          // gsap.fromTo(bgsp[ci],{scale:1},{scale:1.05, duration :5} );
        }
      }
    });
  }

  //----------------------------------------
  //  タブの設定 : SKILL
  //----------------------------------------
  registTab_skill(i_tab) {
    //  タブのクリック設定
    i_tab.addEventListener("click", () => {
      this.activeTab(i_tab);
      //--------------------------------
      //  タブごとの固有処理( data-key指定 )
      let key = i_tab.dataset['key'];
      //  swiperの取得
      let swi = null;
      swi = this.common.swipers['skill'];
      switch (key) {
        case 'skillswiper1':
          swi.slideTo(0);
          break;
        case 'skillswiper2':
          swi.slideTo(1);
          break;
        default:
          break;
      }
    });
  }

  //----------------------------------------
  //  タブグループの設定
  //  グループ内のタブしか検索しないのでグループ名は不要
  //----------------------------------------
  registGroup(i_group) {
    //  開いているタブ番号を設定
    i_group.dataset['tabindex'] = 0;

    //  タブの取得
    let tabs = i_group.querySelectorAll('[data-js="tabitem"]');
    let groupkey = i_group.dataset['key'];
    switch (groupkey) {
      case "works":
        tabs.forEach(tab => {
          this.registTab_works(tab, i_group);
        });
        break;
      case "skill":
        tabs.forEach(tab => {
          this.registTab_skill(tab);
        });
        break;
    }
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_common) {
    //  共有変数クラスの確保
    this.common = i_common;
    //  data-js : タブグループの取得
    let tabgroup = document.querySelectorAll('[data-js="tabgroup"]');
    //  タブグループの数だけループ
    tabgroup.forEach(tgroup => {
      this.registGroup(tgroup);
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/gsap/eegsap.js":
/*!*************************************!*\
  !*** ./src/js/mylib/gsap/eegsap.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ eegsap; }
/* harmony export */ });
//----------------------------------------
//
//  etienu GSAP アニメーション
//
//----------------------------------------
class eegsap {
  constructor() {}

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_common) {
    //  共有変数クラスの確保
    this.common = i_common;
    this.registanim__heading_eff();
    this.registanim__header_li();
    this.registanim__works_bg_box();
    this.registanim__works_bg_box_left2();
    this.registanim__works_bg_box_right();
    this.registanim__works_bg_box_right2();
    this.registanim__works_bg_box_right3();
    this.registanim__parallax_simple();
    this.registanim__intro__svg();
    this.registanim__intro__txtmarker();
    this.registanim__mv__particle();
  }

  //----------------------------------------
  //  c-title modan
  //  ポートフォリオ : 見出しh2のアニメーション
  //----------------------------------------
  registanim__heading_eff() {
    let textWrappers = document.querySelectorAll('[data-jstype="heading-eff"]');
    textWrappers.forEach(textWrapper => {
      let bgcl, bgcr, bg, lead;
      let base = textWrapper.querySelector('[data-headingparts="base"]'); //  ベース
      if (base == null) return;
      bg = base.querySelector('[data-headingparts="bg"]');
      bgcl = base.querySelector('[data-headingparts="boxlu"]'); //  左上角
      bgcr = base.querySelector('[data-headingparts="boxrb"]'); //  右下角
      lead = base.querySelector('[data-headingparts="lead"]');
      let str_tglaction = 'play pause resume';
      if (bgcl) {
        gsap.fromTo(bgcl, {
          autoAlpha: 0,
          rotate: -270,
          scale: 0.5
        }, {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: bg,
            start: 'top center+=50%',
            toggleActions: str_tglaction
          }
        });
      }
      if (bgcr) {
        gsap.fromTo(bgcr, {
          autoAlpha: 0,
          rotate: 270,
          scale: 0.5
        }, {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: bg,
            start: 'top center+=50%',
            toggleActions: str_tglaction
          }
        });
      }

      //  背景
      if (bg) {
        gsap.fromTo(bg, {
          autoAlpha: 1,
          x: '10%'
        }, {
          autoAlpha: 1,
          duration: 3,
          x: 0,
          ease: 'Power4.easeOut',
          scrollTrigger: {
            trigger: bg,
            start: 'top center+=50%',
            toggleActions: str_tglaction
          }
        });
      }
      if (lead) {
        gsap.fromTo(lead, {
          x: '-160%'
        }, {
          rotate: 0,
          x: '-50%',
          ease: 'Power4.easeOut',
          duration: 2,
          scrollTrigger: {
            trigger: lead,
            //アニメーションが始まるトリガーとなる要素
            toggleActions: str_tglaction,
            start: 'top center+=50%' //, //アニメーションが始まる位置を指定
            //end: "+=500"
          }
        });
      }
    });
  }
  //----------------------------------------
  //  ポートフォリオ : ヘッダー li
  //----------------------------------------
  registanim__header_li() {
    let header_li_a_span = document.querySelectorAll('.p-header__nav ul li a span');
    let header_li_a = document.querySelectorAll('.p-header__nav ul li a');
    //文字列（テキスト）を分割しspanで囲む
    function js_li_splitspan() {
      header_li_a_span.forEach(target => {
        let newText = '';
        const text = target.textContent;
        const result = text.split('');
        for (let i = 0; i < result.length; i++) {
          newText += '<span>' + result[i] + '</span>';
        }
        target.innerHTML = newText;
      });
    }
    js_li_splitspan();
    header_li_a.forEach(h_lia => {
      let li_a_i = h_lia.querySelector('[data-parts="boxlt"]'); //  左上角
      let li_a_u = h_lia.querySelector('[data-parts="boxrb"]'); //  右下角
      let li_a_span = h_lia.querySelector('[data-parts="text"]'); //  aの下の文字列格納span

      // 初期の状態(取ってきたドット・テキストは最初は非表示)
      // ドットとテキストを非表示
      gsap.set([li_a_i, li_a_u], {
        opacity: 0
      });
      // timelineを作成（各アニメーションを連動させる）
      const tl = gsap.timeline();
      // toで状態を変化させる
      let ani = tl.to(li_a_i, {
        rotate: 180,
        duration: 0.2,
        opacity: 1
      }
      //'+=.1' // 前のアニメーションが完了した0.5秒後にドットを非表示
      ).to(li_a_u, {
        rotate: 180,
        duration: 0.3,
        // 0.3秒かけてアニメーション
        opacity: 1
      }
      //'+=0.1'
      );
      ani.pause();
      h_lia.addEventListener("mouseenter", () => ani.play());
      h_lia.addEventListener("mouseleave", () => ani.reverse());
    });
  }

  //----------------------------------------
  //  works bg box
  //  ポートフォリオ : works左の箱
  //----------------------------------------
  registanim__works_bg_box() {
    let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxl"]');
    eff_classs.forEach(target => {
      var tar = target;
      //            console.log("[tar]" + tar);
      gsap.set(tar, {
        opacity: 0.3,
        rotate: 0,
        repeat: -1
      });
      const tl = gsap.timeline();
      //const tl2 = gsap.timeline();
      tl.to(tar, {
        rotate: 360,
        duration: 50,
        opacity: 0.3,
        ease: Linear.easeNone,
        repeat: -1,
        //  逆再生完了時にタイムライン最後に戻る
        onReverseComplete: () => {
          if (tl.reversed()) {
            tl.progress(1);
            //console.log("reverse中");
          }
          //console.log("reverseコンプ");
        },
        onComplete: () => {
          if (!tl.reversed()) {
            tl.progress(0);
            //console.log("通常再生中");
          }
          //console.log("onComplete");
        }
      });
      //  保存
      this.common.gsap['skill_gear'] = {
        tar: tar,
        tl: tl,
        state: 0
      };
    });
  }

  //----------------------------------------
  //  works bg box
  //  ポートフォリオ : works左の箱2
  //----------------------------------------
  registanim__works_bg_box_left2() {
    let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxl2"]');
    if (eff_classs.length <= 0) return;
    eff_classs.forEach(target => {
      var tar = target;
      gsap.set(tar, {
        opacity: 0.3,
        rotate: 0
      });
      const tl = gsap.timeline();
      tl.to(tar, {
        rotate: -360,
        duration: 50,
        opacity: 0.3,
        ease: Linear.easeNone,
        repeat: -1,
        //  逆再生完了時にタイムライン最後に戻る
        onReverseComplete: () => {
          if (tl.reversed()) {
            tl.progress(1);
          }
        },
        onComplete: () => {
          if (!tl.reversed()) {
            tl.progress(0);
          }
        }
      });
      //  保存
      this.common.gsap['skill_gear_min'] = {
        tar: tar,
        tl: tl,
        state: 0
      };
    });
  }

  //----------------------------------------
  //  works bg box
  //  ポートフォリオ : works右の箱
  //----------------------------------------
  registanim__works_bg_box_right() {
    let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr"]');
    if (eff_classs.length <= 0) return;
    eff_classs.forEach(target => {
      var tar = target;
      gsap.set(tar, {
        opacity: 0.3,
        rotate: 0
      });
      const tl = gsap.timeline();
      tl.to(tar, {
        rotate: -360,
        duration: 30,
        opacity: 0.3,
        repeat: -1
      });
    });
  }
  //----------------------------------------
  //  works bg box
  //  ポートフォリオ : works右の箱
  //----------------------------------------
  registanim__works_bg_box_right2() {
    let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr2"]');
    if (eff_classs.length <= 0) return;
    eff_classs.forEach(target => {
      var tar = target;
      gsap.set(tar, {
        opacity: 0.3,
        rotate: 45
      });
      const tl = gsap.timeline();
      tl.to(tar, {
        rotate: -15,
        duration: 10,
        opacity: 0.3,
        ease: "sine.out"
      }).to(tar, {
        rotate: 45,
        duration: 10,
        opacity: 0.3,
        ease: "sine.out"
      });
      tl.repeat(-1);
    });
  }
  //----------------------------------------
  //  works bg box
  //  ポートフォリオ : works右の箱3
  //----------------------------------------
  registanim__works_bg_box_right3() {
    let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr3"]');
    if (eff_classs.length <= 0) return;
    eff_classs.forEach(target => {
      var tar = target;
      gsap.set(tar, {
        opacity: 0.3,
        rotate: 10,
        scale: 0.8
      });
      const tl = gsap.timeline();
      tl.to(tar, {
        rotate: 0,
        duration: 3,
        scale: 1.0,
        opacity: 0.3,
        ease: "linear"
      }).to(tar, {
        rotate: -10,
        duration: 5,
        scale: 0.8,
        opacity: 0.3,
        ease: "sine.out"
      }).to(tar, {
        rotate: 0,
        duration: 3,
        scale: 1.0,
        opacity: 0.3,
        ease: "linear"
      }).to(tar, {
        rotate: 10,
        duration: 10,
        scale: 0.8,
        opacity: 0.3,
        ease: "sine.out"
      });
      tl.repeat(-1);
    });
  }

  //----------------------------------------
  //  ポートフォリオ : パララックス
  //----------------------------------------
  registanim__parallax_simple() {
    let eff_classs = document.querySelectorAll('[data-eff="gsapparallax"]');
    if (eff_classs.length <= 0) return;
    eff_classs.forEach(target => {
      var tar = target;
      const y = tar.getAttribute('data-y') || -100;
      gsap.fromTo(tar, {
        y: y,
        scale: 1.2
      }, {
        //  反対方向に移動→上から下
        y: -y,
        scrollTrigger: {
          trigger: ".l-hero",
          //start: 'top bottom',
          //end: 'bottom top',
          scrub: 1
          //markers: true,
        }
      });
    });
  }

  //----------------------------------------
  //  ポートフォリオ : intro : SVG
  //----------------------------------------
  registanim__intro__svg() {
    let eff_classs = document.querySelectorAll('[data-eff="gsapintro_svg"]');
    if (eff_classs.length <= 0) return;
    //  svg機能をセットした大枠グループ
    eff_classs.forEach(tar => {
      let objs = tar.querySelectorAll('.l-intro__idealp');
      //  大枠内のグループアイテム1個
      objs.forEach(tar => {
        //  グループ内spanの文字列を全て分割
        this.common.splitTarget_span(tar, "", false);
        let objctrl = tar;
        let objp1span = tar.querySelectorAll('span');
        let path_txt = "";
        let tl_delay = 0.1;
        gsap.set(objp1span, {
          opacity: 0
        });
        const tl = gsap.timeline();
        //  指定data-indexによってパスを作成
        switch (objctrl.dataset["index"]) {
          case "1":
            path_txt = [{
              x: 0,
              y: 0
            }, {
              x: -100,
              y: 0
            }, {
              x: -200,
              y: 0
            }, {
              x: -300,
              y: -100
            }];
            tl_delay = 0;
            break;
          //  上から
          case "2":
            path_txt = [{
              x: 0,
              y: 0
            }, {
              x: -100,
              y: 0
            }, {
              x: -200,
              y: 0
            }, {
              x: -300,
              y: 100
            }];
            tl_delay = 0.5;
            break;
          //  下から
          default:
            break;
        }
        tl.to(objp1span, {
          scrollTrigger: {
            trigger: tar,
            start: 'top bottom',
            //スクロールイベントの開始地点
            end: 'bottom top',
            //スクロールイベントの終了地点
            // 以下、onイベント
            onEnter: () => {
              tl.play();
            },
            onEnterBack: () => {
              tl.play();
            },
            onLeaveBack: () => {
              tl.pause();
            },
            onLeave: () => {
              tl.pause();
            }
          }
        }).to(objp1span, {
          duration: 2,
          opacity: 1,
          delay: tl_delay,
          stagger: {
            each: 0.1,
            from: "end"
          },
          motionPath: {
            path: path_txt,
            autoRotate: true,
            curviness: 1,
            start: 1,
            end: 0
          },
          ease: "power1.easeOut"
        });
        //  範囲に入るまでタイムライン全体を停止
        tl.pause();
      }); // objs.forEach((tar)
    }); // eff_classs.forEach((tar)
  }

  //----------------------------------------
  //  ポートフォリオ : intro : マーカー
  //----------------------------------------
  registanim__intro__txtmarker() {
    let eff_classs = document.querySelectorAll('[data-eff="gsapintro_txtmarker"]');
    if (eff_classs.length <= 0) return;
    //  svg機能をセットした大枠グループ
    eff_classs.forEach(target => {
      let tar = target;
      gsap.set(tar, {
        opacity: 1
      });
      const tl = gsap.timeline();
      tl.to(tar, {
        scrollTrigger: {
          trigger: tar,
          start: 'top bottom-=35%',
          //スクロールイベントの開始地点
          end: 'bottom top',
          //スクロールイベントの終了地点
          once: true,
          // 以下、onイベント
          onEnter: () => {
            tl.play();
            tar.dataset["disp"] = "true";
          },
          onEnterBack: () => {
            tl.play();
            tar.dataset["disp"] = "true";
          }
        }
      });
      //  範囲に入るまでタイムライン全体を停止
      tl.pause();
    }); // eff_classs.forEach((tar)
  } // registanim__intro__txtmarker()

  //================================================
  //  パーティクル作成 PC
  //----------------------------------------
  registanim__mv__particle_maketl_pc(i_ang, i_vx, i_vy, i_target) {
    const tar = i_target;
    const tl = gsap.timeline().fromTo(tar, {
      x: i_vx * 20 + "vw",
      y: i_vy * 0 + "vw",
      transformOrigin: '50% 50%',
      scale: 1,
      duration: 0
    }, {
      duration: 0.5 + Math.random() * 0.5,
      ease: "Power1.easeOut",
      x: i_vx * 40 + "vw",
      y: i_vy * 200 + "px",
      scale: 0,
      opacity: 1
    });
    return tl;
  }
  //----------------------------------------
  //  パーティクル作成 SP
  //----------------------------------------
  registanim__mv__particle_maketl_sp(i_ang, i_vx, i_vy, i_target) {
    const tar = i_target;
    const tl = gsap.timeline().fromTo(tar, {
      x: i_vx * 20 + "vw",
      y: i_vy * 0 + "px",
      transformOrigin: '50% 50%',
      scale: 1,
      duration: 0
    }, {
      duration: 0.5 + Math.random() * 0.5,
      ease: "Power1.easeOut",
      x: i_vx * 70 + "vw",
      y: i_vy * 100 + "px",
      scale: 0,
      opacity: 1
    });
    return tl;
  }

  //----------------------------------------
  //  ポートフォリオ : mv : パーティクル
  //----------------------------------------
  registanim__mv__particle() {
    let eff_classs = document.querySelectorAll('[data-eff="mv_particle"]');
    if (eff_classs.length <= 0) return;
    let parstl = [];
    let parstlsp = [];
    let btntl = null;
    const maxcount = 20;
    const angleone = 360 / 20;
    //  svg機能をセットした大枠グループ
    eff_classs.forEach(tar => {
      // たくさんの矩形を配置
      for (let i = 0; i < maxcount; i++) {
        const par = document.createElement("div");
        par.classList.add("particle");
        tar.appendChild(par);
      }
      let pars = tar.querySelectorAll('.particle');
      let cnt = 0;
      pars.forEach(tar => {
        cnt++;
        let ang = cnt * angleone + Math.floor(Math.random() * angleone);
        if (ang < 0) ang += 360;
        if (360 <= ang) ang -= 360;
        //  角度からベクトル計算
        let vx = Math.sin(ang * Math.PI / 180);
        let vy = Math.cos(ang * Math.PI / 180);
        const tl = gsap.timeline();
        const tlsp = gsap.timeline();
        parstl[parstl.length] = tl;
        parstlsp[parstlsp.length] = tlsp;
        tl.add(this.registanim__mv__particle_maketl_pc(ang, vx, vy, tar));
        tlsp.add(this.registanim__mv__particle_maketl_sp(ang, vx, vy, tar));
        //  終わらせておく事で非表示
        tl.progress(1);
        tlsp.progress(1);
      });
    }); // eff_classs.forEach((tar)
    //  タイトル取得
    let obj_btn = [...document.querySelectorAll('.l-hero__heading')];
    let obj_btndivs = null;
    let obj_btndiv = null;
    if (0 < obj_btn.length) {
      obj_btndivs = [...obj_btn[0].querySelectorAll('div')];
    }
    if (0 < obj_btndivs.length) {
      obj_btndiv = obj_btndivs[0];
      //  タイトルのホバー : CSSで設定してもGSAPの設定の方が強く残ってしまうため
      obj_btndiv.addEventListener("mouseover", () => {
        if (btntl && btntl.isActive()) {
          return;
        }
        gsap.set(obj_btndiv, {
          scale: 1.00
        });
      });
      obj_btndiv.addEventListener("mouseleave", () => {
        if (btntl && btntl.isActive()) {
          return;
        }
        gsap.set(obj_btndiv, {
          scale: 1.00
        });
      });
      //  タイトルのクリック
      obj_btndiv.addEventListener("click", () => {
        //  アニメーション群をcommonで管理して、タイムラインが終わっているのかを確認したい
        //  タイトルアニメが終わっていればクリック可能にする
        //  自分のアニメが実行中ならクリック処理しない
        if (parstl[0].isActive() || parstlsp[0].isActive()) {
          return;
        }
        const ww = window.outerWidth;
        //  SP以下
        if (ww < 768) {
          for (var i = 0; i < parstlsp.length; i++) {
            parstlsp[i].play(0);
          }
          //  タブ以上
        } else {
          // パーティクル全て実行
          for (var i = 0; i < parstl.length; i++) {
            parstl[i].play(0);
          }
        }
        //  ボタン本体に対するアニメーション
        gsap.set(obj_btndiv, {
          scale: 1
        });
        const tl = gsap.timeline();
        btntl = tl;
        tl.to(obj_btndiv, {
          duration: 0.05,
          ease: "power1.inOut",
          scale: 0.9
        }).to(obj_btndiv, {
          duration: 0.2,
          ease: "power1.inOut",
          scale: 1.0
        });
      });
    }
  } // registanim__intro__txtmarker()
} //class eegsap

/***/ }),

/***/ "./src/js/mylib/gsap/eegsap_scrollbutton.js":
/*!**************************************************!*\
  !*** ./src/js/mylib/gsap/eegsap_scrollbutton.js ***!
  \**************************************************/
/***/ (function() {

//----------------------------------------
//  scollbutton : 「繰り返し」
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('.js-gsap__scrollbutton');
  eff_classs.forEach(target => {
    let divs = target.querySelectorAll('.icon span');
    //console.log("[target]" + target);
    for (var i = 0; i < divs.length; i++) {
      var iy = i * 0.5;
      var bar = divs[i];
      //console.log("[i]" + i + "[len]" + divs.length + "[bar]" + bar);

      gsap.set(bar, {
        opacity: 0,
        y: 0,
        rotate: 45
      });
      const tl = gsap.timeline();
      tl.to(bar, {
        delay: iy,
        duration: 0
      }).to(bar, {
        opacity: 1,
        duration: 0
      }).to(bar, {
        y: 40,
        rotate: 45,
        opacity: 0,
        duration: 1,
        repeat: -1
      });
    }
  });
}

/***/ }),

/***/ "./src/js/mylib/gsap/eegsap_surface.js":
/*!*********************************************!*\
  !*** ./src/js/mylib/gsap/eegsap_surface.js ***!
  \*********************************************/
/***/ (function() {

//----------------------------------------
//  surface : 「ふわっと出る」
//----------------------------------------
// gsapは恐らくtransitionと干渉する。
{
  let eff_classs = document.querySelectorAll('[data-js="surface__up"]');
  eff_classs.forEach(target => {
    let st_start = "top center";
    if (target.classList.contains('ts_c30')) {
      st_start += '+=30%';
    } else if (target.classList.contains('ts_c40')) {
      st_start += '+=40%';
    } else if (target.classList.contains('ts_c50')) {
      st_start += '+=50%';
    } else if (target.classList.contains('ts_c60')) {
      st_start += '+=60%';
    } else if (target.classList.contains('ts_c70')) {
      st_start += '+=70%';
    } else {
      st_start += '+=50%';
    }
    gsap.fromTo(target, {
      autoAlpha: 0,
      rotate: 0,
      scale: 1,
      y: 100
    }, {
      y: 0,
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: st_start
      }
    });
  });
}
//----------------------------------------
//  surface : 「ふわっと出る」グループ
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('.js-surface__upgroup');
  eff_classs.forEach(target => {
    let divs = target.querySelectorAll('div');
    gsap.fromTo(divs, {
      autoAlpha: 0,
      rotate: 0,
      scale: 0.9,
      y: 20
    }, {
      y: 0,
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: 'top center+=50%'
      },
      stagger: {
        amount: 1,
        //アニメーション間隔の合計時間
        from: "start",
        // 動作を始める要素を指定
        ease: "sine.in"
      }
    });
  });
}

//----------------------------------------
//  surface : 「中央集合」
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('.js-surface__gather-center');
  eff_classs.forEach(target => {
    let divs = target.querySelectorAll('div');
    gsap.fromTo(divs, {
      rotate: 0,
      scale: 0.9,
      x: -1000
    }, {
      x: 0,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: 'top center+=50%'
      }
    });
  });
}

//----------------------------------------
//  surface : 「左から右」
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('[data-js="surface__ltor"]');
  eff_classs.forEach(target => {
    gsap.fromTo(target, {
      autoAlpha: 0,
      rotate: -45,
      scale: 0.9,
      x: -1000
    }, {
      x: 0,
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: 'top center+=50%'
      }
    });
  });
}

//----------------------------------------
//  surface : 「左から右」
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('[data-js="surface__rtol"]');
  eff_classs.forEach(target => {
    gsap.fromTo(target, {
      autoAlpha: 0,
      rotate: 45,
      scale: 0.9,
      x: 1000
    }, {
      x: 0,
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: 'top center+=50%'
      }
    });
  });
}

//----------------------------------------
//  surface : ゲーム文字列
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('.js-surface__gametext');
  //文字列（テキスト）を分割しspanで囲む
  eff_classs.forEach(target => {
    let newText = '';
    const text = target.innerHTML; //  タグあり
    const result_br = text.split('<br>');
    for (let j = 0; j < result_br.length; j++) {
      const result = result_br[j].split('');
      for (let i = 0; i < result.length; i++) {
        newText += '<b>' + result[i] + '</b>';
      }
      newText += '<br>';
    }
    target.innerHTML = newText;
  });
  eff_classs.forEach(target => {
    let spans = target.querySelectorAll('b');
    gsap.fromTo(spans, {
      autoAlpha: 0,
      rotate: 0,
      scale: 1,
      y: 100
    }, {
      y: 0,
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: 'top center+=50%'
      },
      stagger: {
        amount: 2,
        //アニメーション間隔の合計時間
        from: "start",
        // 動作を始める要素を指定
        ease: "sine.in"
      }
    });
  });
}

//----------------------------------------
//  surface : ヒーローセクション専用 : 2 演出含む
//----------------------------------------
{
  let eff_classs = document.querySelectorAll('[data-js="surface__heroheading2"]');
  eff_classs.forEach(target => {
    let divs = target.querySelectorAll('div');
    //  要素内文字をspanで分割
    let newText = "";
    let spanText = divs[0].innerHTML;
    //  文字列からタグ(要素付き)を取り除く
    spanText.split('').forEach(char => {
      newText += '<span>' + char + '</span>';
      //  、があったら強引にSP用<br?導入
      if (char == "、") {
        newText += '<br class="u-display__sp">';
      }
    });
    divs[0].innerHTML = newText;
    divs.forEach(item => {
      gsap.set(item, {
        opacity: 0,
        marginTop: "10px"
      });
    });
    let spans = divs[0].querySelectorAll('span');
    gsap.to(spans, {
      duration: 0.5,
      autoAlpha: 1,
      rotateY: '0deg',
      stagger: {
        each: 0.1
      },
      scrollTrigger: {
        trigger: divs[0],
        start: 'bottom bottom'
      }
    });
    gsap.set(divs[0], {
      opacity: 0,
      marginTop: "10px",
      rotate: 0
    }); //  想像をカタチに
    const tl = gsap.timeline();
    tl.to(divs[0], {
      marginTop: "10px",
      duration: 1,
      opacity: 1
    }).to(divs[0], {
      marginTop: "0px",
      backgroundColor: "rgba(144,238,144,1)",
      padding: "0px 60px",
      duration: 1
    });
  });
}

/***/ }),

/***/ "./src/js/mylib/myexternallinks.js":
/*!*****************************************!*\
  !*** ./src/js/mylib/myexternallinks.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ myExternalLinks; }
/* harmony export */ });
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
class myExternalLinks {
  constructor() {
    //  全てのa hrefを取得
    this.hrefs = document.querySelectorAll('a');
  }

  //  外部リンクの修正
  fixingExternalLinks() {
    this.hrefs.forEach(target => {
      let url = target.href;
      var reg = new RegExp("^(http?:)?\/\/" + location.hostname);
      var regs = new RegExp("^(https?:)?\/\/" + location.hostname);
      //console.log("[External]" + url  + " [ reg ] :  " + reg );
      if (url.match(reg) || url.match(regs) || url.charAt(0) === "/" || url.charAt(0) === "#") {
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
          if (false) {}
        }
      }
    });
  }
}

/***/ }),

/***/ "./src/js/mylib/slide.js":
/*!*******************************!*\
  !*** ./src/js/mylib/slide.js ***!
  \*******************************/
/***/ (function() {

//--------------------------------------------------------
// slideUp
//--------------------------------------------------------
const slideUp = (el, duration = 300) => {
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
  }, duration);
};

//--------------------------------------------------------
// slideDown
//--------------------------------------------------------
const slideDown = (el, duration = 300) => {
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") {
    display = "block";
  }
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
  }, duration);
};

//--------------------------------------------------------
// slideToggle
//--------------------------------------------------------
const slideToggle = (el, duration = 300) => {
  if (window.getComputedStyle(el).display === "none") {
    return slideDown(el, duration);
  } else {
    return slideUp(el, duration);
  }
};

/***/ }),

/***/ "./src/js/mylib/smoothscroll.js":
/*!**************************************!*\
  !*** ./src/js/mylib/smoothscroll.js ***!
  \**************************************/
/***/ (function() {

const pHeader = document.querySelector('header');
const headerHeight = pHeader ? pHeader.offsetHeight : 0;
const adjustHeader = 0;
const smoothScrollSpeed = 500;
//  全てのa href="#"を取得
let alinks = document.querySelectorAll('a[href^="#"]');
//  全てのaにクリックイベント設定
alinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // クリックされたときのデフォルトの挙動を防ぐ
    e.preventDefault();
    let href = anchor.getAttribute("href");
    //console.log('[a]:' + href);

    // href属性の#を取り除いた部分と一致するIDを取得
    const target = document.getElementById(href.replace('#', ''));

    //取得した要素の位置を取得するために、getBoundingClientRect()を呼び出し、ページ上の位置を計算。
    //headerの高さを引いて、スクロール位置がヘッダーの下になるように調整します。
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    // window.scrollTo()を呼び出して、スクロール位置を設定します。behaviorオプションをsmoothに設定することで、スムーズなスクロールを実現します。
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/***/ }),

/***/ "./src/js/mylib/swiper-setting.js":
/*!****************************************!*\
  !*** ./src/js/mylib/swiper-setting.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ swiperGroup; }
/* harmony export */ });


//----------------------------------------
//  swiperグループ
//----------------------------------------
class swiperGroup {
  constructor() {
    this.common = null;
    this.swipers = [];
  }

  //----------------------------------------
  //  個別 : WORKS
  //----------------------------------------
  make_works(i_swiper, i_name) {
    this.swipers[i_name] = new Swiper(i_swiper, {
      initialSlide: 3,
      loop: false,
      allowTouchMove: false,
      //  ドラッグ無効
      //  ページネーション
      centeredSlides: false,
      //アクティブなスライドを中央に表示
      speed: 500,
      effect: "fade",
      spaceBetween: 0,
      //スライド間の距離
      slidesPerView: 1,
      //スライダーのコンテナ上に同時表示する枚数
      breakpoints: {
        //小さい順に設定する
        599: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 1
        }
      },
      updateOnWindowResize: true,
      //  ウインドウサイズ変更時自動再計算
      autoplay: false
    });
  }

  //----------------------------------------
  //  個別 : SKILL
  //----------------------------------------
  make_skill(i_swiper, i_name) {
    // swiperslider
    this.swipers[i_name] = new Swiper(i_swiper, {
      loop: false,
      allowTouchMove: false,
      //  ドラッグ無効
      //  ページネーション
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: "clickable"
      },
      centeredSlides: true,
      //アクティブなスライドを中央に表示
      spaceBetween: 16,
      //スライド間の距離を16pxに
      slidesPerView: 1,
      //スライダーのコンテナ上に2枚同時に表示
      autoplay: false,
      on: {
        //  スライド開始
        slideChangeTransitionStart: function (swiper) {
          // swiperに保存した自身のSwiperGroupへのポインタ
          let pc = swiper.parentClass;
          let tl = pc.common.gsap['skill_gear'].tl;
          let tlm = pc.common.gsap['skill_gear_min'].tl;
          switch (swiper.activeIndex) {
            case 0:
              tl.timeScale(20);
              tlm.timeScale(20);
              break;
            case 1:
              tl.timeScale(-20);
              tlm.timeScale(-20);
              break;
          }
        },
        //  スライド終了
        slideChangeTransitionEnd: function (swiper) {
          let pc = swiper.parentClass;
          let tl = pc.common.gsap['skill_gear'].tl;
          let tlm = pc.common.gsap['skill_gear_min'].tl;
          switch (swiper.activeIndex) {
            case 0:
              tl.timeScale(1);
              tlm.timeScale(1);
              break;
            case 1:
              tl.timeScale(-1);
              tlm.timeScale(-1);
              break;
          }
        }
      },
      breakpoints: {
        //小さい順に設定する
        // 599px以上の場合
        599: {
          slidesPerView: 1 //スライドを2枚表示
        },
        // 1024px以上の場合
        1024: {
          slidesPerView: 1 //スライドを3枚表示
        }
      }
    });
    this.swipers[i_name].parentClass = this;
  }

  //----------------------------------------
  //  swiperの作成
  //----------------------------------------
  registSwiper(i_swiper, i_name) {
    switch (i_name) {
      case "skill":
        this.make_skill(i_swiper, i_name);
        break;
      case "works":
        this.make_works(i_swiper, i_name);
        break;
    }
  }

  //----------------------------------------
  //  各種イベントの登録
  //----------------------------------------
  eventRegistration(i_common) {
    this.common = i_common;
    //  .swiper : swiperを全て取得
    let swipergroup = document.querySelectorAll('.swiper');
    //  swiperの数だけループ
    swipergroup.forEach(swiper => {
      let name = swiper.dataset.name;
      //  swiperの識別名称を取得
      if (name) this.registSwiper(swiper, name);
    });
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************************!*\
  !*** ./src/js/mylib/_myindex.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide */ "./src/js/mylib/slide.js");
/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slide__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _smoothscroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smoothscroll */ "./src/js/mylib/smoothscroll.js");
/* harmony import */ var _smoothscroll__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_smoothscroll__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _content_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content/common */ "./src/js/mylib/content/common.js");
/* harmony import */ var _content_btn_gototop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content/btn_gototop */ "./src/js/mylib/content/btn_gototop.js");
/* harmony import */ var _content_btn_humburger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/btn_humburger */ "./src/js/mylib/content/btn_humburger.js");
/* harmony import */ var _content_tabgroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./content/tabgroup */ "./src/js/mylib/content/tabgroup.js");
/* harmony import */ var _content_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./content/header */ "./src/js/mylib/content/header.js");
/* harmony import */ var _content_disp_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./content/disp_loader */ "./src/js/mylib/content/disp_loader.js");
/* harmony import */ var _content_contactform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./content/contactform */ "./src/js/mylib/content/contactform.js");
/* harmony import */ var _content_pagebackground__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./content/pagebackground */ "./src/js/mylib/content/pagebackground.js");
/* harmony import */ var _content_oscheck__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./content/oscheck */ "./src/js/mylib/content/oscheck.js");
/* harmony import */ var _adjustviewport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./adjustviewport */ "./src/js/mylib/adjustviewport.js");
/* harmony import */ var _myexternallinks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./myexternallinks */ "./src/js/mylib/myexternallinks.js");
/* harmony import */ var _content_accordion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./content/accordion */ "./src/js/mylib/content/accordion.js");
/* harmony import */ var _content_delayloader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./content/delayloader */ "./src/js/mylib/content/delayloader.js");
/* harmony import */ var _content_itemCounters__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./content/itemCounters */ "./src/js/mylib/content/itemCounters.js");
/* harmony import */ var _content_consolejoke__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./content/consolejoke */ "./src/js/mylib/content/consolejoke.js");
/* harmony import */ var _gsap_eegsap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./gsap/eegsap */ "./src/js/mylib/gsap/eegsap.js");
/* harmony import */ var _gsap_eegsap_surface__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./gsap/eegsap_surface */ "./src/js/mylib/gsap/eegsap_surface.js");
/* harmony import */ var _gsap_eegsap_surface__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_gsap_eegsap_surface__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _gsap_eegsap_scrollbutton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./gsap/eegsap_scrollbutton */ "./src/js/mylib/gsap/eegsap_scrollbutton.js");
/* harmony import */ var _gsap_eegsap_scrollbutton__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_gsap_eegsap_scrollbutton__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _swiper_setting__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./swiper-setting */ "./src/js/mylib/swiper-setting.js");
 //  jQueryのtoggle再現
 //  スムーススクロール
 //  共有変数の入れ物
 //  トップに戻るボタン
 //  ハンバーガー
 //  タブグループ
 //  ヘッダー
 //  ローディング画面
 //  コンタクトフォーム
 //  背景処理
 //  OSの判別
 //  ビューポート調整
 //  外部リンク
 //  アコーディオン
 //  遅延読み込み

 //  WordPress アイテムカウンター
 //  コンソールジョーク

//  GSAPアニメーション

//  ヒーローのアニメーション

//  ヒーローページのSCROLL

//  swiper設定
//  サイト個別の記述をするのでコンテンツに移動予定


// ブレイクポイント
const bp = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};
const varcommon = new _content_common__WEBPACK_IMPORTED_MODULE_2__["default"]();
const btnGotoTop = new _content_btn_gototop__WEBPACK_IMPORTED_MODULE_3__["default"]('.js-gotoTop', 80);
const btnHumburger = new _content_btn_humburger__WEBPACK_IMPORTED_MODULE_4__["default"]('.p-hamburger', ".l-header", ".p-spmenu");
const tabgroup = new _content_tabgroup__WEBPACK_IMPORTED_MODULE_5__["default"]();
const pHeader = new _content_header__WEBPACK_IMPORTED_MODULE_6__["default"](".l-header");
const dispLoader = new _content_disp_loader__WEBPACK_IMPORTED_MODULE_7__["default"]();
const contactform = new _content_contactform__WEBPACK_IMPORTED_MODULE_8__["default"]();
const pbg = new _content_pagebackground__WEBPACK_IMPORTED_MODULE_9__["default"]();
const oscheck = new _content_oscheck__WEBPACK_IMPORTED_MODULE_10__["default"]();
const adjustviewport = new _adjustviewport__WEBPACK_IMPORTED_MODULE_11__["default"]();
const myexternallinks = new _myexternallinks__WEBPACK_IMPORTED_MODULE_12__["default"]();
const eegsap = new _gsap_eegsap__WEBPACK_IMPORTED_MODULE_17__["default"]();
const swipergroup = new _swiper_setting__WEBPACK_IMPORTED_MODULE_20__["default"]();
const accordions = new _content_accordion__WEBPACK_IMPORTED_MODULE_13__["default"]();
const delayloader = new _content_delayloader__WEBPACK_IMPORTED_MODULE_14__["default"]();
const consolejoke = new _content_consolejoke__WEBPACK_IMPORTED_MODULE_16__["default"]();
const itemcounters = new _content_itemCounters__WEBPACK_IMPORTED_MODULE_15__["default"]();

//----------------------------------------------------
//  ロード時初期化
//----------------------------------------------------
const init = function () {
  //console.log("[テンプレート確認]" + wp_template);

  //  スワイパー
  swipergroup.eventRegistration(varcommon);
  varcommon.swipers = swipergroup.swipers;

  //  トップに戻るの設定
  btnGotoTop.eventRegistration();
  //  ヘッダーハンバーガーの設定
  btnHumburger.eventRegistration('.p-spmenu__inner', 'ul li a', '.l-header__buttonswrapper a');
  //  タブグループ
  tabgroup.eventRegistration(varcommon);
  //  アコーディオン設定
  accordions.eventRegistration();

  //  トップページのみローディング画面設定
  dispLoader.init();
  if (varcommon.wp_template == "front-page.php" || varcommon.wp_template == "home.php") {
    dispLoader.eventRegistration();
  }
  //  コンタクトフォームのページのみ設定
  if (varcommon.wp_template == "page-contact.php") {
    contactform.eventRegistration(varcommon);
  }
  //  トップページ背景
  pbg.taskLoad();

  //  OSの判別
  //  oscheck.dispUserAgent('.disp__userAgent'); //  指定クラスに出力
  oscheck.markBody(); //  bodyにクラス付け(iOS Machintosh 等)

  //  ビューポートの調整
  adjustviewport.set();

  //  外部リンクの処理
  myexternallinks.fixingExternalLinks();
  //  GSAPアニメ登録
  eegsap.eventRegistration(varcommon);
  //  WordPress用 アイテムカウンター
  itemcounters.eventRegistration(varcommon);

  //
  consolejoke.eventRegistration(varcommon);

  //
  delayloader.eventRegistration(varcommon);
};

//----------------------------------------------------
//  イベント : ロード
//----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  init();
});

//----------------------------------------------------
//  イベント : スクロール
//----------------------------------------------------
window.addEventListener('scroll', () => {
  btnGotoTop.task(); //  トップに戻るのスクロール時処理
  pHeader.scrollTask(); //  ヘッダーのスクロール時処理
  pbg.taskScroll(); //  トップページ背景スクロール処理
});

//----------------------------------------------------
//  イベント : リサイズ
//----------------------------------------------------
window.addEventListener("resize", () => {
  //  ビューポートの調整
  adjustviewport.task();
  //  SP→TAB・PCに切り替わった際
  btnHumburger.isPC_close();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map