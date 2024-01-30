//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";
// gulp停止はターミナルでCtrl+C

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, series, parallel, watch } = require("gulp");
//  画像圧縮
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
//  パス
const path = require('path');

//  sassコンパイル
const sass = require("gulp-sass")(require("sass"));

// 出力元と出力先のディレクトリを定義
const dir = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, ''), //  'public','dist'など
};


//  使用方法
//  ■VSCode■
//  Ctrl + Shift + @でターミナル開く
//  またはログウインドウの右に「ターミナル」がある
//  ターミナルからコマンドライン実行
//  > npx gulp imagemin
//  ■windows cmd ■
//  > npx gulp imagemin
//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//  画像圧縮処理
//  > npx gulp imagemin
//----------------------------------------------------------------------
function imagemin(done) {

    //    src("./src/assets/images/**")
    src(path.resolve(dir.src, "assets/images/**"))
        //    .pipe(changed("./assets/images/")) // 圧縮前後の比較
        .pipe(changed(path.resolve(dir.dist, "assets/images/"))) // 圧縮前後の比較
        .pipe(
            imageMin([
                pngquant({ // 追加
                    quality: [0.6, 0.7],
                    speed: 1,
                }),
                mozjpeg({ quality: 65 }), // 追加
                imageMin.svgo(),
                imageMin.optipng(),
                imageMin.gifsicle({ optimizationLevel: 3 }),
            ])
        )
        .pipe(dest(path.resolve(dir.dist, "assets/images/")));
    //        .pipe(dest("./assets/images/"));

    done();
}

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.imagemin = imagemin;
/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/