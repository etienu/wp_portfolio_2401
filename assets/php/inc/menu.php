<?php
//----------------------------------------------------
//  メニューの登録
//----------------------------------------------------
function my_menu_init()
{
    register_nav_menus(
        array(
            'global' => 'ヘッダーメニュー',
            'drawer' => 'ドロワーメニュー',
            'footer' => 'フッターメニュー',
        )
    );
}
add_action( 'init', 'my_menu_init') ;
?>