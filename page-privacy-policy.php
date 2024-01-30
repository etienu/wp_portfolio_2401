<?php
/*---------------------------------------------------------
    privacy-policy.php
    プライバシーポリシー
-----------------------------------------------------------*/
?>
<?php get_template_part(GET_PATH_R('template').'layout/combo/lc-wp-header')?>

<body>

<!-- content -->
<div id="content">
    <?php get_template_part( GET_PATH_R('template').'layout/combo/lc-mv' );?>

    <!-- コンテンツの幅制御 -->
    <section class="l-main u-color-bg__main">
        <div class="l-main__inner">
            <div class="p-terms">
                <div class="c-title__h2">
                    プライバシーポリシー
                </div>
                <div class="p-terms__article u-color-font__light">
                    <?php get_template_part(GET_PATH_R('template').'article/a-privacy-policy-text')?>

                    <div class="l-wrapper__returnbutton u-margin__t40">
                        <a href="<?php echo esc_url(home_url()); ?>" class="c-button c-button--r20 c-button__hover--light u-size__h40">
                            トップページに戻る
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div><!-- /content -->

<?php get_footer(); ?>

</body>

</html>
