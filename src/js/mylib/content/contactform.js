//========================================================
//
//  コンタクトフォーム
//
//========================================================
export default class contactForm {
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
        if (!this.check_cfi_all()) { i_flag = false }
        if (i_flag) {
            button.disabled = false;

        } else {
            button.disabled = true;
        }
        return i_flag;
    };

    //--------------------------------------------------
    //  「に同意して送信」と連動するチェックボックス反応
    //--------------------------------------------------
    //  イベント登録
    eventRegistration = ( i_common ) => {
        //  共有変数クラスの確保
        this.common = i_common;

        if (!this.pfcf_form) return;
        this.pfcf_form.addEventListener('submit', (e) => {
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
        if (this.mdlpp_open)
            this.mdlpp_open.addEventListener('click', () => { //ボタンをクリックしたら
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
        if (this.mdlpp_close)
            this.mdlpp_close.addEventListener('click', () => {
                this.close_modalpp();
            });
        //  オーバーレイをクリックしたら
        if (this.mdlpp_overlay)
            this.mdlpp_overlay.addEventListener('click', () => {
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
        if (this.in_yourcheck)
            this.in_yourcheck.addEventListener('change', () => {
                this.judge_cfi_checkbox();
            });

        //--------------------------------
        //作成したrecaptha関数をフォームデータ送信時に実行されるように設定
        var form_id_contact = document.getElementById("id_contact");
        if (form_id_contact) {
            form_id_contact.addEventListener('submit', (e) => {
                this.grc_sendFormData(this.common, e);
            });
        }

    }// eventRegistration END

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
    }




    //--------------------------------------------------------
    //  changeで使う関数 ContactFormInput
    //  お名前
    // 有効判定を返す
    check_cfi_name() {
        let inp = this.id_ContactName;
        // 空入力
        if (inp.value === "") { return this.CFI_NONE; } else { return this.CFI_OK; }
    };
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
    };
    //--------------------------------
    // メール入力
    check_cfi_email() {
        let inp = this.id_ContactEMail;
        // 空入力
        if (inp.value === "") { return this.CFI_NONE; } else {
            if (this.regex.test(inp.value)) { return this.CFI_OK; }
            return this.CFI_WARNING;
        }
    };

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
    };
    //--------------------------------------------------------
    //  お問い合わせ内容
    check_cfi_message() {
        let inp = this.id_ContactMessage;
        // 空入力
        if (inp.value === "") { return this.CFI_NONE; } else { return this.CFI_OK; }
    };
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
    };
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
    };
    //--------------------------------
    //  インプット全部チェック
    check_cfi_all() {
        let ret = true;
        if (this.check_cfi_name() !== this.CFI_OK) ret = false;
        if (this.check_cfi_email() !== this.CFI_OK) ret = false;
        if (this.check_cfi_message() !== this.CFI_OK) ret = false;
        return ret;
    };

    //  インプット全部チェックと処理
    judge_cfi_all() {
        let ret = true;
        if (!this.judge_cfi_name()) ret = false;
        if (!this.judge_cfi_email()) ret = false;
        if (!this.judge_cfi_message()) ret = false;

        return ret;
    };

    //--------------------------------------------------
    //      google reCAPTCHA
    //--------------------------------------------------
    //reCAPTCHA認証APIを実行して返ってきたトークンをフォームに設置する関数
    grc_sendFormData(i_common, e) {
        const reCAPTCHA_site_key = i_common.reCAPTCHA_site_key;
        //元のsubmitをいったんキャンセル
        if (e) e.preventDefault();
        //  recaptcha実行 actionは任意の文字指定(管理画面で反映される)
        grecaptcha.ready(function() {
            //  recaptcha実行 actionは任意の文字指定(管理画面で反映される)
            grecaptcha.execute(reCAPTCHA_site_key, { action: 'submit' })
                .then(function(token) {
                    //  Add your logic to submit to your backend server here.
                    //console.log('grecaptcha.execute token=' + token);
                    //   recaptcha認証後のトークンをフォームで送信するために設定
                    document.getElementById('grc_token').value = token;
                    //console.log('フォームデータを送信');
                    document.getElementById("id_contact").submit();
                })
                .catch(function(e) {
                    console.error(e);
                    alert('reCAPTCHAでのエラーが発生したためフォームデータを送信できません');
                    return false;
                });
        });
    }
}
