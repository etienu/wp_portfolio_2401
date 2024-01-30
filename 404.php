<?php
/*---------------------------------------------------------
    404.php
    
-----------------------------------------------------------*/
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
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null, ['title' => 'ページがありません','lead'=>'残念ながら。'] ); ?>

<main>
    <section class="p-404">
    <div class="p-404__inner">
        <?php /* 見出し : 404 404NotFound  */ ?>
        <div class="u-margin__t80"></div>
        <div class="l-heading --center"> 
            <div class="c-anchor__t-100" id="404"></div>
            <h1 class="c-ttl__heading">404<span class="sub">404 Not Fount</span></h1>
        </div>

        <div class="p-404__content">
            <p>お探しのページは見つかりませんでした。</p>
            <br>
            <p>
                ご指定のURLに間違いがなければ<br>
                ページが移動したか削除された可能性があります。<br>
                大変お手数ですが、トップページからお探し下さい。<br>
            </p>
            <!-- トップに戻る -->
            <div class="l-works__button__wrapper u-margin__t80">
                <a href="/" class="c-button__portfolio c-button__hover__back p-button__pf">
                トップに戻る
                </a>
            </div>
        </div>
    </div>

</main>

<?php /* お問い合わせボタンパーツ */ ?>
<?php get_template_part(GET_PATH_R('template').'layout/contact/l-contact-conv', null,['color'=>'green'] ); ?>

<?php get_footer(); ?>

</body>
</html>
