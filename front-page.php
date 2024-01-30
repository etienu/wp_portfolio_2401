<?php
/*---------------------------------------------------------
    front-page.php
    トップページ
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

  <?php /* ヒーローページ */ ?>
<section class="l-hero">
  <div class="l-hero__background" data-eff="gsapparallax" data-y="-100"></div>
  <div class="l-hero__background-boader"></div>
  <div class="l-hero__background-boader__white"></div>
  <div class="l-hero__inner">
    <!-- パーティクル -->
    <div data-eff="mv_particle"></div>
    <!-- メッセージアニメーション -->
    <h2 class="l-hero__heading" data-js="surface__heroheading2">
      <span class="worktype">Web制作コーディング代行</span>
      <div class="title">想像を、触れるカタチに</div>
    </h2>
    <div class="l-hero__sublead">
      <span>シンプルで心地よいサイト、作ります</span>
    </div>
    <div class="l-hero__scrollbuttonwrapper">
      <a href="#intro">
        <div class="js-gsap__scrollbutton">
          <div class="icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="text">SCROLL</div>
        </div>
      </a>
    </div>
  </div>
</section>

<main>

<?php /* はじめに */ ?>
<section class="l-intro u-color-bg__white">
  <div class="l-intro__inner">
    <div class="l-intro__head"> 
      <div class="c-anchor__t-100" id="intro"></div>
      <h2><span>NINO-CODE PORTFOLIO</span><span class="line"></span></h2>
    </div>
    <div class="l-intro__content">
      <div class="l-intro__ideal" data-eff="gsapintro_svg">
        <span class="l-intro__idealp" data-index="1">想像を、</span><br>
        <span class="l-intro__idealp" data-index="2">触れるカタチに</span>
      </div>
      <div class="l-intro__lead">
        <h3>Web制作コーディング<br class="u-display__sp">代行いたします</h3>
        想像をカタチにするのが<br class="u-display__sp">デザイナー様であれば、<br>
        そのデザインを「触れるカタチ」<br class="u-display__sp">にするのがコーダーです。<br>
        <br>
        頂いたデザインを忠実に<br class="u-display__sp">再現する事はもちろんですが、<br>
        <span data-eff="gsapintro_txtmarker" data-type="marker">機能や動きがある</span>ことで効果的な<br class="u-display__sp">webサイトになります。<br>
        <br>
        自身もサイトの完成度に関わっている<br class="u-display__sp">という認識を持ち<br>
        <span data-eff="gsapintro_txtmarker" data-type="color">「この演出があると<br class="u-display__sp">満足度が上がるのではないか」</span><br>
        といった、コーダー視点の<br class="u-display__sp">提案も行ってまいります。<br>
      </div>
    </div>
  </div>
</section>

