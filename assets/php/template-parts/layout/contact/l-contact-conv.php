<?php
    $data_color = "";
    $head_color = "";
    $data_page = "";
    if( !empty($args['color']) ){
        switch( $args['color'] ){
        case "white" : 
            $data_color =' data-color="white"';
            $head_color ='white';
            break;
        case "green" : 
            $data_color =' data-color="green"';
            $head_color ='green';
            break;
        }

    }
    //コンタクト - コンバージョンボタン
?>
<section class="l-contact"<?php echo $data_color;?>>
    <div class="l-contact__background">
        </div>
    <div class="l-contact__inner">
        <?php /* 見出し : お問い合わせ CONTACT  */ ?>
        <div class="l-heading">
            <div class="c-anchor__t-100" id="contact"></div>
            <h2 class="c-ttl__heading">CONTACT<span class="sub --center">- お問い合わせ -</span></h2>
        </div>

        <p>コーディング依頼やお見積り、<br class="u-display__sp">その他ご質問など<br>
        こちらからお気軽に<br class="u-display__sp">お問い合わせください。</p>

        <div class="l-contact__cvwrapper">
            <a href="/contact/" class="p-contactcv__button">
                <div class="p-contactcv__button__bg"></div>
                <div class="p-contactcv__button__inner">
                    <!--<div class="p-contactcv__mailicon"><i class="fas fa-envelope"></i></div>-->
                    <div class="p-contactcv__separate u-hidden__sp"></div>
                    <div class="p-contactcv__lead">
                        問い合わせる
                        <div class="lead-arrow"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</section>
