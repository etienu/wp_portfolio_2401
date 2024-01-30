<?php
//------------------------------------------------------------
//    検索結果から固定ページを除外する
//    string $search SQLのWHERE句の検索条件文
//    object $wp_query WP_Queryのオブジェクト
//    
//    @return string $search 条件追加後の検索条件文
//------------------------------------------------------------
function my_posts_search( $search, $wp_query ){
    //  検索結果ページ・メインクエリ・管理画面の意外の３つの条件が揃った場合
    if( $wp_query->is_search() && $wp_query->is_main_query() && !is_admin() ){
        //  検索結果を投稿するタイプに絞る
        $search .= " AND post_type = 'post' ";
        return $search;
    }
    return $search;
}

add_filter( 'posts_search', 'my_posts_search', 10, 2 );
?>