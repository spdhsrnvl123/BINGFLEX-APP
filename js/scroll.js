(() => {
    let currentScene = 0;
    let prevScrollHeight = 0;
    let yOffset = 0;
    let totalHeight = 0;
    let error_protect = false;

    const scene = [
        {
            type: "normal",
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#container-0")
            }
        },
        {
            type: "scrollEvent",
            scrollHeight: 0,
            height_add: 3,
            objs: {
                container: document.querySelector("#container-1"),
                messageA: document.querySelector(".messageA"),
                messageB: document.querySelector(".messageB"),
                messageC: document.querySelector(".messageC")
            },
            value: {
                messageA_opacity_in: [0, 1, { start: 0, end: 0.16 }],
                messageA_opacity_out: [1, 0, { start: 0.19, end: 0.26 }],
                messageA_translateY_in: [30, 0, { start: 0, end: 0.15 }],
                messageA_translateY_out: [0, -40, { start: 0.19, end: 0.26 }],
                
                messageB_opacity_in: [0, 1, { start: 0.26, end: 0.42 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.52 }],
                messageB_translateY_in: [30, 0, { start: 0.26, end: 0.41 }],
                messageB_translateY_out: [0, -40, { start: 0.45, end: 0.52 }],
                
                messageC_opacity_in: [0, 1, { start: 0.52, end: 0.68 }],
                messageC_opacity_out: [1, 0, { start: 0.71, end: 0.78 }],
                messageC_translateY_in: [30, 0, { start: 0.52, end: 0.67 }],
                messageC_translateY_out: [0, -45, { start: 0.71, end: 0.78 }],

            }
        },
        {
            type: "normal",
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#container-2")
            }
        }
    ]

    const set_Height = () => {
        for (let i = 0; i < scene.length; i++) {
            if (scene[i].type === "scrollEvent") { //이벤트를 적용시키고자 하는 섹션 높이 셋팅.
                scene[i].scrollHeight = scene[i].height_add * window.innerHeight;
            } else if (scene[i].type === "normal") { //이벤트 미적용 섹션 높이 기본값.
                scene[i].scrollHeight = scene[i].objs.container.offsetHeight;
            }
            scene[i].objs.container.style.height = `${scene[i].scrollHeight}px` //높이 셋팅
        }

        //새로고침 했을때 잘못된 값 삽입 방지.
        totalHeight = 0;
        for (let i = 0; i < scene.length; i++) {
            totalHeight += scene[i].scrollHeight;
            if (totalHeight >= scrollY) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`); 

        //새로고침 방지
        playAnimation()

    }

    const calculate = (value, currentYOffset) => {
        let result;
        let start_point = value[2].start * scene[currentScene].scrollHeight;
        let end_point = value[2].end * scene[currentScene].scrollHeight;
        let animation_point = end_point - start_point;

        if (currentYOffset >= start_point && currentYOffset <= end_point) {
            result = (currentYOffset - start_point) / animation_point * (value[1] - value[0]) + value[0];
        } else if (currentYOffset < start_point) {
            result = value[0]
        } else if (currentYOffset > end_point) {
            result = value[1]
        }
        return result;
    }

    const playAnimation = () => {
        let currentYOffset = 0;
        let value = scene[currentScene].value; //두번째 value 객체에 접근
        currentYOffset = yOffset - prevScrollHeight; //두번째 씬의 스크롤 값
        scrollRatio = currentYOffset / scene[currentScene].scrollHeight; //두번째 씬에서 스크롤 값의 비율 0 ~ 1

        switch (currentScene) {
            case 0:
                break; //첫번째 씬에서는 이벤트 발생 X
            case 1:
                if (scrollRatio <= 0.17) {
                    scene[currentScene].objs.messageA.style.opacity = calculate(value.messageA_opacity_in, currentYOffset);
                    scene[currentScene].objs.messageA.style.transform = `translateY(${calculate(value.messageA_translateY_in, currentYOffset)}px)`
                } else {
                    scene[currentScene].objs.messageA.style.opacity = calculate(value.messageA_opacity_out, currentYOffset);
                    scene[currentScene].objs.messageA.style.transform = `translateY(${calculate(value.messageA_translateY_out, currentYOffset)}px)`
                }
                if (scrollRatio <= 0.43) {
                    scene[currentScene].objs.messageB.style.opacity = calculate(value.messageB_opacity_in, currentYOffset);
                    scene[currentScene].objs.messageB.style.transform = `translateY(${calculate(value.messageB_translateY_in, currentYOffset)}px)`
                } else {
                    scene[currentScene].objs.messageB.style.opacity = calculate(value.messageB_opacity_out, currentYOffset);
                    scene[currentScene].objs.messageB.style.transform = `translateY(${calculate(value.messageB_translateY_out, currentYOffset)}px)`
                }
                if (scrollRatio <= 0.69) {
                    scene[currentScene].objs.messageC.style.opacity = calculate(value.messageC_opacity_in, currentYOffset);
                    scene[currentScene].objs.messageC.style.transform = `translateY(${calculate(value.messageC_translateY_in, currentYOffset)}px)`
                } else {
                    scene[currentScene].objs.messageC.style.opacity = calculate(value.messageC_opacity_out, currentYOffset);
                    scene[currentScene].objs.messageC.style.transform = `translateY(${calculate(value.messageC_translateY_out, currentYOffset)}px)`
                }
                break;
            case 2: 
                break; //첫번째 씬에서는 이벤트 발생 X 
        }
    }

    const update = () => {
        prevScrollHeight = 0;
        error_protect = false;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + scene[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + scene[currentScene].scrollHeight) {
            error_protect = true;
            currentScene++;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            error_protect = true;
            if (currentScene === 0) return; //바운스를 방지하기 위해.
            currentScene--;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
        }

        if (error_protect) return;

        playAnimation();
    }

    window.addEventListener("scroll", () => {
        yOffset = scrollY;
        update();
    })

    window.addEventListener('load', set_Height);
    window.addEventListener('resize', set_Height);
})();