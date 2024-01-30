<?php
/*---------------------------------------------------------
    page-about.php
    私について2
-----------------------------------------------------------*/
?>

<!DOCTYPE html>
<html lang="ja">

<?php get_template_part(GET_PATH_R('template').'layout/combo/lc-wp-header')?>


<body>
    <!-- header bar -->
    <?php get_template_part(GET_PATH_R('template').'layout/l-headerbar' ); ?>

    <!-- 一番上に戻る -->
    <?php get_template_part(GET_PATH_R('template').'object/project/p-js-gototop' ); ?>

    <!-- sub mv -->
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null,
     ['title' => '自己紹介','lead'=>'大昔の制作物'] ); ?>


<main>
<?php /* 自己紹介 */ ?>
<section class="l-about">
    <div class="l-about__background"></div>
    <div class="l-about__fadewrapper">
        <div class="l-about__inner">
            <?php /* 見出し : 自己紹介 */ ?>
            <?php get_template_part(GET_PATH_R('template').'object/project/p-heading-eff', null,
            ['title' => 'ゲーム','lead'=>"GAMECREATE",'id'=>"profile",
            'side'=>'right'] ); ?>

        <div class="l-about__lead">
            <div class="l-about__leadblock js-surface__up" data-side="right">
                <div class="l-about__leadtext">
                    <b>2001年に制作したアクションゲーム</b>
                    <br>
                    昔作ったゲームを引っ張り出したところ<br>
                    動作しましたものがあったので、<br>
                    雰囲気だけでも共有致します！<bt>
                    ( 画像反転処理が効いておらず動きが少し変です )
                    <br>
                    DirectX8・Visual C++<br>
                </div>
                <div class="l-about__leadimage">
                    <picture><img src="<?php echo GET_PATH()?>/about/about4g1.jpg" alt="game" width="600" height="300"></picture>
                </div>
            </div>


        <!-- 自己紹介に戻る -->
        <div class="l-about__button__wrapper u-margin__t80">
            <a href="/about" class="c-button__portfolio c-button__hover__back p-button__pf">
            自己紹介に戻る
            </a>
        </div>

    </div>
  </div>
</section>

<?php /* お問い合わせボタンパーツ */ ?>
<?php get_template_part(GET_PATH_R('template').'layout/contact/l-contact-conv',
        null,['color'=>'white'] ); ?>
</main>

<?php get_footer(); ?>

</body>
</html>