<?php /* ---- 制作実績 ---------------------------------------- */ ?>
<section class="l-works u-color-bg__white">
  <div class="l-heading">
    <div class="c-anchor__t-100" id="works"></div>
    <h2 class="c-ttl__heading">WORKS<span class="sub">- 制作実績 -</span></h2>
  </div>
  <div class="l-works__content-bg">
    <div class="l-works__content-bg-fill"></div>
    <div class="l-works__content-bg-inner">
      <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-worksinfo', null,
          ['post_type' => 'work','name'=>'ejs-01','lead'=>'全8Pのコーポレートサイトです。<br>EJSを使用しコーディング速度を<br>改善しました。'] ); ?>
      <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-worksinfo', null,
          ['post_type' => 'work','name'=>'lp24-01','lead'=>'背景に動画を埋め込み、<br>BGMのON/OFF切り替え実装。<br>作品系LPです。'] ); ?>
      <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-worksinfo', null,
          ['post_type' => 'work','name'=>'lp-05','lead'=>'家電量販店風LPです。<br>複雑なレイアウト組みに<br>対応しています。'
          ,'disp'=>true ] ); ?>

      <div class="swiper" data-name="works">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides : 実績一覧 -->
          <div class="swiper-slide">
          </div>
          <!-- Slides : コーポレートサイト -->
          <div class="swiper-slide">
            <picture>
              <source srcset="<?php echo GET_PATH()?>works/24-ejs01-cover.jpg"  media="(max-width: 768px)" type="image/jpg">
              <img    src   ="<?php echo GET_PATH()?>works/24-ejs01-cover_full.jpg" alt="コーポレートサイト" width="960" height="600" loading="lazy">
            </picture>
          </div>
          <!-- Slides : SFゲームLP -->
          <div class="swiper-slide">
            <picture>
              <source srcset="<?php echo GET_PATH()?>works/24-lp01-cover.jpg"  media="(max-width: 768px)" type="image/jpg" alt="">
              <img    src   ="<?php echo GET_PATH()?>works/24-lp01-cover_full.jpg" alt="SPゲーム風LP" width="960" height="600" loading="lazy">
            </picture>
          </div>
          <!-- Slides : 家電量販店 -->
          <div class="swiper-slide">
            <picture>
              <source srcset="<?php echo GET_PATH()?>works/pf-lp-05-cover.jpg"  media="(max-width: 768px)" type="image/jpg" alt="">
              <img    src   ="<?php echo GET_PATH()?>works/pf-lp-05-cover_full.jpg" alt="家電量販店風LP" width="960" height="600" loading="lazy">
            </picture>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="l-works__inner" data-page="top">
    <div class="l-works__content__wrapper" data-page="top">
      <div class="l-works__content__inner">
        <div class="l-works__imageitems" data-js="tabgroup" data-key="works">
          <div class="l-works__tabitem" data-js="tabitem" data-key="worksswiper1" data-state="open">
            <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-card-one-img', null, ['post_type' => 'work','name'=>'ejs-01', 'effclass'=>'surface__ltor']); ?>
          </div>
          <div class="l-works__tabitem" data-js="tabitem" data-key="worksswiper2">
            <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-card-one-img', null, ['post_type' => 'work','name'=>'lp24-01', 'effclass'=>'surface__up']); ?>
          </div>
          <div class="l-works__tabitem" data-js="tabitem" data-key="worksswiper3">
            <?php get_template_part(GET_PATH_R('template').'object/project/p-custompost-card-one-img', null, ['post_type' => 'work','name'=>'lp-05', 'effclass'=>'surface__rtol']); ?>
          </div>
        </div>
        <div class="l-works__imagebutton__wrapper">
          <a href="work" class="c-button__portfolio c-button__hover__goto p-button__pf" data-goto="top">
            制作実績一覧はこちら
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php /* ----- サービス ------------------------- */ ?>
<section class="l-service">
<?php /* 見出し : 可能な業務 */ ?>
    <div class="l-heading">
      <div class="c-anchor__t-100" id="services"></div>
      <h2 class="c-ttl__heading">SERVICE<span class="sub">- 可能な業務 -</span></h2>
    </div>    
    <div class="l-service__inner">
      <ul class="l-service__items">
        <li class="l-service__item" data-js="surface__up">
          <picture class="l-service__image">
            <source srcset="<?php echo GET_PATH()?>service/cording.jpg"  media="(max-width: 768px)" type="image/jpg">
            <img src="<?php echo GET_PATH()?>service/cording.jpg" alt="コーディング" width="400" height="400" loading="lazy">
          </picture>
          <div class="l-service__textwrapper">
            <div class="l-service__lead">
              頂いたデザインからコーディングを行います。レスポンシブ表示、jsを用いたアニメーションも可能です。
            </div>
            <h3 class="c-title__h3 size--mid">コーディング</h3>
          </div>
        </li>

        <li class="l-service__item" data-js="surface__up">
          <picture class="l-service__image">
            <source srcset="<?php echo GET_PATH()?>service/wp.jpg"  media="(max-width: 768px)" type="image/jpg">
            <img src="<?php echo GET_PATH()?>service/wp.jpg" alt="WordPress" width="400" height="400" loading="lazy">
          </picture>
          <div class="l-service__textwrapper">
            <div class="l-service__lead">
              静的ページのWordPress化、プラグインの導入、機能のカスタマイズを行い、利用者様が編集可能なサイトを作ります。<br>
            </div>
            <h3 class="c-title__h3 size--mid">WordPress構築</h3>
          </div>
        </li>

        <li class="l-service__item" data-js="surface__up">
          <picture class="l-service__image">
            <source srcset="<?php echo GET_PATH()?>service/mente.jpg"  media="(max-width: 768px)" type="image/jpg">
            <img src="<?php echo GET_PATH()?>service/mente.jpg" alt="管理・修正" width="400" height="400" loading="lazy">
          </picture>
          <div class="l-service__textwrapper">
            <div class="l-service__lead">
              公開後サイトの文章や画像、コードの修正などを行います。
              WordPressの修正も対応いたします。
            </div>
            <h3 class="c-title__h3 size--mid">ホームページ修正</h3>
          </div>
        </li>
      </ul><!--service items -->
  </div>
</section>

