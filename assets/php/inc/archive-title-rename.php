<?php
//--------------------------------------------------------
//  アーカイブタイトル書き換え
//  @param string $title 書き換え前のタイトル
//  @return string $title 書き換え後のタイトル
//--------------------------------------------------------
function my_archive_title( $title ){
    //  カテゴリーアーカイブの場合
    if( is_category() ){
        //  本来「カテゴリ」と自動で付くところ、タイトル名のみにしている
        $title = single_cat_title( '', false );
    //  タグアーカイブの場合
    } elseif( is_tag() ){
        $title = single_tag_title( '', false );
    //  投稿タイプアーカイブの場合
    } elseif( is_post_type_archive() ){
        $title = post_type_archive_title( '', false );
    //  タームアーカイブ
    //( タクソノミーはカテゴリ/タグ/グループのタイトル名、
    //  タームはそのグループに属する1項目の事 )
    //  WPデフォルトタクソノミーであるカテゴリとタグの違いは階層構造があるかないか
    //  その他グループはそれ以外の分類で、階層があってもなくてもいい
    } elseif( is_tax() ){
        $title = single_term_title( '', false );
    //  作者アーカイブ
    } elseif( is_author() ){
        $title = get_the_author();
    //  日付アーカイブ
    } elseif( is_date() ){
        $title = '';
        //  年月日の変数が空でない場合、年月日をタイトル名にする
        if( get_query_var('year') ){
            $title .= get_query_var( 'year' ) . '年';
        }
        if( get_query_var( 'monthnum' ) ){
            $title .= get_query_var( 'monthnum' ) . '月';
        }
        if( get_query_var( 'day' ) ){
            $title .= get_query_var( 'day' ) . '日';
        }
    }
    return $title;  
};
//  セット
add_filter( 'get_the_archive_title', 'my_archive_title' );
?>