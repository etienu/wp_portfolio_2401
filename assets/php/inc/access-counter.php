<?php
//--------------------------------------------------------
//    カスタムフィールドを使ってアクセス数を取得する
//    ( 特定記事のアクセス数確認用 )
//    @param integer $id 投稿id.
//    @return  void
//--------------------------------------------------------
// アクセス数を取得
function get_post_views( $id = 0 ){
    global $post;
    //  引数が渡されなければ投稿IDを見るように設定
    if( 0 === $id ){
        $id = $post->ID;
    }
    $count = get_post_meta( $id, $count_key, true );

    if( $count === '' ){
        delete_post_meta( $id, $count_key );
        add_post_meta( $id, $count_key, '0' );
    }
    return $count;
} 


//--------------------------------------------------------
//
//    アクセスカウンター
//
//--------------------------------------------------------
function set_post_views(){
    global $post;
    $count = 0;
    $count_key = 'view_counter';

    if( $post ){
        $id = $post->ID;
        $count = get_post_meta( $id, $count_key, true );
    }

    if( $count ==='')
    {
        delete_post_meta( $id, $count_key, true );
    }elseif( $count > 0 ){
        if( !is_user_logged_in() ){
            $count ++;
            update_post_meta( $id, $count_key, $count );
        }
    }
    //  $countが0のままの場合( 404や該当記事の検索結果が0件の場合 )は何もしない。    
}
add_action( 'template_redirect', 'set_post_views', 10 );
?>