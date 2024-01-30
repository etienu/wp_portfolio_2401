<?php
//--------------------------------------------------------------------------------
//
//    ウィジェットの登録
//
//--------------------------------------------------------------------------------
function my_widget_init(){
    register_sidebar(
        array(
            'name' => 'サイドバー',
            'id' => 'sidebar',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<div class="widget-title">',
            'after_title' => '</div>',
        )
    );
}
add_action( 'widgets_init', 'my_widget_init' );
?>