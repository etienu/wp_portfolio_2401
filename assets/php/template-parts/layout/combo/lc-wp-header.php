<?php
/*--------------------------------------------------------
//  Layout Combo - ワードプレスレイアウトのパーツ組み合わせ
//  
//  全てのページはじめにセットするファイル。
//  ・ヘッダーやMVの決まった順番を一斉に入れ替える可能性がある
//  ・機能を追加する可能性がある
//
//  このファイルを書き換えるだけで全ページ対応可能
//
//----------------------------------------
//  [PHP] 相対パスで多重include(require)でエラー
//      https://amidagamine.com/notes/48
--------------------------------------------------------*/
?>
<?php
    //   assets/php/template-parts/layout/combo
    //  ↓assets/php/
    //  ↓assets/php/function
    //include (dirname(__FILE__) ."/../../../function/common-functions.php");

 // ヘッダー : <head></head>
 get_header();
?>

<?php /*    以下 全ページ共通パーツの配置  */ ?>
<?php /* ローディング */ ?>
  <?php get_template_part(GET_PATH_R('template').'layout/l-loader' ); ?>

