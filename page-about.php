<?php
/*---------------------------------------------------------
    page-about.php
    私について
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
     ['title' => '自己紹介','lead'=>'どのような人物とお仕事するのか'] ); ?>


<main>
<?php /* 自己紹介 */ ?>
<section class="l-about">
    <div class="l-about__background"></div>
    <div class="l-about__fadewrapper">
        <div class="l-about__inner">
            <?php /* 見出し : 自己紹介 */ ?>
            <div class="l-heading --center">
                <div class="c-anchor__t-100" id="contact"></div>
                <h2 class="c-ttl__heading-sub">私について<span class="sub --center">PROFILE</span></h2>
            </div>

        <div class="l-about__lead">
            <div class="l-about__leadblock" data-side="left" data-js="surface__up">
                
                <div class="l-about__leadtext">
                    Webコーダー<br>
                    <strong>
                    <b>HIROSHI NINOMIYA</b><br>
                    <b>二宮 裕志</b>
                    </strong>
                    <dl>
                        <div><dt>年齢</dt><dd>42歳(1982年)</dd></div>
                        <div><dt>地域</dt><dd>千葉県流山市</dd></div>
                    </dl>
                    <br>
                </div>
                <div class="l-about__leadimage">
                    <picture><img src="<?php echo GET_PATH()?>/about/about1.jpg" alt="01" width="300" height="300"></picture>
                </div>
            </div>
            <div class="l-about__leadblock" data-side="center" data-js="surface__up">
                <p>
                フリーランスでWeb制作のコーディング業務を代行しています。<br>
                前職は建築業界、管工事会社に15年程勤務。<br>
                <br>
                畑違いに見えますが<br>「設備会社様から管工事業務を請ける」<br>「制作会社様からコーディング業務を請ける」<br>というビジネスの構図は同じです。<br>
                <br>
                以下で10代からの簡単な出来事をまとめました。<br>ご興味いただけましたら一読いただけると幸いです。<br>
                </p>
            </div>

            <div class="l-about__leadblock" data-side="right" data-js="surface__up">
                <div class="l-about__leadtext">
                    <b>10代、PCと出会う</b>
                    <br>
                    雑誌で「PCならゲームを作れる」<br>
                    という記事を読み、パソコンに出会いました。<br>
                    X68000やWindows3.1、MS-DOSの時代です。<bt>
                    <br>
                    N-88BASIC、C++、DirectX<br>
                    といった技術を習得していき<br>
                    ゲーム作りに没頭。<br>
                    <strong>雑誌に投稿し、原稿料を頂く経験をします。</strong><br>
                    <br>
                    自分が生み出したものが世に<br>
                    認知され、評価を頂くという<br>
                    この時の興奮と手ごたえが今、<br>
                    物作りの信念に繋がっています。<br>
                    <br>
                    <strong><br class="u-display__sp">
                    思いをカタチにして<br class="u-display__sp">
                    お客さんに喜んで頂けたら、<br>
                    これ以上嬉しい事はありません。
                    </strong>
                </div>
                <div class="l-about__leadimage">
                    <picture><img src="<?php echo GET_PATH()?>/about/about4.jpg" alt="04" width="600" height="300"></picture>
                </div>
            </div>

            <div class="l-about__leadblock" data-side="left" data-js="surface__up">
                <div class="l-about__leadtext">
                    <b>20代、前職は建築業界</b>
                    <br>
                    消火設備配管工として15年程<br>
                    建築現場で働いておりました。<br>
                    <br>
                    大手・中小ゼネコンの現場に関わり<br>
                    厳しい施工品質のチェックや<br>
                    苦しい工期内で<br>
                    建築に追われる中やりきる経験をします。<br>
                    <br>
                    <strong>
                    職長経験をする事で、<br>
                    自ら先を考え監督達に<br>
                    相談する大切さ、<br>
                    図面通りにはいかない問題への<br>
                    対応力を学びました。
                    </strong>
                </div>
                <div class="l-about__leadimage">
                    <picture><img src="<?php echo GET_PATH()?>/about/about3.jpg" alt="03" width="600" height="300"></picture>
                </div>
            </div>


            <div class="l-about__leadblock" data-side="right" data-js="surface__up">
                <div class="l-about__leadtext">
                <strong>
                    <b>30代、<br class="u-display__sp">独学でweb制作を学習</b>
                </strong>
                <br>
                2020年web制作というお仕事を知ります。<br>
                <br>
                設備屋のお仕事は続いていたのですが、<br>
                コロナの影響で材料費が高騰し採算が合わないので<br>
                請けられないといった事があり<br>
                <strong><br class="u-display__sp">
                今後を見据えて会社に頼らない生き方を<br>
                習得しようと決意、学習を開始しました。<br>
                </strong>
                <br>
                10代からのプログラム経験がありましたが、<br>
                コーディングは勝手が違い日々勉強が続きました。<br>
                逆にJSやPHPは馴染みやすかったです。<br>

                </div>
            <div class="l-about__leadimage">
                <picture><img src="<?php echo GET_PATH()?>/about/about2.jpg" alt="02" width="600" height="300"></picture>
            </div>
        </div>

        <div class="l-about__leadblock" data-side="left" data-js="surface__up">
                <div class="l-about__leadtext">
                <strong>
                    <b>40代、学習継続</b>
                </strong>
                <br>
                会社都合で退職後、時間ができてから改めて<br>
                勉強不足を痛感し学習し直しました。<br>
                <br>
                今も日々勉強しておりますが、<br>
                <strong>
                お悩みを解決するといった<br>
                「目的あっての技術」である事を<br>
                忘れないようにしております。<br>
                </strong>
                <br>
                CSS等の最新情報を追う合間も<br>
                WordPress以外のCMS、ECのshopify、<br>
                動的ページの作成にnext.js、<br>
                バックエンドでfirebaseや<br>
                ノーコードといった情報にも触れるようにしており<br>
                <br>
                固執せず、より良い代替え手段がないかを<br>
                常に模索しております。<br>
                </div>
            <div class="l-about__leadimage">
                <picture><img src="<?php echo GET_PATH()?>/about/about4_2.jpg" alt="02" width="600" height="300"></picture>
            </div>
        </div>


        <div class="l-about__leadblock" data-side="right" data-js="surface__up">
          <div class="l-about__leadtext">
            <b class="gold">職長経験を活かし<br>
            スムーズな業務進行</b>
            <br>
            職長経験時、日々監督さん達に報告や連絡をし<br>
            不明点や不安を先手で解消していく事で<br>
            どの現場でも信頼を頂き、<br>
            気さくに話しかけて頂けるようになりました。<br>
            <br>
            御担当者様、依頼者様の立場を想像し<br>
            ささいな事でも連絡・相談して<br>
            ご要望に柔軟に応えていきます。<br>
            <br>
            <strong><br class="u-display__sp">
            設備配管工事で図面の意図を読み解き、<br>
            web制作コーディング業務で<br class="u-display__sp">
            カンプの意図を汲む。<br>
            仕事のあり方は同じと考えます。<br>
            </strong>
          </div>
          <div class="l-about__leadimage">
              <picture><img src="<?php echo GET_PATH()?>about/about5.jpg" alt="05" width="600" height="300"></picture>
          </div>
        </div>

        <div class="l-about__leadblock" data-side="center">
            <div class="c-anchor__t-100" id="movie"></div>
            <b class=" u-margin__t40">最後に、動画でご挨拶させてください。</b>
            <video controls data-jsitemcounter="about_myvideo">
                <source src='<?php echo GET_PATH()?>about/selfintro.webm?=2' type="video/webm" />
                <source src='<?php echo GET_PATH()?>about/selfintro.mp4?=2' type="video/mp4" />
            </video>

            <b class=" u-margin__t40">「コーディングだけして欲しい！」</b>
            <b>「WordPressごと構築して欲しい！」</b>
            <br>
            といったお悩みがあれば<br>
            休日祭日問わず対応可能ですので、<br>
            ぜひお気軽にご相談ください。<br>
        </div>
      </div>

        <!-- トップに戻る -->
        <div class="l-about__button__wrapper u-margin__t80">
            <a href="/" class="c-button__portfolio c-button__hover__back p-button__pf">
            トップに戻る
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
