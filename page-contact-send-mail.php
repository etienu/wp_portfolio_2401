<?php
function console_log($data){
    echo '<script>';
    echo 'console.log('.json_encode($data).')';
    echo '</script>';
}

function contact__sendmail( $i_POST ){
    mb_language("japanese"); 
    mb_internal_encoding("UTF-8");

    //  引数がない場合はエラー終了
    if( count($i_POST) <= 0 ){
        return;
    }

    $sitecontactmail = "contact@nino-code.com";
    $siteurl = "https://nino-code.com";
    $sitename = get_bloginfo( 'name' );
    //----------------------------------------
    //  自分への通知
    //----------------------------------------
    $to      = $sitecontactmail;
    $subject = "[".$sitename."] お問い合わせがありました - [お名前]".$i_POST['your-name'];
    $headers = "From: ".$sitecontactmail;
    $message = ""
    ."━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    ."以下の内容でメールを受け付けました。\n"
    ."━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    ."[お名前]".$i_POST['your-name']."\n\n"
    ."[メール]".$i_POST['your-email']."\n\n"
    ."[お問い合わせ内容]\n".$i_POST['your-message']."\n"
    ."━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    ."[reCAPTCHAスコア]".$i_POST['grc_score']."\n\n"
    ."このメールは [".$sitename."][".$siteurl."]のお問い合わせフォームから送信されました\n";
    if( !wp_mail( $to, $subject, $message, $headers ) ){
        console_log( "自分への通知 : 失敗" );
    }else{
    }

    //----------------------------------------
    //  相手への自動返信
    //----------------------------------------
    $to = $i_POST['your-email']; //  出す相手
    $subject = "【".$sitename."】お問い合わせありがとうございます！";
    $headers = "From: ".$sitename." <".$sitecontactmail.">";
    $message = ""
    ."────────────────────────────────────────\n"
    ."※このメールはシステムからの自動返信です\n"
    ."────────────────────────────────────────\n\n"
    .$i_POST['your-name']." 様\n\n"
    ."この度は【".$sitename."】にお問い合わせいただきありがとうございます！\n\n"
//    ."=========== お問い合わせ内容 ===========\n"
    ."- - - - - - - - - - - - - - - - - - - - - - - -\n"
    ."■お名前        : ".$i_POST['your-name']."\n"
    ."■メールアドレス : ".$i_POST['your-email']."\n"
    ."■お問い合わせ内容■\n"
    .$i_POST['your-message']."\n\n"
    ."- - - - - - - - - - - - - - - - - - - - - - - -\n"
    ."お問い合わせいただきました内容については\n"
    ."3営業日以内にご連絡いたします。\n\n"
    //."--------------\n"
    ."────────────────────────────────────────\n"
    ."このメールは".$sitename."(".home_url().") のお問い合わせフォームから送信されました";

    if( !wp_mail($to, $subject, $message, $headers) ){
        console_log( "相手への自動送信 : 失敗" );
    }else{
    }
}

?>