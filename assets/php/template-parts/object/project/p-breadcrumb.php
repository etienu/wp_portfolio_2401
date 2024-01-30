<?php
//---------------------------------------------------
//      パンくず
//---------------------------------------------------
?>
<div class="p-breadcrumb">
    <div class="p-breadcrumb__inner">
        <div class="p-breadcrumb__text">
<?php
        //  モバイル
        if( wp_is_mobile() ){
            //echo "MOBILE";
        }

        //  ページによって分岐
        $category = get_the_category();
        //  トップページ
        if( is_front_page() || is_home() ){
?>
            <div class='p-breadcrumb__space'></div>
<?php
            //  2ページ目以降
            if( is_paged() ){
                echo "2ページ目以降";
            }
        }
        //  固定ページ
        elseif( is_page() ){
            echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
            echo "　>　<a href='".get_permalink()."' class='p-breadcrumb__link'>".get_the_title()."</a>";
        }

        //  投稿記事ページ
        elseif( is_single() ){
            echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
            if ( $category[0] ) {
                post__BreadCrumb_category( $category[0] );
                echo "　>　<a href='".get_permalink()."' class='p-breadcrumb__link'>".get_the_title()."</a>";
            }
        }
        //  アーカイブ
        elseif( is_archive() ){
            //  カテゴリー
            if( is_category() ){
                echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
                if ( $category[0] ) {
                    post__BreadCrumb_category( $category[0] );
                }
            }
            //  タグ
            elseif( is_tag() ){
                $tag_o = get_queried_object();
                echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
                if ( $tag_o ) {
                    echo "　>　";
                    echo "<a href='". get_tag_link($tag_o->term_id)."' class='p-breadcrumb__link'>タグ：".$tag_o->name."</a>";
                }
            }
        }
        //  検索
        elseif( is_search() ){
            echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
            echo "　>　";
            echo "検索";
        }
        //  404
        elseif( is_404() ){
            echo "<a href='".esc_url(home_url())."' class='p-breadcrumb__link'>ホーム</a>";
            echo "　>　";
            echo "404";
        }
?>
            </div>
        </div>
    </div>


<?php
function post__BreadCrumb_category( $i_cat ){
    //print_r( $i_cat );
    //  親があれば再起処理
    if( 0 < $i_cat->parent ){
        post__BreadCrumb_category( get_category( $i_cat->parent ) );
    }
    echo "　>　<a href='".get_category_link( $i_cat->term_id )."' class='p-breadcrumb__link'>".$i_cat->cat_name."</a>";
}
?>