<?php
/*---------------------------------------------------------
    single-work.php
    制作実績 - 個別ページ
-----------------------------------------------------------*/
    $txt_githuburl = get_post_meta($post->ID, 'work_txt_githuburl', true);
    $txt_when = get_post_meta($post->ID, 'work_txt_when', true);
    $txt_url = get_post_meta($post->ID, 'work_txt_url', true);
    $meta_user = get_post_meta($post->ID, 'work_txt_user', true);
    $meta_pass = get_post_meta($post->ID, 'work_txt_pass', true);
    $txt_passurl = "";
    //  リンク先のドメイン以降を取得
    //  httpだとエラーになるが、全部httpsの方がよいのでそのままとする
    $address = "";
    if( strcmp( $txt_url, "" ) != 0 ){
        //echo "■".$txt_url."■<br>";
        if( strpos( $txt_url, "https://" ) !== false ){
            $address = explode("https://", $txt_url )[1];
        }
        else if(strpos( $txt_url, "http://" ) !== false){
            $address = explode("http://", $txt_url )[1];
        }
    }
    //  BASIC認証がある
    if( strcmp( $meta_user, "" ) != 0 ):
        //  URLに埋め込む
        $txt_passurl = "https://".$meta_user.":".$meta_pass."@".$address;
    endif;
    //echo $txt_passurl;
    //var_dump( $meta_user );
    //var_dump( $meta_pass );
    //var_dump( $address );
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
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null, ['title' => '制作実績','lead'=>get_the_title()] ); ?>

