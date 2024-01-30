<?php
//---------------------------------------------
//
//  カスタムフィールド用セクションの宣言
//
//  https://labo.kon-ruri.co.jp/wp-custom-fields-without-plugins/#%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%9B%E3%81%9A%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%89%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95
//---------------------------------------------

function create_custom_fields()
{
  add_meta_box(
    'custom_field_1',         //セクションのID
    'カスタムフィールドエリア', //セクションのタイトル
    'insert_custom_fields',     //フォーム部分を指定する関数
//    'post',             //  投稿タイプ名、カスタム投稿タイプ名
    'work',             //  投稿タイプ名、カスタム投稿タイプ名
    'normal',           //  セクションの表示場所
    'default'           //  優先度
  );
}
add_action('admin_menu', 'create_custom_fields');

//---------------------------------------------
//
//  見た目（フォーム部分）の指定
//
//---------------------------------------------
function insert_custom_fields($post)
{
  //    nounceフィールドの追加
  wp_nonce_field('custom_field_save_meta_box_data', 'custom_field_meta_box_nonce');

  //すでに保存されているデータを取得
  $sample_text = get_post_meta($post->ID, 'sample_text', true);
  $sample_radio = get_post_meta($post->ID, 'sample_radio', true);

  //    制作事例
  $work_num_sortindex = get_post_meta($post->ID, 'work_num_sortindex', true);
  $work_txt_mypart = get_post_meta($post->ID, 'work_txt_mypart', true);
  $work_txt_when = get_post_meta($post->ID, 'work_txt_when', true);
  $work_txt_days = get_post_meta($post->ID, 'work_txt_days', true);
  $work_txt_category = get_post_meta($post->ID, 'work_txt_category', true);
  $work_txt_skill = get_post_meta($post->ID, 'work_txt_skill', true);
  $work_txt_summary = get_post_meta($post->ID, 'work_txt_summary', true);
  $work_txt_url = get_post_meta($post->ID, 'work_txt_url', true);
  $work_txt_user = get_post_meta($post->ID, 'work_txt_user', true);
  $work_txt_pass = get_post_meta($post->ID, 'work_txt_pass', true);
  $work_txt_githuburl = get_post_meta($post->ID, 'work_txt_githuburl', true);
  $work_txt_imageurl = get_post_meta($post->ID, 'work_txt_imageurl', true);
  $work_txt_thumburl = get_post_meta($post->ID, 'work_txt_thumburl', true);

?> 
    <style>
        .cf_works{
            display: flex;
            flex-direction :row;
            gap: 20px;
        }
        .cf_works__row{
            display: flex;
            flex-direction : column;
        }
        .cf_works__row > input {
            min-width: 200px;
        }
        .cf_works__row > textarea{
            white-space:pre-wrap;
            min-width: 400px;
            min-height: 200px;
        }
        .cf_works__row > p{
            white-space:pre-wrap;
        }
        #work_txt_testsummary{
            white-space:pre-wrap;
        }
    </style>
    <div class ="cf_works">
        <div class ="cf_works__row">
            <label for="work_txt_mypart">担当範囲</label>
            <input id="work_txt_mypart" type="text" name="work_txt_mypart" value="<?php echo $work_txt_mypart; ?>">
            <br>
            <label for="work_txt_category">カテゴリ</label>
            <input id="work_txt_category" type="text" name="work_txt_category" value="<?php echo $work_txt_category; ?>">
            <br>
            <label for="work_txt_skill">使用スキル</label>
            <input id="work_txt_skill" type="text" name="work_txt_skill" value="<?php echo $work_txt_skill; ?>">
            <br>
            <label for="work_txt_summary">概要</label>
<textarea id="work_txt_summary" name="work_txt_summary">
<?php echo $work_txt_summary; ?>
</textarea>
            <pre id="work_txt_testsummary">あ</pre>
            <br>
        </div>
        <div class ="cf_works__row">
            <label for="work_num_sortindex">ソート番号</label>
            <input id="work_num_sortindex" type="number" name="work_num_sortindex" value="<?php echo $work_num_sortindex; ?>">
            <br>
             <label for="work_txt_days">日数</label>
            <input id="work_txt_days" type="text" name="work_txt_days" value="<?php echo $work_txt_days; ?>">
            <br>
            <label for="work_txt_when">時期</label>
            <input id="work_txt_when" type="text" name="work_txt_when" value="<?php echo $work_txt_when; ?>">
            <br>
            <label for="work_txt_url">リンクURL(httpsで)</label>
            <input id="work_txt_url" type="text" name="work_txt_url" value="<?php echo $work_txt_url; ?>">
            <br>
            <label for="work_txt_user">リンクユーザー名</label>
            <input id="work_txt_user" type="text" name="work_txt_user" value="<?php echo $work_txt_user; ?>">
            <br>
            <label for="work_txt_pass">リンクパスワード</label>
            <input id="work_txt_pass" type="text" name="work_txt_pass" value="<?php echo $work_txt_pass; ?>">
            <br>
        </div>
        <div class ="cf_works__row">
            <label for="work_txt_imageurl">フル画像ファイル名(例:full-lp01)これ+pc.png/sp.pngが付与されます</label>
            <input id="work_txt_imageurl" type="text" name="work_txt_imageurl" value="<?php echo $work_txt_imageurl; ?>">
            <br>
            <label for="work_txt_thumburl">サムネ画像ファイル名(例:thumb02.jpg)</label>
            <input id="work_txt_thumburl" type="text" name="work_txt_thumburl" value="<?php echo $work_txt_thumburl; ?>">
            <br>
            <label for="work_txt_githuburl">GitHubURL</label>
            <input id="work_txt_githuburl" type="text" name="work_txt_githuburl" value="<?php echo $work_txt_githuburl; ?>">
        </div>
    </div>
  <br>
  <!--textareaに変数をセット-->
  <script>
    var wta =document.getElementById("work_txt_summary");
    var wtates =document.getElementById("work_txt_testsummary");
