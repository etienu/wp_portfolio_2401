//----------------------------------------
//  scollbutton : 「繰り返し」
//----------------------------------------
{
    let eff_classs = document.querySelectorAll('.js-gsap__scrollbutton');
    eff_classs.forEach((target) => {
        let divs = target.querySelectorAll('.icon span');
        //console.log("[target]" + target);
        for (var i = 0; i < divs.length; i++) {
            var iy = i * 0.5;
            var bar = divs[i];
            //console.log("[i]" + i + "[len]" + divs.length + "[bar]" + bar);

            gsap.set(bar, { opacity: 0, y: 0, rotate : 45 });
            const tl = gsap.timeline();
            tl.to(
                bar, { delay: iy, duration: 0 }
            ).to(
                bar, { opacity: 1, duration: 0 }
            ).to(
                bar, {
                    y: 40,
                    rotate : 45,
                    opacity: 0,
                    duration: 1,
                    repeat: -1
                }
            );

        }
    });
}
