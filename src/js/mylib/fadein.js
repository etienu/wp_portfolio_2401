//  要素のフェードイン
//  node = 要素
//  duration = 時間
export default (node, duration) => {
    // display: noneでないときは何もしない
    if (getComputedStyle(node).display !== 'none') return;

    // style属性にdisplay: noneが設定されていたとき
    if (node.style.display === 'none') {
        node.style.display = '';
    } else {
        node.style.display = 'block';
    }
    node.style.opacity = 0;

    var start = performance.now();

    requestAnimationFrame(function tick(timestamp) {
        // イージング計算式（linear）
        var easing = (timestamp - start) / duration;

        // opacityが1を超えないように
        node.style.opacity = Math.min(easing, 1);

        // opacityが1より小さいとき
        if (easing < 1) {
            requestAnimationFrame(tick);
        } else {
            node.style.opacity = '';
        }
    });
}