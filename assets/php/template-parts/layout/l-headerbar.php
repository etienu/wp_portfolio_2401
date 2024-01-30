<?php
//----------------------------------------
//  ヘッダーバー
//----------------------------------------
?>
<?php
  $homeurl = esc_url(home_url());
  //  トップページの場合はスムーススクロールさせる為URLを入れない
  if( is_home() || is_front_page() ) :
    $homeurl = "";
  endif;
?>

<header class="l-header">
  <div class="l-header__content">
    <div class="l-header__inner">
      <div class="p-header__logo-wrapper">
        <div class="p-header__logo">
          <a href="<?php echo esc_url(home_url()); ?>">
            <?php
                //  ページによってH1かdivか分岐
                //  カスタム投稿記事「work」
                if ( is_singular('work') ){ echo "<div>".get_bloginfo('name')."</div>"; }
                //  他全て
                else{ echo "<h1>".get_bloginfo('name')."</h1>"; }
            ?>
          </a>
        </div>
      </div>

      <nav class="p-header__nav">
        <ul>
          <li><a href="/work"><span data-parts="boxlt"></span><span data-parts="text">制作実績</span><span data-parts="boxrb"></span></a></li>
          <li><a href="<?php echo $homeurl; ?>#services"><span data-parts="boxlt"></span><span data-parts="text">サービス</span><span data-parts="boxrb"></span></a></li>
          <li><a href="<?php echo $homeurl; ?>#faq"><span data-parts="boxlt"></span><span data-parts="text">よくある質問</span><span data-parts="boxrb"></span></a></li>
          <li><a href="/price"><span data-parts="boxlt"></span><span data-parts="text">料金</span><span data-parts="boxrb"></span></a></li>
          <li><a href="/about"><span data-parts="boxlt"></span><span data-parts="text">自己紹介</span><span data-parts="boxrb"></span></a></li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="l-header__buttonswrapper u-hidden__sp">
    <a href="/contact">
      <div class="p-header__button">
        <p class="u-display__pc">お問い合わせ</p>
        <i class="fas fa-envelope u-display__tab"></i>
      </div>
    </a>
  </div>
  <div class="p-hamburger__wrapper u-display__sp">
    <div class="p-hamburger" id="js-hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>

<?php
//----------------------------------------
//  SPメニュー
//----------------------------------------
?>
<div class="p-spmenu__background">
  <div class="stripe"></div>
  <div class="stripe"></div>
  <div class="stripe"></div>
  <div class="stripe"></div>
</div>
<div class="p-spmenu">
  <div class="p-spmenu__inner">
    <ul>
      <li><a href="/work"><span>制作実績</span></a></li>
      <li><a href="<?php echo $homeurl; ?>#services"><span>可能な作業</span></a></li>
      <li><a href="<?php echo $homeurl; ?>#faq"><span>よくある質問</span></a></li>
      <li><a href="/price"><span>料金</span></a></li>
      <li><a href="/about"><span>自己紹介</span></a></li>
    </ul>  
    <div class="l-header__buttonswrapper">
      <a href="<?php echo $homeurl; ?>#contact" class="p-header__button">
        お問い合わせ
      </a>
    </div>
  </div>  
</div>