<main>
<!-- 制作実績 -->
<section class="l-works u-padding_ud100">
  <?php
    $meta_category = get_post_meta($post->ID, 'work_txt_category', true);
    $category_name = "Achievements";
    if( strcmp( $meta_category, "WordPress" ) == 0 ){
        $category_name = "WordPress";
    }else if( strcmp( $meta_category, "LP" ) == 0 ){
        $category_name = "LandingPage";
    }
  ?>
  <div class="l-works__inner">
    <?php /* 見出し : サイト名 種別  */ ?>
    <div class="l-heading"> 
        <div class="c-anchor__t-100" id="works"></div>
        <h1 class="c-ttl__heading"><?php echo get_the_title(); ?><span class="sub">ARCHIVEMENT</span></h1>
    </div>

    <div class="l-works__content__wrapper">
      <div class="l-works__article-inner">
        <article class="l-works__article">
        <!--記事処理開始 -->
        <?php if( have_posts() ) : ?>
        <div class="l-works__fullpicture">
            <picture>
                <source srcset="<?php echo GET_PATH()?>works/<?php echo get_post_meta($post->ID, 'work_txt_thumburl', true);?>"  media="(max-width: 768px)" type="image/png"  alt="<?php the_title();?>">
                <img src="<?php echo GET_PATH()?>works/<?php echo get_post_meta($post->ID, 'work_txt_imageurl', true);?>pc.jpg" alt="全体像" width="600" height="6000" loading="lazy">
            </picture>
            <?php
                //  画像名_p2が存在すれば表示
                $iurl = get_post_meta($post->ID, 'work_txt_imageurl', true);
                $iurl2 ="";
                $fname ="";
                if( $iurl ){
                    $iurl2 = $iurl."pc_p2";
                    //  URL
                    $fname = GET_PATH()."works/".$iurl2.".jpg";
                    //  URLではだめなので途中からのパス
                    $checkfname = get_template_directory()."/assets/images/works/".$iurl2.".jpg";
                    if(file_exists($checkfname)){
            ?>
            <picture>
                <img src="<?php echo $fname;?>" alt="副画像" width="600" height="600" loading="lazy">
            </picture>
            <?php
                    }
                }
            ?>
            <?php
                //  画像名_p3が存在すれば表示
                $iurl = get_post_meta($post->ID, 'work_txt_imageurl', true);
                $iurl2 ="";
                $fname ="";
                if( $iurl ){
                    $iurl2 = $iurl."pc_p3";
                    //  URL
                    $fname = GET_PATH()."works/".$iurl2.".jpg";
                    $checkfname = get_template_directory()."/assets/images/works/".$iurl2.".jpg";
                    if(file_exists($checkfname)){
            ?>
            <picture>
                <img src="<?php echo $fname;?>" alt="副画像2" width="600" height="600" loading="lazy">
            </picture>
            <?php
                    }
                }
            ?>

        </div>
        <div class="l-works__infomation">
            <dl>
                <?php 
                //  パスありリンク
                if( strcmp( $meta_user, "" ) != 0 ):
                ?>
                <div class="l-works__section u-flex__xcenter-sp">
                    <dt class="dt__flex">
                        <a href="<?php echo $txt_passurl;?>" class="c-button__portfolio c-button__hover__goto p-button__pf">
                        サイトに移動
                        </a>
                    </dt>
                </div>
                <div class="l-works__section u-margin__t20">
                    <dt class="c-lead">上記リンクはURLにBASIC認証を含めていますので、そのまま移動できます。<br>
                    iPhone等でパスワードを要求された場合は以下を入力して下さい。</dt>
                    <dt class="c-lead__hard">BASIC認証</dt>
                    <dd class="l-works__passtable">
                        <?php
                            $pass_user = get_post_meta($post->ID, 'work_txt_user', true);
                            $pass_pass = get_post_meta($post->ID, 'work_txt_pass', true);
                        ?>
                        <dl>
                            <div class="item"><dt>USER</dt><dd><?php echo $pass_user;?></dd></div>
                            <div class="item"><dt>PASS</dt><dd><?php echo $pass_pass;?></dd>
                            <!--
                                <script language="javascript" type="text/javascript">
                                    // クリップボードにコピー
                                    function passTableCopy_OnButtonClick() {
                                        //  http環境ではエラーになるとの事
                                        navigator.clipboard.writeText( <?php echo $pass_pass;?> );
                                        console.log(copyText.value);
                                    }
                                </script>                                
                                <dd><button type="button" onclick="passTableCopy_OnButtonClick();">Copy</button></dd>
                            -->
                            </div>
                        </dl>
                    <!--USER : <b><?php echo get_post_meta($post->ID, 'work_txt_user', true);?></b> -->
                    </dd>
                </div>
                <?php endif; ?>

                <?php
                //  パスなしリンク
                if( strcmp( $meta_user, "" ) == 0 ):
                ?>
                <?php if( strcmp( $txt_url, "" ) != 0 ) : ?>                        
                <div class="l-works__section u-flex__xcenter-sp">
                    <dt class="dt__flex">
                        <a href="<?php echo $txt_url;?>" class="c-button__portfolio c-button__hover__goto p-button__pf">
                        サイトに移動
                        </a>
                    </dt>
                </div>
                <?php endif; ?>
                <?php endif; ?>

                <?php
                //  GitHubリンク
                if( !empty( $txt_githuburl ) ): ?>
                <div class="l-works__section u-flex__xcenter-sp u-margin__t40">
                    <dt class="dt__flex">
                        <a href="<?php echo $txt_githuburl;?>" class="c-button__portfolio c-button__hover__goto p-button__pf">
                        GitHubでコードを見る
                        </a>
                    </dt>
                </div>
                <?php endif; ?>
            </dl>
            <dl>
                <div class="l-works__section">
                    <dt class="c-title__h2 c-title__bg c-title__bg__drop">
                        <h2>制作情報</h2></dt>
                </div>
                <div class="l-works__section u-margin__t40">
                    <dt class="c-title__h3 c-title__bg c-title__bg__grad3"><h3>作業範囲</h3></dt>
                    <dd><?php echo get_post_meta($post->ID, 'work_txt_mypart', true);?></dd>
                </div>
                <div class="l-works__section u-margin__t20">
                    <dt>
                        <dl class="rows">
                            <div class="row">
                                <dt class="c-title__h3 c-title__bg c-title__bg__grad3"><h3>時期</h3></dt>
                                <dd><?php echo get_post_meta($post->ID, 'work_txt_when', true);?></dd>
                            </div>
                            <div class="row">
                                <dt class="c-title__h3 c-title__bg c-title__bg__grad3"><h3>日数</h3></dt>
                                <dd><?php echo get_post_meta($post->ID, 'work_txt_days', true);?></dd>
                            </div>
                        </dl>
                    </dt>
                </div>
                <div class="l-works__section u-margin__t20">
                    <dt class="c-title__h3 c-title__bg c-title__bg__grad3"><h3>使用技術</h3></dt>
                    <dd><?php echo get_post_meta($post->ID, 'work_txt_skill', true);?></dd>
                </div>
                <div class="l-works__section u-margin__t20">
                    <dt class="c-title__h3 c-title__bg c-title__bg__grad3"><h3>概要</h3></dt>
                    <dd><pre><?php echo get_post_meta($post->ID, 'work_txt_summary', true);?></pre></dd>
                </div>
            </dl>
        </div>
        <?php endif; ?>
        </article>
        <!-- 一覧に戻る -->
        <div class="l-works__button__wrapper">
            <a href="<?php echo esc_url(home_url()); ?>/work" class="c-button__portfolio c-button__hover__back p-button__pf">
            一覧に戻る
            </a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php /* お問い合わせボタンパーツ */ ?>
<?php get_template_part(GET_PATH_R('template').'layout/contact/l-contact-conv', null,['color'=>'white'] ); ?>

</main>

<?php get_footer(); ?>

</body>
</html>
