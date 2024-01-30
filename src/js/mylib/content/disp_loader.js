//========================================================
//
//  コンテンツ / 読み込み画面
//
//========================================================
export default class displayLoader {
    constructor() {
        this.init();
    }

    //  javaScript
    init() {
        let elements = document.getElementsByTagName('button');
        for (let element of elements) {
            if (element.getAttribute('data-id')) {
                element.addEventListener('click', testLoad);
            }
        }
        this.stopAllLoad();
    }

    startLoad(id) {
        if (!id) return;
        document.getElementById(id).style.visibility = 'visible';
        setTimeout(self.stopAllLoad, 3000);
    }

    testLoad() {
        let dataId = "loading";
        this.startLoad(dataId);
        this.stopAllLoad();
    }

    stopAllLoad() {
        let elements = document.getElementsByClassName('l-loader');
        for (let element of elements) {
            element.classList.add("hide");
            //  消しておく
            setTimeout(function() {
                element.classList.add("delete");
            }, 1000);
        }
    }

    //  イベント登録
    eventRegistration() {
        //この登録の仕方だとthisがここになっしまいエラー。
        //window.addEventListener('load', this.testLoad );
        //  ここでアロー関数で登録するとthisが使える
        window.addEventListener('load', () => { this.testLoad() });
    }

}