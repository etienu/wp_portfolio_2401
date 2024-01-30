<?php
    function console_log($data){
        echo '<script>';
        echo 'console.log('.json_encode($data).')';
        echo '</script>';
    }

    //  WordPressを読み込む。WP_Query等を使えるようにする
    // サイト名/public/wp-load.php
    require '../../../../../../wp-load.php';

    $el_id = $_POST['id'];
//    var_dump("reset");
//    var_dump($el_id);

    //  IDによって分岐
    switch( $el_id ){
    case "custompost" : reset_custompost();   break;
    case "itemcounter": reset_itemcounter();  break;
    }
?>


<?php
//--------------------------------------------
//      リセット : カスタムポスト( 制作実績 )
//--------------------------------------------
function reset_custompost(){
    //  カスタム投稿タイプのタクソノミーLP/WordPressを検索
    $my_args = array(
        'post_type' => 'work',
        'posts_per_page' => -1,
        'order' => 'DESC',
        'orderby' => 'meta_value',
        //  タクソノミーの指定
        'tax_query' => array(
            array(
                'taxonomy' => 'work-category',
                'field' => 'slug',
                'terms' => array('wordpress','lp')
            ),
        ),
        // カスタムフィールドの指定( ソート番号の昇順、値がない物は排除される )
        'meta_query' => array(
            array(
                'key' => 'work_num_sortindex', // フィールド名の指定
                'type'=>'SIGNED' // 値の型
            )
        )
    );

    $my_query = new WP_Query($my_args);
    //  検索された記事をループ
    while ($my_query->have_posts()) :
        $my_query->the_post();
        //  カスタムフィールド閲覧数・外部閲覧数に0をセット
        update_post_meta( get_the_ID(), 'views', 0 );
        update_post_meta( get_the_ID(), 'external_viewers', 0 );
        //console_log( get_the_title() );
        //the_title();
        //echo "<br>";
    endwhile;
    wp_reset_postdata();
    
    //  カスタム投稿タイプ、カテゴリjsの表示
    $my_args = array(
        'post_type' => 'work',
        'posts_per_page' => -1,
        'order' => 'ASC',
        'tax_query' => array(
            array(
                'taxonomy' => 'work-category',
                'field' => 'slug',
                'terms' => array('js')
            ),
        ),
    );
    $my_query = new WP_Query($my_args);
    //  検索された記事をループ
    while ($my_query->have_posts()) :
        $my_query->the_post();
        //  カスタムフィールド閲覧数・外部閲覧数に0をセット
        update_post_meta( get_the_ID(), 'views', 0 );
        update_post_meta( get_the_ID(), 'external_viewers', 0 );
    endwhile;
    wp_reset_postdata();

}
?>


<?php
//--------------------------------------------
//      リセット : アイテムカウンター
//--------------------------------------------
function reset_itemcounter(){
    //$customdata_pageid = "67";
    $customdata_pagename = "site_customfield";
    //固定ページスラッグからID取得
    $page_info = get_page_by_path( $customdata_pagename );
    $page_id = $page_info->ID;
    //  カスタム投稿タイプ、カテゴリwordpress,lpの表示
    $my_args = array('pagename' => $customdata_pagename);
    $my_query = new WP_Query($my_args);
    $txt_cnt = 0;
    $customAll = [];
    //$custom = [];
    //$customids = [];
    //  指定固定記事1回のみ
    while ($my_query->have_posts()) :
        $my_query->the_post();
        //  カスタムキー全て取得
        $customAll = get_post_meta( get_the_ID() );
        //  カスタムキー分ループ
        foreach( $customAll as $key=>$val ){            
            //  先頭に"_"はシステムカスタムキーとみなして省く
            if(substr($key,0,1) !== '_'){
                //  "_into"があれば"_"より前のキー名取得、なければnull
                $custom_id = strstr( $key, "_into", true);
                //  発見次第関連キーを全て削除
                if( $custom_id ){
                    delete_post_meta( $page_id, $key ); //  削除
                    //update_post_meta( $page_id, $key, 0 );    //  初期化のみ
                }
            }
        }
    endwhile;
    wp_reset_postdata();
}
?>