<?php /* できること SKILL  */ ?>
<section class="l-skill">
  <div class="l-heading">
    <div class="c-anchor__t-100" id="skill"></div>
    <h2 class="c-ttl__heading">SKILL<span class="sub">- できること -</span></h2>
  </div>
  
  <div class="l-skill__body">
    <div class="l-skill__bg">
      <div class="l-skill__bg-fill"></div>

      <div class="l-skill__bg-left" data-eff="worksbg-boxl"></div>
      <div class="l-skill__bg-left2" data-eff="worksbg-boxl2"></div>
    </div>
    <div class="l-skill__inner">
        <div class="l-skill__tabwrapper">
          <div class="l-skill__tabs" data-js="tabgroup" data-key="skill">
            <button class="l-skill__tab" data-js="tabitem" data-key="skillswiper1" data-state="open"><span>CORDING</span></button>
            <button class="l-skill__tab" data-js="tabitem" data-key="skillswiper2"><span>TOOL</span></button>
          </div>
        </div>
        <div class="l-skill__container">
          <div class="swiper" data-name="skill">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div class="swiper-slide">
                  <!-- コーディング -->
                  <div class="l-skill__head u-margin__b20">コーディング</div>
                  <div class="l-skill__items" data-js="surface__upgroup">
                    <div class="l-skill__item">
                      <div class="l-skill__title"><div class="bg"></div><span>HTML</span></div>
                      <div class="l-skill__lead">head内meta・favicon・OGP等の設定、pictureで画像のレスポンシブ対応・alt指定、h1、h2等構造を厳守。</div>
                    </div>
                    <div class="l-skill__item">
                    <div class="l-skill__title"><div class="bg"></div><span>CSS<br>Sass(SCSS)</span></div>
                    <div class="l-skill__lead">FLOCSS/BEMを使用し、構造のわかりやすさ・読みやすさ・再利用性を改善し続けています。</div>
                    </div>
                    <div class="l-skill__item">
                      <div class="l-skill__title"><div class="bg"></div><span>JavaScript<br>(jQuery)</span></div>
                      <div class="l-skill__lead">ハンバーガー、スムーススクロールのような必須機能、swiperなどjQueryを使用せず組めます。HTML上でdata指定するだけで機能追加できる設計にしています。</div>
                    </div>
                    <div class="l-skill__item">
                      <div class="l-skill__title"><div class="bg"></div><span>PHP<br>WordPress</span></div>
                      <div class="l-skill__lead">テーマの自作や修正作業/カスタム機能を使用し、利用者様自身で更新できるサイトを作成できます。<br>
                        プラグインを使用せずPHPでメール送信など可能です。
                      </div>
                    </div>
                    <div class="l-skill__item">
                      <div class="l-skill__title"><div class="bg"></div><span>GSAP</span></div>
                      <div class="l-skill__lead">jQueryよりも軽く複雑なアニメーションを実装できます。</div>
                    </div>
                    <div class="l-skill__item">
                      <div class="l-skill__title"><div class="bg"></div>EJS</div>
                      <div class="l-skill__lead">静的サイトをテンプレートエンジンで管理できます。コードのパーツ化による速度の向上、ミスを減少させます。URL等全体修正が容易になります。
                      </div>
                    </div>
                  </div><!-- l-service__skill__items -->
              </div>

              <div class="swiper-slide">
                <!-- ツール -->
                <div class="l-skill__head">使用ツール</div>
                <div class="l-skill__items u-margin__t20" data-js="surface__upgroup">
                  <div class="l-skill__item">
                    <div class="l-skill__title tool"><div class="bg"></div><span>VSCode<br>WakaTime</span></div>
                    <div class="l-skill__lead">コーディングで主に使用するエディタです。WakaTimeと連携してコーディングの合計時間を計測しています。</div>
                  </div>
                  <div class="l-skill__item">
                    <div class="l-skill__title tool"><div class="bg"></div><span>Local</span></div>
                    <div class="l-skill__lead">ローカル環境を作り、WordPressを動作させるツールです</div>
                  </div>
                  <div class="l-skill__item">
                  <div class="l-skill__title tool lh12"><div class="bg"></div><span>PhotoShop<br>Illustrator<br>AffinityPhoto</span></div>
                  <div class="l-skill__lead">カンプデータの扱いに加え、サムネイル文字の加工や写真の修正、画像切り抜き・サイズ変更ができます。</div>
                  </div>
                  <div class="l-skill__item">
                    <div class="l-skill__title tool"><div class="bg"></div><span>Adobe XD<br>Figma</span></div>
                    <div class="l-skill__lead">コーディングする為に情報確認や画像の切り出しが可能です</div>
                  </div>
                  <div class="l-skill__item">
                    <div class="l-skill__title tool"><div class="bg"></div><span>gulp<br>webpack</span></div>
                    <div class="l-skill__lead">node.jsを利用してタスクランナーでの画像圧縮、バンドルツールでのcssコンパイル・jsの結合圧縮が可能です</div>
                  </div>
                  <div class="l-skill__item">
                    <div class="l-skill__title tool"><div class="bg"></div><span>Git<br>GitHub</span></div>
                    <div class="l-skill__lead">VSCODE上からリポジトリ作成、メイン・制作用ブランチ作成、GitHubにプッシュ、制作用ブランチをメインにマージ、といった経験があります。</div>
                  </div>
                </div><!-- l-service__skill__items -->
              </div>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
          
          </div><!--  swiper -->
        </div><!-- l-skill__container -->
    </div><!-- l-skill__inner -->

  </div><!-- l-skill__body -->
