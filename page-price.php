<?php
/*---------------------------------------------------------
    page-price.php
    料金表
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
        ['title' => '料金表','lead'=>'制作時の基準となる金額です'] ); ?>

<main>
<!-- 料金表 -->
<section class="l-price">
    <div class="l-heading --center">
        <div class="c-anchor__t-100" id="contact"></div>
        <h2 class="c-ttl__heading-sub">料金<span class="sub --center">PRICE</span></h2>
    </div>
    <p class="u-margin__t40">
        お見積りする料金の基準となります。<br>
        同じ1セクションでもボリュームや実装難易度によって<br>
        料金をご相談する場合があります。<br>
    </p>

    <div class="l-price__inner">
    <?php /* 見出し : 料金 PRICE  */ ?>
    <div class="l-price__table-wrapper">
        <?php
            $hourlyWage = 3000; //  時給
            $firstDiscount = ((100-30)/100); //  % 初回割引
            $hourlyDiscount = ((100-40)/100); //  % 時給割引
            $cd_top = $hourlyWage * 15; // トップ : 3000円で45000円
            $cd_top1sec = $hourlyWage * 1.5; // トップ1sec : 3000円で4500円
            $cd_bottom = $hourlyWage * 5; // 下層ページ : 3000円で15000円
            $cd_bottom5kpx = $hourlyWage * 1.5; // 下層ページ : 3000円で4500円
            $cd_lp = $hourlyWage * 20; // LP : 
            $txt_day = date('Y/m/d');
            if( $hourlyDiscount ){
                //$cd_top = $cd_top * $hourlyDiscount;
                //$cd_top1sec = $cd_top1sec * $hourlyDiscount;
                //$cd_bottom = $cd_bottom * $hourlyDiscount;
                //$cd_bottom5kpx = $cd_bottom5kpx * $hourlyDiscount;
            }
        ?>

        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t40" data-discount>
            割引・特急
        </h3>
        <dl>
            <div>
                <dt>初回割引</dt><dd class="price"><span>30%<span></dd>
                <dd>初回お取引の会社様には割引させていただいております。</dd>
            </div>
            <div>
                <dt>時給割引</dt><dd class="price"><span>40%<span></dd>
                <dd>現在時給の割引をさせて頂いております。</dd>
            </div>
            <div>
                <dt>特急料金</dt><dd class="price"><span>30%<span></dd>
                <dd>納期が予想工数より下回っており、お急ぎ対応させて頂く場合は内容・量とのご相談ですが増額させていただく場合があります。</dd>
            </div>
        </dl>

        <!-- 静的コーディング -->
        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t40" data-bold>
            静的コーディング・LP
        </h3>
        <dl>
            <div>
                <dt>時給</dt>
                <dd class="price">
                    <span class="discountprice"><?php echo number_format( $hourlyWage * $hourlyDiscount );?>円</span>
                    <span class="normalprice"><?php echo number_format( $hourlyWage );?>円<span>
                </dd>
                <dd><?php echo $txt_day; ?>現在、計算基準となる時給です。コーディングは基本時給ベースで計算しています。<br>
                LP・WordPressどちらも同じです。
            </dd>
            </div>
            <div>
                <dt>トップページ<span>(～8セクション)</span></dt>
                <dd class="price">
                    <span class="discountprice"><?php echo number_format( $cd_top * $hourlyDiscount );?>円～</span>
                    <span class="normalprice"><?php echo number_format( $cd_top );?>円～<span>

                </dd>
                <dd>デザインを元に、HTML/CSS/JavaScriptを用いてコーディングをいたします。8セクションまでの価格です。ヘッダー・フッター、ブラウザ検証、簡易SEO対策、圧縮等の内部最適化も含まれます。</dd>
            </div>
            <div>
                <dt>トップページ<br><span>(追加1セクション)</span></dt>
                <dd class="price">
                    <span class="discountprice"><?php echo number_format( $cd_top1sec * $hourlyDiscount );?>円～</span>
                    <span class="normalprice"><?php echo number_format( $cd_top1sec );?>円～<span>
                </dd>
                <dd>1セクションごとの追加料金です。
                </dd>
            </div>
            <div>
                <dt>下層ページ<br><span>(～5000px)</span></dt>
                <dd class="price">
                    <span class="discountprice"><?php echo number_format( $cd_bottom * $hourlyDiscount );?>円～/1p</span>
                    <span class="normalprice"><?php echo number_format( $cd_bottom );?>円～/1p<span>
                </dd>
                <dd>トップページ同様、HTML/CSS/JavaScriptを用いてコーディングをいたします。5000pxまでの価格です。</dd>
            </div>
            <div>
                <dt>下層ページ<br><span>(追加5000pxごと)</span></dt>
                <dd class="price">
                    <span class="discountprice"><?php echo number_format( $cd_bottom5kpx * $hourlyDiscount );?>円～/1p</span>
                    <span class="normalprice"><?php echo number_format( $cd_bottom5kpx  );?>円～/1p<span>
                </dd>
                <dd>5000pxごとの追加料金です。レスポンシブ含みます。</dd>
            </div>
            <div>
                <dt>レスポンシブ対応</dt>
                <dd class="price">料金の50%</dd>
                <dd><b>※上記トップページ・下層ページに含まれています。</b>スマートフォンやタブレットなどの様々な端末でもデザイン崩れがないよう表示の最適化をいたします。</dd>
            </div>
        </dl>


        <!-- JavaScript -->
        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t40" data-bold>
            JavaScript
        </h3>
        <dl>
            <div>
                <dt>各種アニメーション</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>スムーススクロール、ハンバーガーは無料となります。それ以外の細かいアニメーションの実装です。</dd>
            </div>
            <div>
                <dt>スライダー</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>Swiper、Splide等のライブラリを使用します</dd>
            </div>
            <div>
                <dt>アコーディオン</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>FAQ等の開閉する機能です</dd>
            </div>
            <div>
                <dt>フェードイン</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>ふわっと出る演出です</dd>
            </div>
            <div>
                <dt>タブ切り替え</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>タブグループを作りコンテンツの表示を切り替えます</dd>
            </div>
            <div>
                <dt>ローディング画面</dt>
                <dd class="price"><?php echo number_format( 5000 );?>円</dd>
                <dd>ページ読み込み時の表示演出です</dd>
            </div>
            <div>
                <dt>モーダルウィンドウ</dt>
                <dd class="price"><?php echo number_format( 10000 );?>円</dd>
                <dd>ポップアップで表示される要素です</dd>
            </div>
            <div>
                <dt>ドロップダウンメニュー<br>メガメニュー</dt>
                <dd class="price"><?php echo number_format( 10000 );?>円</dd>
                <dd>ヘッダーのサブメニュー等、要素にホバー時ポップアップするメニューです</dd>
            </div>
            <div>
                <dt>その他アニメーション</dt>
                <dd class="price">-</dd>
                <dd>こだわりがあり難易度が高い内容など、別途ご相談</dd>
            </div>
        </dl>
        JavaScriptによる機能の実装は機能ごとの単価となります。<br>


        <!-- WordPress -->
        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t40" data-bold>
            WordPress
        </h3>
        <dl>
            <div>
                <dt>基本料金</dt><dd class="price">30,000円～</dd>
                <dd>静的ページをWordPressテーマ化し、設定・必用な機能を付与します。</dd>
            </div>
            <div>
                <dt>カテゴリ一覧ページ</dt><dd class="price">10,000円～/1個</dd>
                <dd>category.php 1ループ含みます</dd>
            </div>
            <div>
                <dt>カスタム投稿-記事詳細</dt><dd class="price">10,000円～/1個</dd>
                <dd>1ループ含みます</dd>
            </div>
            <div>
                <dt>カスタム投稿-記事一覧</dt><dd class="price">10,000円～/1個</dd>
                <dd>1ループ含みます</dd>
            </div>
            <div>
                <dt>カスタム投稿-カテゴリ一覧</dt><dd class="price">10,000円～/1個</dd>
                <dd>1ループ含みます</dd>
            </div>
            <div>
                <dt>カスタムフィールド</dt><dd class="price">10,000円～</dd>
                <dd>10箇所まで。それ以降は1箇所につき1,000円</dd>
            </div>
            <div>
                <dt>お問い合わせフォーム</dt><dd class="price">15,000円～/1p</dd>
                <dd>プラグイン込みの固定ページ</dd>
            </div>
        </dl>
        WordPressは機能ごとの価格となります。

        <!-- 公開後の対応 -->
        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t40" data-bold>
            公開後のサポート</h3>
        <dl>
            <div>
                <dt>テキスト修正・追加</dt>
                <dd class="price">3,000円/1回</dd>
                <dd>テキストの修正・追加を行います。</dd>
            </div>
            <div>
                <dt>画像差し替え・追加</dt>
                <dd class="price">3,000円/1回</dd>
                <dd>画像の修正・追加を行います。</dd>
            </div>
        </dl>
        <p class="u-flex__left">
            ※料金は目安です。依頼内容によって変動する事があります。</p>
    </div>
    <div class="l-price__table-wrapper">

        <!-- より詳しい計算 -->
        <h3 class="c-title__h3 c-title__bg c-title__bg__drop u-margin__t80" data-bold>
            より詳しい料金表</h3>
        <div class="l-price__sheetwrapper">
            <div class="l-price__sheettext">
                <p class="u-flex__left u-margin__t20">
                    スプレッドシートにて見積自動計算を<br>
                    行っていますので以下をご覧ください
                </p>
                <!-- ボタン -->
                <div class="u-margin__t20 u-margin__b20">
                    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT0Av-BqQdpmIT0WvatlGVpF63uCWsymuawXKDsD4kP9tKyxVQzwfJ7DSwNgKYI3rXJMNAKmlnD0g4H/pubhtml?gid=299761127&amp;single=true&amp;widget=true&amp;headers=false"
                        class="c-button__portfolio c-button__hover__goto p-button__pf">
                    見積計算表を見る
                    </a>
                </div>
            </div>
            <picture>
                <img src="<?php echo GET_PATH()?>/price/pricetable.jpg" alt="" width="1000" height="600">
            </picture>
        </div>
    </div><!--l-price__table__wrapper -->


    </div>

    <!-- トップに戻る -->
    <div class="l-price__button__wrapper u-margin__t80">
        <a href="/" class="c-button__portfolio c-button__hover__back p-button__pf">
        トップに戻る
        </a>
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
