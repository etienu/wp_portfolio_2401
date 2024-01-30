<?php
        $my_args = array(
        'post_type' => $args['post_type'],  //  設定したカスタム投稿名※ここではwork
        'name' => $args['name'],
        'posts_per_page' => '1' //   表示させたい件数を指定
        );
        $effclass = "";
        if( !empty($args['effclass']) ){
            $effclass = " data-js='".$args['effclass']."'";
        }
    ?>

    <?php
    $my_query = new WP_Query($my_args);
    while ($my_query->have_posts()) :
        $my_query->the_post();
    ?>

    <article class="l-works__item"<?php echo $effclass;?>>
        <div class="container">
            <a href="<?php echo get_permalink()?>">
                <div class="l-works__imagebox">
                    <picture>
                    <img src="<?php bloginfo('template_directory')?>/assets/images/works/<?php echo get_post_meta($post->ID, 'work_txt_thumburl', true);?>" alt="<?php the_title();?>" width="400" height="400" loading="lazy">
                    </picture>
                    <div class="l-works__imagetextwrapper">
                        <h3 class="c-title__h4"><?php the_title();?></h3>
                        <div class="c-lead__hard"><?php echo get_post_meta($post->ID, 'work_txt_when', true);?></div>
                        <!-- <div class="c-lead__hard"><?php echo get_post_meta($post->ID, 'work_txt_skill', true);?></div> -->
                    </div>
                </div>
                </a>
        </div>
    </article>

    <?php
        endwhile;
        wp_reset_postdata();
    ?>
