<?php
//--------------------------------------------------------
//  
//  functions.php に投稿ステータスをフックする追記をして
//  下書きや非公開の親ページを選択可能に
//  
//--------------------------------------------------------
add_filter('page_attributes_dropdown_pages_args', 'add_private_draft');
function add_private_draft( $args ) {
    $args['post_status'] = 'publish,private,draft';
    return $args;
}
?>