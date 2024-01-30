<?php
    //  コンタクトフォーム
?>
<?php
    $data_page = "";
    if( !empty($args['page']) ){
        switch( $args['page'] ){
        case "contact" : 
            $data_page =' data-page="contact"';
            break;
        }
    }
    //コンタクト - コンバージョンボタン
?>

<section class="l-contact u-color-bg__main"<?php echo $data_page;?>>
    <div class="l-contact__background">
    </div>

  <div class="l-contact__inner u-margin__t20 u-margin__b40">

    <?php
        $fDisabled = "";
        $txt_name = "";
        $txt_email = "";
        $txt_message = "";
    ?>

    <form id="id_contact" action="<?php echo esc_url(home_url('/'));?>contact-confirm#confirm"
        method="POST">
        <!-- bread-crumb -->
        <?php get_template_part('template-parts/object/project/p-breadcrumb' ); ?>
        <?php /* 見出し : 内容入力 INPUT  */ ?>
        <div class="u-margin__t20"></div>
        <div class="l-heading --center">
            <div class="c-anchor__t-100" id="contact"></div>
            <h2 class="c-ttl__heading-sub">内容入力<span class="sub --center">INPUT</span></h2>
        </div>



        <div class="c-lead__hard u-margin__t40">
            コーディング代行、お見積り等、お気軽にご相談下さい！
        </div>
        <div class="p-contact__progress-flow__wrapper u-margin__t20">
            <div class="p-contact__progress-flow">
                <div class="bar"></div>
                <div class="item now"><div class="numberbox">1</div><div class="text">入力</div></div>
                <div class="item"><div class="numberbox">2</div><div class="text">確認</div></div>
                <div class="item"><div class="numberbox">3</div><div class="text">完了</div></div>
            </div>
        </div>
        <ul class="p-contact__form-items">
            <!-- お名前 -->
            <li class="p-contact__form-item">
                <label for="js_contact_name" class="p-contact__form-mandatory">お名前</label>
                <input type="text" name="your-name" class="p-contact__form-text c-form__border-normal" id="js_contact_name" aria-required="true" placeholder="例 ) 依頼 送郎" value="<?php echo $txt_name;?>" maxlength="20">
                <span class="p-contact__form-required" id="req-name">必須項目です</span>
            </li>
            <!-- メールアドレス -->
            <li class="p-contact__form-item">
                <label for="js_contact_email" class="p-contact__form-mandatory">メールアドレス</label>
                <input type="email" name="your-email" class="p-contact__form-text c-form__border-normal" id="js_contact_email" aria-required="true" aria-invalid="false" placeholder="例 ) mail@address.com" value="<?php echo $txt_email;?>" maxlength="40">
                <span class="p-contact__form-required" id="req-email">必須項目です</span><span class="p-contact__form-required" id="req-email2">有効なメールアドレスを入力して下さい<br>例 ) nino-code@example.com</span>
            </li>
            <!-- 件名があると良い-->
            <!-- お問い合わせ内容 -->
            <li class="p-contact__form-item">
                <label for="js_contact_message" class="p-contact__form-mandatory">お問い合わせ内容</label>
                <textarea name="your-message" class="p-contact__form-textarea c-form__border-normal" id="js_contact_message" aria-required="true" aria-invalid="false" placeholder="例 ) ご質問やお問い合わせ内容をご記入ください。" maxlength="1000"><?php echo $txt_message;?></textarea>
                <span class="p-contact__form-required" id="req-message">必須項目です</span>
            </li>
            <li>
                <!-- 非表示セッショントークン -->
                <input type="hidden" name="csrf_token" value="<?php if( !empty($_SESSION['token']) ){ echo htmlspecialchars( $_SESSION['token'], ENT_COMPAT, 'UTF-8'); } ?>">
                <!--  非表示reCAPTCHAトークン-->
                <input type="hidden" name="grc_token" id="grc_token">
            </li>

            <li class="p-contact__form-check">
                <button type="submit" name="your-submit"
                class="c-button__portfolio c-button__portfolio--submit c-button__hover__goto p-button__submit g-recaptcha"
                id="js_contact_submit"
                data-sitekey="reCAPTCHA_site_key"
                disabled>確認画面へ</button>

            </li>
        </ul>
        <div class="p-contact__form-footer">
            <span class="p-contact__form-required-mes2" id="req-again">入力されていない必須項目があります。<br>確認してもう一度お試しください。</span>
            <div class="u-align__text-left u-margin__t20">
                <p>セキュリティのためreCAPTCHAを利用しています。</p>
                <p>Googleの
                <a class="c-link c-link--black" href="https://policies.google.com/privacy" target ="_blank">プライバシーポリシー</a>
                と
                <a class="c-link c-link--black" href="https://policies.google.com/terms" target ="_blank">利用規約</a>が適用されます。</p>
            </div>
        </div>
    </form>
    <?php // WP内では使用不可能タグとの事で外に書く ?>
  </div>
</section>
