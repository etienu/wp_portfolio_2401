<?php
    //  コンタクトフォーム

    //  セッションの開始
    if( session_status() !== PHP_SESSION_ACTIVE ) {
        session_start();
    }

    // セッション作成
    $token = bin2hex(openssl_random_pseudo_bytes(24));
    $_SESSION['token'] = $token;

//    var_dump( $_SESSION);
//    var_dump( $_POST);
?>

<?php
/*---------------------------------------------------------
    page-contact.php
    コンタクトフォーム
-----------------------------------------------------------*/
?>

<!DOCTYPE html>
<html lang="ja">

<?php get_template_part(GET_PATH_R('template').'layout/combo/lc-wp-header')?>


<body>

    <?php /* header bar */ ?>
    <?php get_template_part(GET_PATH_R('template').'layout/l-headerbar' ); ?>

    <?php /* 一番上に戻る */ ?>
    <?php get_template_part(GET_PATH_R('template').'object/project/p-js-gototop' ); ?>

    <?php /* sub mv */ ?>
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null, ['title' => 'お問い合わせ','lead'=>''] ); ?>

<main>
    <?php /* コンタクトフォーム */ ?>
    <?php get_template_part(GET_PATH_R('template').'layout/contact/l-contactform', null, ['page' => 'contact']  ); ?>
</main>

<?php get_footer(); ?>

</body>
</html>
