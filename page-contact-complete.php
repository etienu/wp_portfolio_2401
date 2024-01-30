<?php
/*---------------------------------------------------------
    page-contact-conplete.php
    コンタクトフォーム - 完了
-----------------------------------------------------------*/
    //  セッションの開始
    if( session_status() !== PHP_SESSION_ACTIVE ) {
        session_start();
    }
?>


<?php
    include "page-contact-send-mail.php";
?>
<?php
    //var_dump( $_SESSION);
    //var_dump( $_POST);
//  セッショントークンがない、違う = 更新された
    if( !isset($_SESSION['token']) || $_SESSION['token'] !== $_POST['csrf_token'] ) {
        //  トップへリダイレクト
        wp_safe_redirect(home_url());
        exit;
    //  セッショントークンがあるのでメール送信
    }else{
        contact__sendmail( $_POST );
    }
    //  セッショントークンの削除
    //  削除する事で更新時にメール再送信されるのを防ぐ
    if( !empty($_SESSION['token']) ) {
        //  記事中で使う確認変数
        $token = $_SESSION['token'];
        unset($_SESSION['token']);
    }

?>

<!DOCTYPE html>
<html lang="ja">

<?php get_template_part(GET_PATH_R('template').'layout/combo/lc-wp-header')?>


<body>
    <?php /* header bar */ ?>
    <?php get_template_part(GET_PATH_R('template').'layout/l-headerbar' ); ?>

    <?php /* 一番上に戻る */ ?>
    <?php get_template_part(GET_PATH_R('template').'object/project/p-js-gototop' ); ?>

    <?php /* sub mv */ ?>
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null, ['title' => 'お問い合わせ完了','lead'=>''] ); ?>

<main>
    <section class="l-contact u-padding_ud40 u-color-bg__main">
    <div class="l-contact__inner">
        <div class="u-margin__t20"></div>
        <div class="l-heading --center">
            <div class="c-anchor__t-100" id="contact"></div>
            <h2 class="c-ttl__heading-sub">送信が完了しました<span class="sub --center">COMPLETE</span></h2>
        </div>

        <div class="p-contact__progress-flow__wrapper u-margin__t60">
            <div class="p-contact__progress-flow">
                <div class="bar"></div>
                <div class="item"><div class="numberbox">1</div><div class="text">入力</div></div>
                <div class="item"><div class="numberbox">2</div><div class="text">確認</div></div>
                <div class="item now"><div class="numberbox">3</div><div class="text">完了</div></div>
            </div>
        </div>

        <div class="p-contact__complete u-margin__t80">
            <?php
                if( empty($token) ){
            ?>
                更新などによりセッションが切れているようです！<br><br>
                自動返信メールが送信されている場合<br>
                お問い合わせは成功しています。<br><br>
                そうでない場合、お手数ですが<br>
                再度お問い合わせを入力するか、<br>
                他の方法でのご連絡をお願い致します！<br>
            <?php
                }else{
            ?>
                お問い合わせありがとうございます！<br>
                自動返信メールが送信されているのを<br class="u-display__sp">ご確認下さい。<br>
                お問い合わせいただいた内容については、<br class="u-display__sp">3営業日以内に返答致します。<br>
            <?php
                }
            ?>
            <?php /* トップに戻る */ ?>
            <div class="l-works__button__wrapper u-margin__t80">
                <a href="/" class="c-button__portfolio c-button__hover__back p-button__pf">
                トップに戻る
                </a>
            </div>
        </div>
    </div>

</main>

<?php get_footer(); ?>

</body>
</html>