//    var w_row =document.getElementById("cf_works__row");
    /*wtates.textContent = "<?php echo $work_txt_summary; ?>";*/
  </script>
  <!--
  <label for="sample_radio1">選択肢1</label>
  <input id="sample_radio1" type="radio" name="sample_radio" value="1" <?php if ($sample_radio == 1) echo 'checked'; ?>>
  <label for="sample_radio2">選択肢2</label>
  <input id="sample_radio2" type="radio" name="sample_radio" value="2" <?php if ($sample_radio == 2) echo 'checked'; ?>>
-->
<?php
}

//---------------------------------------------
//
//  データの保存処理
//
//---------------------------------------------
function save_custom_fields($post_id)
{
  //nounceがセットされているか確認
  if (!isset($_POST['custom_field_meta_box_nonce'])) {
    return;
  }

  //nounceが正しいか検証
  if (!wp_verify_nonce($_POST['custom_field_meta_box_nonce'], 'custom_field_save_meta_box_data')) {
    return;
  }

  //    制作事例
  if (isset($_POST['work_txt_mypart'])) {
    $data = sanitize_text_field($_POST['work_txt_mypart']);
    update_post_meta($post_id, 'work_txt_mypart', $data);
  }
  if (isset($_POST['work_txt_when'])) {
    $data = sanitize_text_field($_POST['work_txt_when']);
    update_post_meta($post_id, 'work_txt_when', $data);
  }
  if (isset($_POST['work_txt_days'])) {
    $data = sanitize_text_field($_POST['work_txt_days']);
    update_post_meta($post_id, 'work_txt_days', $data);
  }
  if (isset($_POST['work_txt_category'])) {
    $data = sanitize_text_field($_POST['work_txt_category']);
    update_post_meta($post_id, 'work_txt_category', $data);
  }

  if (isset($_POST['work_num_sortindex'])) {
    $data = (int)sanitize_text_field($_POST['work_num_sortindex']);
    update_post_meta($post_id, 'work_num_sortindex', $data);
  }

  if (isset($_POST['work_txt_skill'])) {
    $data = sanitize_text_field($_POST['work_txt_skill']);
    update_post_meta($post_id, 'work_txt_skill', $data);
  }
  if (isset($_POST['work_txt_summary'])) {
    $data = sanitize_textarea_field($_POST['work_txt_summary']);
    update_post_meta($post_id, 'work_txt_summary', $data);
  }
  if (isset($_POST['work_txt_url'])) {
    $data = sanitize_text_field($_POST['work_txt_url']);
    update_post_meta($post_id, 'work_txt_url', $data);
  }
  if (isset($_POST['work_txt_user'])) {
    $data = sanitize_text_field($_POST['work_txt_user']);
    update_post_meta($post_id, 'work_txt_user', $data);
  }
  if (isset($_POST['work_txt_pass'])) {
    $data = sanitize_text_field($_POST['work_txt_pass']);
    update_post_meta($post_id, 'work_txt_pass', $data);
  }
  if (isset($_POST['work_txt_imageurl'])) {
    $data = sanitize_text_field($_POST['work_txt_imageurl']);
    update_post_meta($post_id, 'work_txt_imageurl', $data);
  }
  if (isset($_POST['work_txt_thumburl'])) {
    $data = sanitize_text_field($_POST['work_txt_thumburl']);
    update_post_meta($post_id, 'work_txt_thumburl', $data);
  }
  if (isset($_POST['work_txt_githuburl'])) {
    $data = sanitize_text_field($_POST['work_txt_githuburl']);
    update_post_meta($post_id, 'work_txt_githuburl', $data);
  }
}

add_action('save_post', 'save_custom_fields');
