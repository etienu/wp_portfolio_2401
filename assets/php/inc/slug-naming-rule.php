<?php
//--------------------------------------------------------
//  テンプレートファイル名命名規則を弄る
//  ドメイン/親スラッグ/下層スラッグ
//  に対して
//  page-親スラッグ__下層スラッグ.php
//  というファイル名で対応できるようにする
//--------------------------------------------------------
add_filter('page_template_hierarchy', 'my_page_templates');
function my_page_templates($templates) {
    global $wp_query;

    $template = get_page_template_slug();
    $pagename = $wp_query->query['pagename'];

    if ($pagename && ! $template) {
        $pagename = str_replace('/', '__', $pagename);
        $decoded = urldecode($pagename);

        if ($decoded == $pagename) {
            array_unshift($templates, "page-{$pagename}.php");
        }
    }

    return $templates;
}

?>