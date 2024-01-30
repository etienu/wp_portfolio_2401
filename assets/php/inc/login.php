<?php
//ログイン画面URLの変更
define( 'LOGIN_CHANGE_PAGE', 'entrance-login.php' );
add_action( 'login_init', 'login_change_init' );
add_filter( 'site_url', 'login_change_site_url', 10, 4 );
add_filter( 'wp_redirect', 'login_change_wp_redirect', 10, 2 );

// もし指定以外のログインURLだったときTOPページへ
if ( ! function_exists( 'login_change_init' ) ) {
    function login_change_init() {
        if ( !defined( 'LOGIN_CHANGE' ) || sha1( 'key-etienu_word352' ) != LOGIN_CHANGE ) {
          wp_redirect( home_url() );
          exit;
        }
    }
}

// ログイン済みか新しく作ったログインURLの場合はwp-login.phpを置き換える
if ( ! function_exists( 'login_change_site_url' ) ) {
    function login_change_site_url( $url, $path, $orig_scheme, $blog_id ) {
        // ログイン画面、ログイン画面を用いた処理の画面名をリプレイス
        if ( ( $path == 'wp-login.php' || preg_match( '/wp-login\.php\?action=\w+/', $path ) ) &&
            ( is_user_logged_in() || strpos( $_SERVER['REQUEST_URI'], LOGIN_CHANGE_PAGE ) !== false ) )
            $url = str_replace( 'wp-login.php', LOGIN_CHANGE_PAGE, $url );
        return $url;
    }
}

// ログアウト時のリダイレクト先の設定
if ( ! function_exists( 'login_change_wp_redirect' ) ) {
    function login_change_wp_redirect( $location, $status ) {
        if ( strpos( $_SERVER['REQUEST_URI'], LOGIN_CHANGE_PAGE ) !== false )
            $location = str_replace( 'wp-login.php', LOGIN_CHANGE_PAGE, $location );
        return $location;
    }
}

?>