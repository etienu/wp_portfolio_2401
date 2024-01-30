<head>
	<meta charset="UTF-8">
	<?php
	//	CSS読み込み
	//	静的コーディング : ここで記述
	//	WP : function.phpで記述
	/*
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js" defer></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js" defer></script>
	<link rel="stylesheet" href="<?php echo GET_PATH('css'); ?>lib/swiper/swiper-bundle.min.css" media="print" onload="this.media='all'">
	*/
	?>
	<?php
	/* // JavaScript 読み込み
	//  静的コーディング : ここで記述
	//  WP : function.phpで読みこむ
	//	defer : 遅延読み込みの為、headに記述
	<script src="<?php echo GET_PATH('js'); ?>lib/gsap/gsap.min.js" defer></script>
	<script src="<?php echo GET_PATH('js'); ?>lib/gsap/ScrollTrigger.min.js" defer></script>
	<script src="<?php echo GET_PATH('js'); ?>lib/swiper/swiper-bundle.min.js" defer></script>
	<script src="<?php echo GET_PATH('js'); ?>bundle.js?v=<?php echo esc_html(date_i18n('Ymd_His'));?>" defer></script>
	<link rel="stylesheet" href="<?php echo GET_PATH('css'); ?>lib/swiper/swiper-bundle.min.css">
	<link rel="stylesheet" href="<?php echo GET_PATH('css'); ?>style.css?v=<?php echo esc_html(date_i18n('Ymd_His')); ?>">
	<?php
		//	コンタクトフォームのみ
		global $reCAPTCHA_site_key;
		if (is_page('contact')||is_page('contact-confirm') ):
	?>
	<script src="https://www.google.com/recaptcha/api.js?render=<?php echo $reCAPTCHA_site_key; ?>" defer></script>
	<?php endif; ?>
	*/
	?>
	<?php /* Base */ ?>
	<?php wp_head(); ?>
	<?php //	functions.php・プラグインから出力する場合は不要	 ?>
	<meta name="description" content="<?php bloginfo('description'); ?>">
	<?php /* 2023年現在keywordは検索エンジンが機能を廃止しているので無意味 */	 ?>
	<meta name="keyword" content="">

	<?php /* Favicon */ ?>
	<link rel="shortcut icon" href="<?php echo GET_PATH();?>common/favicon/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo GET_PATH();?>common/favicon/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" type="image/png" href="<?php echo GET_PATH();?>common/favicon/android-touch-icon.png" sizes="192x192">

	<?php /* 他 */ ?>
	<link rel="canonical" href="<?php echo get_pagenum_link(1); ?>">
	<?php /*
		IE終了の現在不要
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		*/
	 ?>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="format-detection" content="telephone=no">

	<?php /* robots : noindex 設定 : 間違いなく検索不要なページ */ ?>
	<?php if (is_page('contact-thanks')) : ?>
		<meta name="robots" content="noindex,nofollow">
	<?php endif; ?>


	<?php
	/*
		<!-- preconnect : 事前接続 -->
		<link rel="preconnect" href="https://google-analytics.com">
		<!-- google adsense -->
		<!-- google search console -->*/
	?>
	<!-- Google tag (gtag.js)
	 -->
	 <script async src="https://www.googletagmanager.com/gtag/js?id=G-BMDCTD1P1Z"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-BMDCTD1P1Z');
	</script>


</head>
