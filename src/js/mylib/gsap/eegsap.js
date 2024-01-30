//----------------------------------------
//
//  etienu GSAP アニメーション
//
//----------------------------------------
export default class eegsap {
    constructor() {
    }

    //----------------------------------------
    //  各種イベントの登録
    //----------------------------------------
    eventRegistration( i_common ) {
        //  共有変数クラスの確保
        this.common = i_common;
        this.registanim__heading_eff();
        this.registanim__header_li();
        this.registanim__works_bg_box();
        this.registanim__works_bg_box_left2();
        this.registanim__works_bg_box_right();
        this.registanim__works_bg_box_right2();
        this.registanim__works_bg_box_right3();
        this.registanim__parallax_simple();
        this.registanim__intro__svg();
        this.registanim__intro__txtmarker();
        this.registanim__mv__particle();
    }

    //----------------------------------------
    //  c-title modan
    //  ポートフォリオ : 見出しh2のアニメーション
    //----------------------------------------
    registanim__heading_eff() {
        let textWrappers = document.querySelectorAll('[data-jstype="heading-eff"]');
        textWrappers.forEach((textWrapper) => {
            let bgcl,bgcr,bg,lead;
        
            let base = textWrapper.querySelector('[data-headingparts="base"]'); //  ベース
            if( base == null ) return;
        
            bg   = base.querySelector('[data-headingparts="bg"]');
            bgcl = base.querySelector('[data-headingparts="boxlu"]'); //  左上角
            bgcr = base.querySelector('[data-headingparts="boxrb"]'); //  右下角
            lead = base.querySelector('[data-headingparts="lead"]');
        
            let str_tglaction = 'play pause resume';
            if( bgcl ){
                gsap.fromTo(bgcl, { autoAlpha: 0, rotate: -270, scale: 0.5 }, {
                    autoAlpha: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: bg,
                        start: 'top center+=50%',
                        toggleActions: str_tglaction, 
                    }
                });
            }
            if( bgcr ){
                gsap.fromTo(bgcr, { autoAlpha: 0, rotate: 270, scale: 0.5 }, {
                    autoAlpha: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: bg,
                        start: 'top center+=50%',
                        toggleActions: str_tglaction, 
                    }
                });
            }
        
            //  背景
            if( bg ){
                gsap.fromTo(bg, { autoAlpha: 1, x: '10%' }, {
                    autoAlpha: 1,
                    duration: 3,
                    x: 0,
                    ease: 'Power4.easeOut',
                    scrollTrigger: {
                        trigger: bg,
                        start: 'top center+=50%',
                        toggleActions: str_tglaction, 
                    }
                });
            }
            if( lead ){
                gsap.fromTo(lead, { x: '-160%' }, {
                    rotate: 0,
                    x: '-50%',
                    ease: 'Power4.easeOut',
                    duration: 2,
                    scrollTrigger: {
                        trigger: lead, //アニメーションが始まるトリガーとなる要素
                        toggleActions: str_tglaction, 
                        start: 'top center+=50%'//, //アニメーションが始まる位置を指定
                        //end: "+=500"
                    }
                });
            }
        })
    }
    //----------------------------------------
    //  ポートフォリオ : ヘッダー li
    //----------------------------------------
    registanim__header_li() {
        let header_li_a_span = document.querySelectorAll('.p-header__nav ul li a span');
        let header_li_a = document.querySelectorAll('.p-header__nav ul li a');
        //文字列（テキスト）を分割しspanで囲む
        function js_li_splitspan() {
            header_li_a_span.forEach(target => {
                let newText = '';
                const text = target.textContent;
                const result = text.split('');
                for (let i = 0; i < result.length; i++) {
                    newText += '<span>' + result[i] + '</span>';
                }
                target.innerHTML = newText;
            });
        }
        
        js_li_splitspan();
        header_li_a.forEach((h_lia) => {
            let li_a_i = h_lia.querySelector('[data-parts="boxlt"]'); //  左上角
            let li_a_u = h_lia.querySelector('[data-parts="boxrb"]'); //  右下角
            let li_a_span = h_lia.querySelector('[data-parts="text"]'); //  aの下の文字列格納span
        
            // 初期の状態(取ってきたドット・テキストは最初は非表示)
            // ドットとテキストを非表示
            gsap.set([li_a_i, li_a_u], { opacity: 0 });
            // timelineを作成（各アニメーションを連動させる）
            const tl = gsap.timeline();
            // toで状態を変化させる
            let ani = tl.to(
                li_a_i, {
                    rotate: 180,
                    duration: 0.2,
                    opacity: 1
                },
                //'+=.1' // 前のアニメーションが完了した0.5秒後にドットを非表示
            ).to(
                li_a_u, {
                    rotate: 180,
                    duration: 0.3, // 0.3秒かけてアニメーション
                    opacity: 1
                },
                //'+=0.1'
            );
            ani.pause();
            h_lia.addEventListener("mouseenter", () => ani.play());
            h_lia.addEventListener("mouseleave", () => ani.reverse());
        });
    }

    //----------------------------------------
    //  works bg box
    //  ポートフォリオ : works左の箱
    //----------------------------------------
    registanim__works_bg_box() {
        let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxl"]');
        eff_classs.forEach((target) => {
                var tar = target;
    //            console.log("[tar]" + tar);
                gsap.set(tar, { opacity: 0.3, rotate : 0, repeat: -1 });
                const tl = gsap.timeline();
                //const tl2 = gsap.timeline();
                tl.to( tar, { rotate : 360,
                    duration: 50, opacity : 0.3,
                    ease: Linear.easeNone, repeat: -1,
                    //  逆再生完了時にタイムライン最後に戻る
                    onReverseComplete:()=>{
                        if(tl.reversed()){
                            tl.progress(1);
                            //console.log("reverse中");
                        }
                        //console.log("reverseコンプ");
                    },
                    onComplete:()=>{
                        if(!tl.reversed()){
                            tl.progress(0);
                            //console.log("通常再生中");
                        }
                        //console.log("onComplete");
                        }
                    }
                );
                //  保存
                this.common.gsap['skill_gear'] = {tar:tar, tl:tl, state: 0 };
        });    
    }

    //----------------------------------------
    //  works bg box
    //  ポートフォリオ : works左の箱2
    //----------------------------------------
    registanim__works_bg_box_left2() {
        let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxl2"]');
        if( eff_classs.length <= 0 ) return;
        eff_classs.forEach((target) => {
                var tar = target;
                gsap.set(tar, { opacity: 0.3, rotate : 0 });
                const tl = gsap.timeline();
                tl.to(
                    tar, {
                        rotate : -360,
                        duration: 50,
                        opacity : 0.3,
                        ease: Linear.easeNone,
                        repeat: -1,
                        //  逆再生完了時にタイムライン最後に戻る
                        onReverseComplete:()=>{
                            if(tl.reversed()){
                                tl.progress(1);
                            }
                        },
                        onComplete:()=>{
                            if(!tl.reversed()){
                                tl.progress(0);
                            }
                        }
                    }
                );
                //  保存
                this.common.gsap['skill_gear_min'] = {tar:tar, tl:tl, state: 0 };
        });
        
    }

    //----------------------------------------
    //  works bg box
    //  ポートフォリオ : works右の箱
    //----------------------------------------
    registanim__works_bg_box_right() {
        let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr"]');
        if( eff_classs.length <= 0 ) return;
        eff_classs.forEach((target) => {
                var tar = target;
                gsap.set(tar, { opacity: 0.3, rotate : 0 });
                const tl = gsap.timeline();
                tl.to(
                    tar, {
                        rotate : -360,
                        duration: 30,
                        opacity : 0.3,
                        repeat: -1
                    }
                );
        });
    }
    //----------------------------------------
    //  works bg box
    //  ポートフォリオ : works右の箱
    //----------------------------------------
    registanim__works_bg_box_right2() {
        let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr2"]');
        if( eff_classs.length <= 0 ) return;
        eff_classs.forEach((target) => {
                var tar = target;
                gsap.set(tar, { opacity: 0.3, rotate : 45 });
                const tl = gsap.timeline();
                tl.to(
                    tar, {
                        rotate : -15,
                        duration: 10,
                        opacity : 0.3,
                        ease : "sine.out",
                    }
                ).to(
                    tar, {
                        rotate : 45,
                        duration: 10,
                        opacity : 0.3,
                        ease : "sine.out"
                    }
                );
                tl.repeat( -1 );
        });
    }
    //----------------------------------------
    //  works bg box
    //  ポートフォリオ : works右の箱3
    //----------------------------------------
    registanim__works_bg_box_right3() {
        let eff_classs = document.querySelectorAll('[data-eff="worksbg-boxr3"]');
        if( eff_classs.length <= 0 ) return;
        eff_classs.forEach((target) => {
                var tar = target;
                gsap.set(tar, { opacity: 0.3, rotate : 10, scale :0.8 });
                const tl = gsap.timeline();
                tl.to(
                    tar, {
                        rotate :  0,
                        duration: 3,
                        scale: 1.0,
                        opacity : 0.3,
                        ease : "linear",
                    }
                ).to(
                    tar, {
                        rotate :  -10,
                        duration: 5,
                        scale: 0.8,
                        opacity : 0.3,
                        ease : "sine.out",
                    }
                ).to(
                    tar, {
                        rotate :  0,
                        duration: 3,
                        scale: 1.0,
                        opacity : 0.3,
                        ease : "linear",
                    }
                ).to(
                    tar, {
                        rotate : 10,
                        duration: 10,
                        scale : 0.8,
                        opacity : 0.3,
                        ease : "sine.out"
                    }
                );
                tl.repeat( -1 );
        });
    }


    //----------------------------------------
    //  ポートフォリオ : パララックス
    //----------------------------------------
    registanim__parallax_simple() {
        let eff_classs = document.querySelectorAll('[data-eff="gsapparallax"]');
        if( eff_classs.length <= 0 ) return;
        eff_classs.forEach((target) => {
            var tar = target;
            const y = tar.getAttribute('data-y') || -100;
            gsap.fromTo(
                tar,
                {   
                    y:y,
                    scale:1.2
                },
                {
                    //  反対方向に移動→上から下
                    y: -y,    
                    scrollTrigger: {
                        trigger: ".l-hero",
                        //start: 'top bottom',
                        //end: 'bottom top',
                        scrub: 1,
                        //markers: true,
                    }
                }
            )
        });
    }

    //----------------------------------------
    //  ポートフォリオ : intro : SVG
    //----------------------------------------
    registanim__intro__svg() {
        let eff_classs = document.querySelectorAll('[data-eff="gsapintro_svg"]');
        if( eff_classs.length <= 0 ) return;
        //  svg機能をセットした大枠グループ
        eff_classs.forEach((tar) => {
            let objs =tar.querySelectorAll('.l-intro__idealp');
            //  大枠内のグループアイテム1個
            objs.forEach((tar) => {
                //  グループ内spanの文字列を全て分割
                this.common.splitTarget_span( tar, "", false  );
                let objctrl =tar;
                let objp1span = tar.querySelectorAll('span');
                let path_txt = "";
                let tl_delay = 0.1;
                gsap.set(objp1span, { opacity: 0 });
                const tl = gsap.timeline();
                //  指定data-indexによってパスを作成
                switch( objctrl.dataset["index"] )
                {
                case "1" : path_txt = [{ x: 0, y: 0 },{ x: -100, y: 0 },{ x: -200, y:0 },{ x: -300, y: -100 }];  tl_delay = 0; break; //  上から
                case "2" : path_txt = [{ x: 0, y: 0 },{ x: -100, y: 0 },{ x: -200, y:0 },{ x: -300, y:  100 }];  tl_delay = 0.5;  break; //  下から
                default: break;
                }
                tl.
                to( objp1span,
                    {
                    scrollTrigger: {
                        trigger: tar,
                        start: 'top bottom', //スクロールイベントの開始地点
                        end: 'bottom top', //スクロールイベントの終了地点
                        // 以下、onイベント
                        onEnter: () => {  tl.play()  },
                        onEnterBack: () => { tl.play()  },
                        onLeaveBack: () => { tl.pause() },
                        onLeave: () => { tl.pause() }
                        }
                    }
                ).
                to(
                    objp1span, {
                        duration: 2,
                        opacity: 1,
                        delay: tl_delay,
                        stagger: {
                            each : 0.1,
                            from : "end",
                        },
                        motionPath:{
                            path: path_txt,
                            autoRotate: true,
                            curviness:1,
                            start: 1,
                            end: 0
                        },
                        ease: "power1.easeOut"
                    }
                );
                //  範囲に入るまでタイムライン全体を停止
                tl.pause();
            });// objs.forEach((tar)
        });// eff_classs.forEach((tar)
    }


    //----------------------------------------
    //  ポートフォリオ : intro : マーカー
    //----------------------------------------
    registanim__intro__txtmarker() {
        let eff_classs = document.querySelectorAll('[data-eff="gsapintro_txtmarker"]');
        if( eff_classs.length <= 0 ) return;
        //  svg機能をセットした大枠グループ
        eff_classs.forEach((target) => {
            let tar = target;
            gsap.set(tar, { opacity: 1 });
            const tl = gsap.timeline();
            tl.
            to( tar,
                {
                    scrollTrigger: {
                        trigger: tar,
                        start: 'top bottom-=35%', //スクロールイベントの開始地点
                        end: 'bottom top', //スクロールイベントの終了地点
                        once : true,
                        // 以下、onイベント
                        onEnter: () => {  tl.play();
                            tar.dataset["disp"] = "true";
                        },
                        onEnterBack: () => { tl.play()
                            tar.dataset["disp"] = "true";
                        },
                    }
                }
            );
            //  範囲に入るまでタイムライン全体を停止
            tl.pause();
        });// eff_classs.forEach((tar)
    }// registanim__intro__txtmarker()


    //================================================
    //  パーティクル作成 PC
    //----------------------------------------
    registanim__mv__particle_maketl_pc( i_ang, i_vx, i_vy, i_target ) {
        const tar = i_target;
        const tl = gsap.timeline()
        .fromTo( tar,
            {
                x:(i_vx*20)+"vw", y:(i_vy*0)+"vw", transformOrigin:'50% 50%', scale: 1,
                duration: 0,
            },
            {
                duration: 0.5 + Math.random() *0.5,
                ease: "Power1.easeOut",
                x: (i_vx*40)+"vw",
                y: (i_vy*200)+"px",
                scale : 0,
                opacity : 1,
            }
        );

        return tl;
    }
    //----------------------------------------
    //  パーティクル作成 SP
    //----------------------------------------
    registanim__mv__particle_maketl_sp( i_ang, i_vx, i_vy, i_target ) {
        const tar = i_target;
        const tl = gsap.timeline()
        .fromTo( tar,
            {
                x:(i_vx*20)+"vw", y:(i_vy*0)+"px", transformOrigin:'50% 50%', scale: 1,
                duration: 0,
            },
            {
                duration: 0.5 + Math.random() *0.5,
                ease: "Power1.easeOut",
                x: (i_vx*70)+"vw",
                y: (i_vy*100)+"px",
                scale : 0,
                opacity : 1,
            }
        );

        return tl;
    }

    //----------------------------------------
    //  ポートフォリオ : mv : パーティクル
    //----------------------------------------
    registanim__mv__particle() {
        let eff_classs = document.querySelectorAll('[data-eff="mv_particle"]');
        if( eff_classs.length <= 0 ) return;
        let parstl = [];
        let parstlsp= [];
        let btntl = null;
        const maxcount = 20;
        const angleone = 360/20;
        //  svg機能をセットした大枠グループ
        eff_classs.forEach((tar) => {
            // たくさんの矩形を配置
            for (let i = 0; i < maxcount; i++ ) {
                const par = document.createElement("div");
                par.classList.add("particle");
                tar.appendChild(par);
            }
            let pars = tar.querySelectorAll('.particle');
            let cnt = 0;
            pars.forEach((tar) => {
                cnt ++;
                let ang = (cnt*angleone) + Math.floor(Math.random() * angleone);
                if( ang < 0 ) ang += 360;
                if( 360<= ang ) ang -= 360;
                //  角度からベクトル計算
                let vx = Math.sin( ang * Math.PI / 180 );
                let vy = Math.cos( ang * Math.PI / 180 );
                const tl = gsap.timeline();
                const tlsp = gsap.timeline();
                parstl[parstl.length] = tl;
                parstlsp[parstlsp.length] = tlsp;
                tl.add( this.registanim__mv__particle_maketl_pc( ang, vx, vy, tar ) );
                tlsp.add( this.registanim__mv__particle_maketl_sp( ang, vx, vy, tar ) );
                //  終わらせておく事で非表示
                tl.progress(1);
                tlsp.progress(1);
            });
        });// eff_classs.forEach((tar)
        //  タイトル取得
        let obj_btn = [...document.querySelectorAll('.l-hero__heading')];
        let obj_btndivs= null;
        let obj_btndiv = null;
        if( 0 < obj_btn.length ){
            obj_btndivs = [...obj_btn[0].querySelectorAll('div')];
        }
        if( 0 < obj_btndivs.length  ){
            obj_btndiv = obj_btndivs[0];
            //  タイトルのホバー : CSSで設定してもGSAPの設定の方が強く残ってしまうため
            obj_btndiv.addEventListener("mouseover", () => {           
                if(btntl&&btntl.isActive()){ return; }
                gsap.set(obj_btndiv, {
                    scale : 1.00,
                });

            });
            obj_btndiv.addEventListener("mouseleave", () => {           
                if(btntl&&btntl.isActive()){ return; }
                gsap.set(obj_btndiv, {
                    scale : 1.00,
                });
            });
            //  タイトルのクリック
            obj_btndiv.addEventListener("click", () => {
                //  アニメーション群をcommonで管理して、タイムラインが終わっているのかを確認したい
                //  タイトルアニメが終わっていればクリック可能にする
                //  自分のアニメが実行中ならクリック処理しない
                if(parstl[0].isActive() ||
                 parstlsp[0].isActive()){
                    return;
                }
                const ww = window.outerWidth;
                //  SP以下
                if( ww < 768 ){
                    for( var i = 0 ; i < parstlsp.length ; i ++ ){ parstlsp[i].play(0); }
                //  タブ以上
                }else{
                    // パーティクル全て実行
                    for( var i = 0 ; i < parstl.length ; i ++ ){ parstl[i].play(0); }
                }
                //  ボタン本体に対するアニメーション
                gsap.set(obj_btndiv, { scale : 1 });
                const tl = gsap.timeline();
                btntl = tl;
                tl
                .to( obj_btndiv,{ duration : 0.05, ease: "power1.inOut", scale : 0.9 })
                .to( obj_btndiv,{ duration : 0.2 , ease: "power1.inOut", scale : 1.0 });
            });
        }
    }// registanim__intro__txtmarker()
    
}//class eegsap
