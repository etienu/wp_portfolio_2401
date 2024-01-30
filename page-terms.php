<?php
/*---------------------------------------------------------
    terms.php
    利用規約
-----------------------------------------------------------*/
?>
<?php get_template_part(GET_PATH_R('template').'layout/combo/lc-wp-header')?>

<body>

<div id="content">
    <?php get_template_part( GET_PATH_R('template').'layout/combo/lc-mv' );?>

    <!-- l-main -->
    <section class="l-main u-color-bg__main">
        <div class="l-main__inner">
            <!-- p-terms -->
            <div class="p-terms">
                <div class="c-title__h2">
                    <h2>利用規約</h2>
                </div>
                <div class="p-terms__article u-color-font__light">
                    <div class="p-terms__lead">
                        制定日：2022年07月22日<br>
                        最終改訂日：2022年07月22日<br>
                        <br>
                        本規約は当サイト(<?php echo home_url(); ?>)の利用者様との関係を定めるものです。<br>
                    </div>
                    <h2 class="c-title__heading">著作権・知的財産権</h2>
                    <div class="p-terms__lead">
                        当サイトで掲載している文章、画像等の著作権・知的財産権等は当サイト所有者が保有します。<br>
                        許可なく無断利用（転載、複製、譲渡、二次利用等）することを認めておりません。<br>
                    </div>
                    <h2 class="c-title__heading">リンクについて</h2>
                    <div class="p-terms__lead">
                        当サイトは基本的にリンクフリーです。<br>
                        リンクを行う場合の許可や連絡は不要です。<br>
                        記事の引用を行う際は、引用元としての記載をお願いします。<br>
                        ページ以外への直リンク、インラインフレームを使用したHTMLページ内で表示する形でのリンクはご遠慮ください。<br>
                    </div>
                    <h2 class="c-title__heading">免責事項</h2>
                    <div class="p-terms__lead">
                        <p>当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。</p>
                        <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
                        <p>当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>

                        <p>当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。</p>
                        <p>権利を侵害する目的はございません。各権利所有者におかれましては、万一掲載内容に問題がございましたら、ご本人様よりお問い合わせください。迅速に対応いたします。</p>
                        <p>当サイトで掲載している表記について、予告なく変更されることがあります。</p>
                    </div>
                    <h2 class="c-title__heading">本利用規約の変更</h2>
                    <div class="p-terms__lead">
                        当サイトは、本利用規約の内容を適宜見直し、その改善に努めます。<br>
                        本利用規約は、事前の予告なく変更することがあります。<br>
                        本利用規約の変更は、当サイトに掲載された時点で有効になるものとします。<br>
                    </div>
                    <h2 class="c-title__heading">お問い合わせ</h2>
                    <div class="p-terms__lead">
                        当サイトの<a href="<?php echo esc_url(home_url('/')).'contact' ?>" class="c-link">お問い合わせ</a>からご連絡いただけますようお願い致します。<br>
                    </div>
                    <div class="l-wrapper__returnbutton u-margin__t40">
                        <a href="<?php echo esc_url(home_url()); ?>" class="c-button c-button--r20 c-button__hover--light u-size__h40">
                            トップページに戻る
                        </a>
                    </div>
                </div>
            </div>
            <!-- p-terms : END -->
        </div>
    </section>
    <!-- l-main : END -->

</div><!-- /content -->

<?php get_footer(); ?>

</body>

</html>
