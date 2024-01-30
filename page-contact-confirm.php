<?php
/*---------------------------------------------------------
    page-contact-confirm.php
    コンタクトフォーム - 確認
-----------------------------------------------------------*/
    //  セッションの開始
    if( session_status() !== PHP_SESSION_ACTIVE ) {
        session_start();
    }

//var_dump( $_SESSION);
//var_dump( $_POST);

    //  formのpost以外でアクセスしたらTOPへリダイレクト
    //  セッショントークンがない、違う = 更新された
    if( !isset($_SESSION['token']) || $_SESSION['token'] !== $_POST['csrf_token'] ) {
        wp_safe_redirect(home_url());
        exit;

    }else{
    }

    //------------------------------
    //  google reCAPTCHA v3

    global $reCAPTCHA_site_key;
    global $reCAPTCHA_secret_key;
	$site_key = $reCAPTCHA_site_key;       //  サイトキー
	$secret_key = $reCAPTCHA_secret_key;   //  シークレットキー

	$debugs = array(); //   debug用メッセージ格納
	$errors = array(); //   表示用エラーメッセージ格納
    $reCAPTCHA_score = 0;
    //  コンタクトフォームからの送信データがある
	if(isset($_POST) && count($_POST) > 0){
		$debugs["post"] = $_POST;
		//reCAPTCHA認証をユーザーが実行し、自分で設定したトークンデータが飛んできている
		if(isset($_POST["grc_token"])){
			$ch = curl_init(); //cURLを初期化
			//curlオプションを設定
			curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify"); // URLを設定
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //  curl_execの返り値を文字列にする
			curl_setopt($ch, CURLOPT_POST, true );  //  POSTメソッド使用
			curl_setopt($ch, CURLOPT_POSTFIELDS,    //  POSTパラメータの指定
				http_build_query(array(
					'secret' => $secret_key,
					'response' => $_POST[ 'grc_token' ]
				))
			);
			$response_json = curl_exec($ch); // curl実行
			curl_close($ch); // cURLを終了
			$response = json_decode( $response_json, true ); //レスポンスのjsonを配列にデコード

			$debugs["認証結果取得APIのレスポンス"] = $response;
			if (
                isset($response["success"])
                && $response["success"] == 1
			) {
				$debugs["APIの判定"] = "ReCAPTCHAの認証成功";
				if (
					isset($response["score"])
					&& floatval($response["score"]) >= 0.6
				) {
					$debugs["recaptcha-score"] = "ReCAPTCHAの検証スコアに合格 {$response["score"]}";
				}else{
					$errors["recaptcha-score"] = "ReCAPTCHAの検証スコアに不合格 {$response["score"]}";
				}
                //  スコアを保存しておく
                $reCAPTCHA_score = $response["score"];
			} else {
				$errors["recaptcha"] = "ReCAPTCHAの検証に失敗しました";
			}
		}else{
			$errors["recaptcha"] = "ReCAPTCHAのトークンがありません";
		}

    }
	$debugs["全エラー"] = $errors;
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
    <?php get_template_part(GET_PATH_R('template').'layout/l-submv', null, ['title' => 'お問い合わせ確認','lead'=>''] ); ?>

<main>
    <?php /* コンタクトフォーム */ ?>
    <?php
        //  入力→送信データの処理に全て成功した時の確認ページ
        if(isset($_POST) && count($_POST) > 0 && count($errors) == 0){
            get_template_part(GET_PATH_R('template').'layout/contact/l-contactform-confirm', null, ['reCAPTCHA_score' => $reCAPTCHA_score] );
            //echo '<p>[スコア]'.$debugs["recaptcha-score"].'</p>';
        }else{
            /*
            ※多くの場合はRecaptchaコンソールにてドメインの登録ミス
            echo "[失敗検証]<br>";
            var_dump( $_POST);
            echo "<br>";
            var_dump( $_SESSION);
            echo "<br>";
            echo "[error]".count($errors)."<br>";
            var_dump( $errors);
            */

    ?>
      <section class="l-contact u-padding_ud40 u-color-bg__main">
    <div class="l-contact__inner">
        <?php /* 見出し : 送信内容の確認 CONFIRM  */ ?>
        <div class="u-margin__t20"></div>
        <div class="l-heading --center">
            <div class="c-anchor__t-100" id="confirm"></div>
            <h2 class="c-ttl__heading-sub">エラーが発生しました<span class="sub --center">ERROR</span></h2>
        </div>

        <div class="p-contact__complete u-margin__t80">
                ブラウザバック・更新をしたなどの理由により<br>
                セッションが切れたか、何らかのエラーが発生しました。<br>
                <br>
                自動返信メールが送信されている場合、お問い合わせは成功しています。<br>
                <br>
                そうでない場合、お手数ですが再度お問い合わせを入力するか、<br>
                他の方法でのご連絡をお願い致します！<br>

            <?php /* トップに戻る */ ?>
            <div class="l-works__button__wrapper u-margin__t80">
                <a href="/" class="c-button__portfolio c-button__hover__back p-button__pf">
                トップに戻る
                </a>
            </div>
        </div>
    </div>
  
         
    <?php
        }
    ?>
    <?php   //エラーメッセージを表示する場合使用
    /*
        if(count($errors) > 0){
        echo '<div class="my-message-error">';
        foreach($errors as $error_id => $error_message){
            echo '<div>'.$error_message.'</div>';
        }
        echo '</div>';
    }*/
     ?>
</main>

<?php get_footer(); ?>

</body>
</html>
