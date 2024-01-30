<?php
//--------------------------------------------
//  function.phpのものとほぼ同じ処理
//--------------------------------------------
function console_log($data){
    echo '<script>';
    echo 'console.log('.json_encode($data).')';
    echo '</script>';
}

function update_itemviews( $i_id ){
    //var_dump( "確認" );
    global $post;
    //  ログイン中ではない、ボットではない = 外部の正式な訪問者
    if( !is_user_logged_in() && !is_bot() ){
        //  保存してある"exview"を取得
        $views = intval( get_post_meta( $post->ID, $i_id.'_into_exview', true ) );
        //  "views"に1加算して保存
        update_post_meta( $post->ID, $i_id+'_into_exview', ( $views + 1 ) );

    //  何者かのアクセス
    }else{
        //  保存してある"views"を取得
        $views = intval( get_post_meta( $post->ID, $i_id.'_into_allview', true ) );
        //  "views"に1加算して保存
        update_post_meta( $post->ID, $i_id.'_into_allview', ( $views + 1 ) );
    }

}

?>
<?php
//----------------------------------------
//  WordPressの記事アイテムカウンター
//----------------------------------------

    //  WordPressを読み込む。WP_Query等を使えるようにする
    // サイト名/public/wp-load.php
    require '../../../../../../wp-load.php';
    //  jsから送られてきた引数
    $el_id = $_POST['id'];

    //  固定ページがなければ実行しない
    $customdata_pageid = "67";  //  固定ページid : site_customfield
    $customdata_pagename = "site_customfield";  //  固定ページslug : site_costomfield
    //  slug指定の固定ページ
    $my_args = array('pagename' => $customdata_pagename);
    $my_query = new WP_Query($my_args);
    //  検索された記事があれば処理
    while ($my_query->have_posts()){
        $my_query->the_post();
        //  指定のIDに1カウント
        update_itemviews( $el_id );
    }
    wp_reset_postdata();
/*
 */   
?>
