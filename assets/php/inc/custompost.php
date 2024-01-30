<?php
add_action('init', 'create_post_type');
function create_post_type()
{
    //  https://teru1213.com/wordpress-customiz/#index_id2
    //----------------------------------------
    //  カスタム投稿タイプの追加
    //----------------------------------------
    register_post_type('work', [ // 投稿タイプ名の定義
    'labels' => [
    'name' => '制作事例', // 管理画面上で表示する投稿タイプ名
    'singular_name' => 'work', // カスタム投稿の識別名
    ],
    'public' => true, // 投稿タイプをpublicにするか
    'has_archive' => true, // アーカイブ機能ON/OFF
    'menu_position' => 5, // 管理画面上での配置場所(投稿の下に配置)
    'show_in_rest' => true, // wordpress5.x系から出てきた新エディタ「Gutenberg」を有効にする
    // カスタム投稿で使用する項目を設定（タイトル、エディター、アイキャッチ）
    'supports' => array(
        'title',
        'editor',
        'custom-fields',
        'thumbnail',
        'revisions',
        ),
    ]);

    //----------------------------------------
    //  タクソノミー(カテゴリー分け)の定義
    //----------------------------------------
    register_taxonomy(
        'work-category', // タクソノミーの名前
        'work', //   使用するカスタム投稿タイプ名
        array(
        'hierarchical' => true, /* trueだと親子関係が使用可能。falseで使用不可 */
        'update_count_callback' => '_update_post_term_count',
        'label' => '制作事例カテゴリー',
        'singular_label' => '制作事例カテゴリー',
        'public' => true,
        'show_ui' => true,// 管理画面表示ON/OFF
        )
    );

}

?>
