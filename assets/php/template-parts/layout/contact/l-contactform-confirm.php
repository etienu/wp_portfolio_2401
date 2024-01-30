<?php
    //  コンタクトフォーム
    //  確認画面
    //
    //  基本的にフォームのデザインは同じ

?>
<section class="l-contact u-padding_ud40 u-color-bg__main">
  <div class="l-contact__inner">
    <?php /* 見出し : 送信内容の確認 CONFIRM  */ ?>
    <div class="u-margin__t20"></div>
    <div class="l-heading --center">
        <div class="c-anchor__t-100" id="contact"></div>
        <h2 class="c-ttl__heading-sub">送信内容の確認<span class="sub --center">CONFIRM</span></h2>
    </div>

    <?php
        $fDisabled  = "readonly";//"disabled"; // 送信内容に含まれなくなる
        $txt_name   = htmlspecialchars($_POST["your-name"]   , ENT_QUOTES, 'UTF-8');
        $txt_email  = htmlspecialchars($_POST["your-email"]  , ENT_QUOTES, 'UTF-8');
        $txt_message= htmlspecialchars($_POST["your-message"], ENT_QUOTES, 'UTF-8');
    ?>

    <form id="id_contact" action="<?php echo esc_url(home_url('/'));?>contact-complete#complete"
         method="POST">
        <div class="c-lead__hard u-margin__t40">
            入力された情報はお間違いありませんか？<br>
            よろしければ送信ボタンを押して下さい。
        </div>
        <div class="p-contact__progress-flow__wrapper u-margin__t20">
            <div class="p-contact__progress-flow">
                <div class="bar"></div>
                <div class="item"><div class="numberbox">1</div><div class="text">入力</div></div>
                <div class="item now"><div class="numberbox">2</div><div class="text">確認</div></div>
                <div class="item"><div class="numberbox">3</div><div class="text">完了</div></div>
            </div>
        </div>

        <ul class="p-contact__form-items">
            <!-- お名前 -->
            <li class="p-contact__form-item">
                <label for="js_contact_name">お名前</label>
                <input type="text" name="your-name" class="p-contact__form-text c-form__border-normal" id="js_contact_name" aria-required="true" placeholder="your name" value=<?php echo $txt_name;?> <?php echo $fDisabled;?>>
            </li>
            <!-- メールアドレス -->
            <li class="p-contact__form-item">
                <label for="js_contact_email">メールアドレス</label>
                <input type="email" name="your-email" class="p-contact__form-text c-form__border-normal" id="js_contact_email" aria-required="true" aria-invalid="false" placeholder="mail@address.com" value=<?php echo $txt_email;?> <?php echo $fDisabled;?>>
            </li>
            <!-- 件名があると良い-->
            <!-- お問い合わせ内容 -->
            <li class="p-contact__form-item">
                <label for="js_contact_message">お問い合わせ内容</label>
                <textarea name="your-message" class="p-contact__form-textarea c-form__border-normal" id="js_contact_message" aria-required="true" aria-invalid="false" placeholder="例 ) ご質問やお問い合わせ内容をご記入ください。" onkeyup="functions.judge_cfi_message(this)" <?php echo $fDisabled;?>><?php echo $txt_message;?></textarea>
            </li>
            <!-- 非表示 -->
            <li>
                <!-- セッショントークン -->
                <input type="hidden" name="csrf_token" value="<?php if( !empty($_POST['csrf_token']) ){ echo htmlspecialchars($_POST['csrf_token'], ENT_QUOTES); } ?>">
                <!--  reCAPTCHAトークン-->
                <input type="hidden" name="grc_token" id="grc_token">
                <!--  reCAPTCHAスコア -->
                <input type="hidden" name="grc_score" value="<?php if( !empty($args['reCAPTCHA_score']) ){ echo htmlspecialchars($args['reCAPTCHA_score'], ENT_QUOTES); } ?>">
            </li>
            <?php
                //  reCAPTCHAv3が成功している(0～0.5不合格、0.6～1.0合格)
                if( 0.6 < $args['reCAPTCHA_score'] ){
            ?>
                <li class="p-contact__form-check">
                    <button type="button" class="c-button__portfolio c-button__portfolio--back c-button__hover__back p-button__submit" onclick="history.back(-1)">修正する</button>
                    <button type="submit" name="your-submit"
                    class="c-button__portfolio c-button__portfolio--submit c-button__hover__goto p-button__submit g-recaptcha"
                    id="js_contact_submit"
                    data-sitekey="reCAPTCHA_site_key"
                    >送信する</button>
                </li>
            <?php
                //  スコアがおかしい場合は、そのメッセージと修正ボタンのみ
                }else{
            ?>
                <p>google reCAPTCHAで問題が発生したようです！<br>
                お手数ですが再度入力しなおすか、<br>
                またはSNS等で連絡をお願い致します！</p>
                <li class="p-contact__form-check">
                    <button type="button" class="c-button__portfolio c-button__portfolio--back c-button__hover__back p-button__submit" onclick="history.back(-1)">修正する</button>
                </li>
            <?php  }  ?>
        </ul>
    </form>
  </div>
</section>
