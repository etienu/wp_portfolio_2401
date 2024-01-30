<?php
//------------------------------------------------
//
//  top : 制作実績 : バックグラウンド 情報テキスト群
//
//------------------------------------------------
$my_args = array(
        'post_type' => $args['post_type'],  //  設定したカスタム投稿名※ここではwork
        'name' => $args['name'],
        'posts_per_page' => '1' //   表示させたい件数を指定
        );
    $disp_cls ="";
    if(!empty( $args['disp'] )){
        $disp_cls = " disp";
        
    }
?>

    <?php
    $my_query = new WP_Query($my_args);
    while ($my_query->have_posts()) :
        $my_query->the_post();
    ?>

    <div class="l-works__slideinfo__wrapper<?php echo $disp_cls; ?>">
        <div class="l-works__slideinfo__inner">
            <div class="l-works__slideinfo__background"></div>

            <div class="l-works__slideinfo__title">
                <span class="rect"></span>
                <p><?php the_title();?></p>
            </div>
            <div class="l-works__slideinfo__date">
                <span class="rect"></span>
                <p>時期 : <?php echo get_post_meta($post->ID, 'work_txt_when', true);?></p>
            </div>
            <div class="l-works__slideinfo__days">
                <span class="rect"></span>
                <p>日数 : <?php echo get_post_meta($post->ID, 'work_txt_days', true);?></p>
            </div>
            <?php if( !empty($args['lead']) ) : ?>
            <div class="l-works__slideinfo__lead">
                <span class="rect"></span>
                <p><?php echo $args['lead'];?></p>
            </div>
            <?php endif; ?>
            <!-- <?php echo get_post_meta($post->ID, 'work_txt_skill', true);?> -->
        </div>

    </div>

    <?php
        endwhile;
        wp_reset_postdata();
    ?>
