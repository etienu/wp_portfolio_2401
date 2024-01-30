<?php
//=================================================================
//
//    ショートコード
//
//=================================================================
//-----------------------------------------------------------------
//
//  文字列の中のURLパラメータバインド変数({%パラメータ名})を実際の値に置換
//
//-----------------------------------------------------------------
function replace_req_params($atts, $content){
	
	//パラメータ初期化
	extract(shortcode_atts(array(
		'encode' => 'esc_html', //使用するエンコードorエスケープ関数 esc_html, urlencode
	), $atts));

	if($encode != "esc_html" && $encode != "urlencode"){
		return null; //それ以外エンコード指定は危ないので出力しない
	}	
		
	return replace_req_params_base($atts, $content);

}

add_shortcode('replace_req_params', 'replace_req_params');
?>