</section><!-- l-skill -->



<!-- faq -->
<section class="l-section p-faq">
<?php /* 見出し : 制作実績 */ ?>
    <div class="l-heading">
      <div class="c-anchor__t-100" id="faq"></div>
      <h2 class="c-ttl__heading">FAQ<span class="sub">- よくある質問 -</span></h2>
    </div>
    <div class="p-faq__inner">
        <div class="p-faq__content">
            <ul class="p-faq__grid" itemscope itemtype="https://schema.org/FAQPage">
                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                                NINO-CODEとはどのような組織ですか？<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                  NINO-CODEは現状、当サイトの名前となっています。<br>
                                  私はまだ開業前の個人です。<br>
                            </div>
                        </div>
                    </details>
                </li>
                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                                それでは自己紹介をお願い致します。<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                  <a href="/about">自己紹介はこちらです。</a>
                                </p>
                            </div>
                        </div>
                    </details>
                </li>
                
                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                            価格感はどのようになっていますか？<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                  <a href="/price">料金表はこちらです。</a>
                                </p>
                            </div>
                        </div>
                    </details>
                </li>

                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                            どのようにお仕事を進めますか？<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                  頂いた情報を元にNotionやスプレッドシートを利用した
                                  案件管理ツールに情報をまとめます。<br><br>
                                  目安となる工程スケジュール表を作成、各種必要URLやパスワード、情報を一か所にまとめて共有可能です。<br><br>
                                  ご質問する内容も、メールでばらばらではなくシートでまとめて共有致します。<br><br>
                                  連絡はメール、zoom、チャットツール等御社に合わせますが記録が残る文面が望ましいです。
                                </p>
                            </div>
                        </div>
                    </details>
                </li>

                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                            自分で実装できない機能があった場合<br class="u-display__sp">どう対応しますか？<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                  基本は仕様やデザインを教えて頂いた際に、チェックリストを用いて不明点を洗い出し
                                  可能かどうかを判断する検証時間を頂いてからお受けします。<br>
                                  <br>
                                  それでも途中から実装難易度の高い要素が発覚した場合、
                                  一度要点をご相談して代案を出すか、どうしても必要な機能なら同業者に依頼してでも終わらせます。<br>
                                  <br>
                                  ですが情報に溢れている現代ですと、一般的に必要な機能の作り方は
                                  検索やChatGPTへの質問で答えは得られると考えます。<br>
                                  (データベースに登録するログインサイト、ECサイト、動的サイトやバックエンドが絡んだような規模のサイトですとまた違う話になってきます)<br>
                                  <br>
                                  主な懸念点は「webkit系ブラウザ(iPhone Safari)で若干望んだ挙動と違う」といったものになると予想します。<br>
                                  <br>
                                  「PC/SPで構成が違いつつ複雑なデザイン」<br>
                                  これは実装できないのではなく時間がかかります。事前に複雑さが分かっていればその分余裕のある納期をご相談させていただく、急ぎであればコードの品質より動く事を優先するかご相談という方向性です。
                                </p>
                            </div>
                        </div>
                    </details>
                </li>

                <li class="p-faq__griditem" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <details data-js="accordion-details">
                        <summary class="p-faq__q" data-js="accordion-summary">
                            <span class="p-faq__q-inner p-accordion__summary-inner" itemprop="name">
                                今から作業できますか？<span class="icon" data-type="plus"></span>
                            </span>
                        </summary>
                        <div class="p-faq__a" data-js="accordion-content">
                            <div class="p-faq__a__inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <p itemprop="text">
                                可能です。独身ですので、在宅している限り夜間・土日祭日関係なく作業できます。<br><br>
                                稼働時間としては9:00～18:00を中心に一日８時間、平日休日合わせて週50時間ほど動けます。<br>
                                </p>
                            </div>
                        </div>
                    </details>
                </li>
            </ul>
        </div>
    </div>
</section>


<?php /* お問い合わせボタンパーツ */ ?>
<?php get_template_part(GET_PATH_R('template').'layout/contact/l-contact-conv', null,['color'=>'white'] ); ?>
</main>

<?php get_footer(); ?>

</body>
</html>
