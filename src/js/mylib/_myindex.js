import './slide'; //  jQueryのtoggle再現
import './smoothscroll'; //  スムーススクロール
import varCommon from './content/common'; //  共有変数の入れ物
import buttonGotoTop from './content/btn_gototop'; //  トップに戻るボタン
import buttonHumburger from './content/btn_humburger'; //  ハンバーガー
import tabGroup from './content/tabgroup'; //  タブグループ
import partsHeader from './content/header'; //  ヘッダー
import displayLoader from './content/disp_loader'; //  ローディング画面
import contactForm from './content/contactform'; //  コンタクトフォーム
import pageBackGround from './content/pagebackground'; //  背景処理
import osCheck from './content/oscheck'; //  OSの判別
import adjustViewport from './adjustviewport'; //  ビューポート調整
import myExternalLinks from './myexternallinks'; //  外部リンク
import Accordions from './content/accordion'; //  アコーディオン
import delayLoader from './content/delayloader'; //  遅延読み込み

import itemCounters from './content/itemCounters'; //  WordPress アイテムカウンター
import consoleJoke from './content/consolejoke'; //  コンソールジョーク


//  GSAPアニメーション
import eeGSAP from './gsap/eegsap';
//  ヒーローのアニメーション
import './gsap/eegsap_surface';
//  ヒーローページのSCROLL
import './gsap/eegsap_scrollbutton';
//  swiper設定
//  サイト個別の記述をするのでコンテンツに移動予定
 import swiperGroup from './swiper-setting';



// ブレイクポイント
const bp = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
};

const varcommon = new varCommon();
const btnGotoTop = new buttonGotoTop('.js-gotoTop', 80);
const btnHumburger = new buttonHumburger('.p-hamburger', ".l-header", ".p-spmenu");
const tabgroup = new tabGroup();
const pHeader = new partsHeader(".l-header");
const dispLoader = new displayLoader();
const contactform = new contactForm();
const pbg = new pageBackGround();
const oscheck = new osCheck();
const adjustviewport = new adjustViewport();
const myexternallinks = new myExternalLinks();
const eegsap = new eeGSAP();
const swipergroup = new swiperGroup();
const accordions = new Accordions();
const delayloader = new delayLoader();
const consolejoke = new consoleJoke();
const itemcounters = new itemCounters();


//----------------------------------------------------
//  ロード時初期化
//----------------------------------------------------
const init = function() {
    //console.log("[テンプレート確認]" + wp_template);

    //  スワイパー
    swipergroup.eventRegistration( varcommon );
    varcommon.swipers = swipergroup.swipers;

    //  トップに戻るの設定
    btnGotoTop.eventRegistration();
    //  ヘッダーハンバーガーの設定
    btnHumburger.eventRegistration('.p-spmenu__inner', 'ul li a', '.l-header__buttonswrapper a');
    //  タブグループ
    tabgroup.eventRegistration( varcommon );
    //  アコーディオン設定
    accordions.eventRegistration();

    //  トップページのみローディング画面設定
    dispLoader.init();
    if (varcommon.wp_template == "front-page.php" ||
        varcommon.wp_template == "home.php") {
        dispLoader.eventRegistration();
    }
    //  コンタクトフォームのページのみ設定
    if (varcommon.wp_template == "page-contact.php") {
        contactform.eventRegistration( varcommon );
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
    eegsap.eventRegistration( varcommon );
    //  WordPress用 アイテムカウンター
    itemcounters.eventRegistration( varcommon );

    //
    consolejoke.eventRegistration( varcommon );

    //
    delayloader.eventRegistration( varcommon );
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
