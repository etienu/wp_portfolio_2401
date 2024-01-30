<?php
//----------------------------------------
//
//  管理画面
//  独自テーマ設定ページ
//
//  処理実行用js、phpは「assets/controlpanel/」以下にあります
//
//----------------------------------------
make_section_siteSettingsPage();
make_section_itemcounter();


//----------------------------------------
//サイト設定ページ内容
//----------------------------------------
function make_section_siteSettingsPage() {
?>
    <h2><b>機能</b></h2>
<section class="wrap">
    <div><b>記事閲覧数リセット</b></div>
    <button id="my-wp-setting-viewreset">リセットする</button>
    <br><br>
<?php
    //--------------------------------
    //  カスタム投稿タイプ、カテゴリwordpress,lpの表示
    //--------------------------------
    $my_args = array(
        'post_type' => 'work',
        'posts_per_page' => 10,
        'order' => 'DESC',
        'orderby' => 'meta_value',
        //  タクソノミーの指定
        'tax_query' => array(
            array(
                'taxonomy' => 'work-category',
                'field' => 'slug',
                'terms' => array('wordpress','lp')
            ),
        ),
        // カスタムフィールドを指定してソート( ソート番号の昇順、値がない物は排除される )
        'meta_query' => array(
            array(
                'key' => 'work_num_sortindex', // フィールド名の指定
                'type'=>'SIGNED' // 値の型
            )
        )
    );
?>
<!-- <table class="form-table setting-table"> -->
<table class="setting-table">
    <tr class="head">
        <th>No</th>
        <th>ページ名</th>
        <th>PageID</th>
        <th>view/<br>閲覧数</th>
        <th>external/<br>外部閲覧数</th>
    </tr>
<?php $my_query = new WP_Query($my_args);
    $txt_cnt = 0;
    while ($my_query->have_posts()) :
        $my_query->the_post();
        $pst = $my_query->get_post();
        //var_dump( $my_query["query"] );
        //echo "<br>";
        //$post_obj = get_queried_object();
        $num_view_cnt = get_post_meta(get_the_ID(), 'views', true);
        $num_ev_cnt = get_post_meta(get_the_ID(), 'external_viewers', true);
        if( !$num_ev_cnt ) $num_ev_cnt = 0;
        $txt_cnt ++;
?>
	<tr>
        <!--
		<th colspan="1" width="40"><label for="label"><?php echo $txt_cnt; ?></label></th>
		<td colspan="1" width="200"><label for="pagename"><?php the_title();?></label></td>
		<td colspan="2" width="300"><label for="viewcount"> : [id]<?php echo get_the_ID(); ?> : [view/閲覧数] <?php echo $num_view_cnt;?> : [external/外部閲覧数] <?php echo $num_ev_cnt;?></label></td>
        -->
		<th><?php echo $txt_cnt; ?></th>
		<td><?php the_title();?></td>
		<td><?php echo sprintf( "%d", get_the_ID() ); ?></td>
		<td><?php echo sprintf( "%d", $num_view_cnt ); ?></td>
		<td><?php echo sprintf( "%d", $num_ev_cnt ); ?></td>

	</tr>
<?php
    // printf("'%010d'", $a);
    // printf("'%'#10d'", $a);
    endwhile;
    wp_reset_postdata();
?>
</table>
<br>
記事にカウントされている閲覧数を0にします。
<br>
<br>
</section>
<hr>
<!-- アイテムカウンター一覧表示 -->

<?php
}
?>








<?php
//------------------------------------------------
//
//  表示 : アイテムカウンター
//  JS itemcounters.jsを介して
//  固定ページ site_costomfieldに書き込まれた
//  数値の一覧表示
//
//------------------------------------------------
function make_section_itemcounter() {
?>
<section class="wrap">
    <h3><b>サイトアイテムカウンター</b></h3>
    <div><b> 計測数リセット</b></div>
    <button id="my-wp-setting-itemcounterreset">リセットする</button>
    <br>

<?php

    $customdata_pageid = "67";  //  固定ページid : site_costomfield
    $customdata_pagename = "site_customfield";  //  固定ページslug : site_costomfield
    //  カスタム投稿タイプ、カテゴリwordpress,lpの表示
    $my_args = array('pagename' => $customdata_pagename);
?>
<!-- <table class="form-table setting-table"> -->
<table class="setting-table">
    <tr class="head">
        <th>No</th>
        <th>キー名</th>
        <th>view/<br>閲覧数</th>
        <th>external/<br>外部閲覧数</th>
    </tr>

<?php $my_query = new WP_Query($my_args);
    $txt_cnt = 0;
    $customAll = [];
    $custom = [];
    $customids = [];
    //  指定固定記事1回のみ
    while ($my_query->have_posts()) :
        $my_query->the_post();
        //  カスタムキー全て取得
        $customAll = get_post_meta( get_the_ID() );
        print_r( "<br>" );
        //  カスタムキー分ループ
        foreach( $customAll as $key=>$val ){
            
            //  先頭に"_"はシステムカスタムキーとみなして省く
            if(substr($key,0,1) !== '_'){
                //  カスタム名から_exviewと_allviewを省き、ID名を取得
                $custom_id = strstr( $key, "_into", true);    //  _intoをキーとして切り分け、キー名を判別
                //  "_into"を確認する事で、無関係な変数を排除する
                if( $custom_id ){
                    $customids[$txt_cnt] = $custom_id;
                    if( array_key_exists( $custom_id, $custom) === false )
                        $custom[$custom_id] = [];
                    //  id名を保存しておく
                    $custom[$custom_id]['id'] = $custom_id;
                    //  exviewを判別しセット
                    $ret = strstr( $key,"into_exview" );
                    if( $ret ) $custom[$custom_id]['exview'] = $val[0];
                    //  allviewを判別しセット
                    $ret = strstr( $key,"into_allview" );
                    if( $ret ) $custom[$custom_id]['allview'] = $val[0];
                    $txt_cnt ++;
                }
            }
        }
    endwhile;
    wp_reset_postdata();
?>
<?php
    for($i = 0 ; $i < count( $custom ) ; $i ++ ){
        //var_dump( " [i]".$i."[count(custom)]".count($custom)."<br>" );
        //var_dump( "    [customids[i]]".$customids[$i]."<br>" );
        $id = $customids[$i];
        $allview = "--";
        $exview = "--";
        if( array_key_exists( 'exview', $custom[$id] ) === true ){
            $exview = $custom[$id]['exview'];
        }
        if( array_key_exists( 'allview', $custom[$id] ) === true ){
            $allview = $custom[$id]['allview'];
        }
?>
	<tr>
		<th><?php echo $i."/".count($custom); ?></th>
		<td><?php echo $id;?></td>
		<td><?php echo $allview; ?></td>
		<td><?php echo $exview; ?></td>
	</tr>
<?php
    }
?>
</table>
<br>
記事中のアイテムに仕込んだカウントを0にします。<br>
変数は固定ページ"site_custom"にカスタムフィールドとして設定しています。
<br>
<br>
</section>
<hr>
<!-- アイテムカウンター一覧表示 -->

<?php
}
?>