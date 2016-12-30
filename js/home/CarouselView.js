/**
 * Created by lenovo on 2016/12/26.
 */
(function () {

    var CAROUSEL_WIDTH = 800;
    var CAROUSEL_HEIGHT = 600;
    var SWITCH_IMAGE_ANIMATION_DURATION = 300;
    var carouselContent = document.querySelector("#carousel .carousel-content");
    var imageIndex = 0;
    var switchImageTimerId = -1;
    var switchImageAnimationPlaying = false;

    function alphaAnim(target,fromAlpha,toAlpha,duration,compleleHandler) {

        var fps = 50;
        var frameDuration = Math.round(1000/fps);
        var frames = Math.round(duration/1000*fps);
        var frameIndex = 0;
        var speed = (toAlpha-fromAlpha)/frames;
        var alpha = fromAlpha;

        var id = setInterval(function () {
            alpha += speed;
            frameIndex++;

            if (frameIndex >= frames) {
                clearInterval(id);
                alpha = toAlpha;

                if (compleleHandler) {
                    compleleHandler(target);
                }

            }

            target.style.opacity = alpha;
        },frameDuration);

    }

    function fadeIn(target,completeHandler) {

        target.style.left = "0";
        target.style.top = "0";
        target.style.opacity = 0;
        alphaAnim(target,0,1,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function fadeOut(target,completeHandler) {

        alphaAnim(target,1,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function moveTo(target,fromX,toX,fromY,toY,duration,completeHandler) {

        var fps = 50;
        var frameDuration = Math.round(1000/fps);
        var frames = Math.round(duration/1000*fps);
        var frameIndex = 0;
        var x = fromX, y = fromY;
        var speedX = (toX-fromX)/frames;
        var speedY = (toY-fromY)/frames;

        var id = setInterval(function () {

            x += speedX;
            y += speedY;
            frameIndex++;

            if (frameIndex >= frames) {

                clearInterval(id);
                x = toX;
                y = toY;
                if (completeHandler) {
                    completeHandler(target);
                }

            }

            target.style.left = x + "px";
            target.style.top = y + "px";

        },frameDuration);

    }

    function moveInFromLeft(target,completeHandler) {

        target.style.left = -CAROUSEL_WIDTH + "px";
        target.style.opacity = 1;
        moveTo(target,-CAROUSEL_WIDTH,0,0,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function moveInFromTop(target,completeHandler) {

        target.style.top = -CAROUSEL_HEIGHT + "px";
        target.style.opacity = 1;
        moveTo(target,0,0,-CAROUSEL_HEIGHT,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function moveInFromRight(target,completeHandler) {

        target.style.left = CAROUSEL_WIDTH + "px";
        target.style.opacity = 1;
        moveTo(target,CAROUSEL_WIDTH,0,0,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function moveInFromBottom(target,completeHandler) {

        target.style.top = CAROUSEL_HEIGHT + "px";
        target.style.opacity = 1;
        moveTo(target,0,0,CAROUSEL_HEIGHT,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);

    }

    function moveOutToLeft(target,completeHandler) {
        moveTo(target,0,-CAROUSEL_WIDTH,0,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);
    }

    function moveOutToTop(target,completeHandler) {
        moveTo(target,0,0,0,-CAROUSEL_HEIGHT,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);
    }

    function moveOutToRight(target,completeHandler) {
        moveTo(target,0,CAROUSEL_WIDTH,0,0,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);
    }

    function moveOutToBottom(target,completeHandler) {
        moveTo(target,0,0,0,CAROUSEL_HEIGHT,SWITCH_IMAGE_ANIMATION_DURATION,completeHandler);
    }

    function createImageContainer(imgSrc,linkUrl) {

        var div = document.createElement("div");
        div.className = "image-container";
        var a = document.createElement("a");
        a.href = linkUrl || "#";
        div.appendChild(a);
        var img = document.createElement("img");
        img.src = imgSrc;
        a.appendChild(img);
        return div;

    }

    var carouselImagesArray = [
        createImageContainer("images/0.jpg"),
        createImageContainer("images/1.jpg"),
        createImageContainer("images/2.jpg"),
        createImageContainer("images/3.jpg"),
        createImageContainer("images/4.jpg"),
        createImageContainer("images/5.jpg"),
        createImageContainer("images/6.jpg"),
    ];

    var switchImageAnimations = [
        {inAnim:moveInFromRight,outAnim:moveOutToLeft},
        {inAnim:moveInFromTop,outAnim:moveOutToBottom},
        {inAnim:moveInFromBottom,outAnim:moveOutToTop},
        {inAnim:fadeIn,outAnim:fadeOut},
        {inAnim:moveInFromLeft,outAnim:moveOutToRight},
    ];

    var currentVisibleImage;

    function showNextCarouselImage() {

        if (!switchImageAnimationPlaying) {

            switchImageAnimationPlaying = true;
            imageIndex++;

            if (imageIndex >= carouselImagesArray.length) {
                imageIndex = 0;
            }

            switchImage(carouselImagesArray[imageIndex],{
                inAnim:moveInFromRight,
                outAnim:moveOutToLeft

            },function () {
                switchImageAnimationPlaying = false;
            });

        }

    }

    function showPreCarouselImage() {

        if (!switchImageAnimationPlaying) {

            switchImageAnimationPlaying = true;
            imageIndex--;

            if (imageIndex < 0) {
                imageIndex = carouselImagesArray.length - 1;
            }

            switchImage(carouselImagesArray[imageIndex],{
                inAnim:moveInFromLeft,
                outAnim:moveOutToRight
            },function () {
                switchImageAnimationPlaying = false;
            });

        }

    }

    function switchImageWithEffect() {

        if (!switchImageAnimationPlaying) {

            switchImageAnimationPlaying = true;
            imageIndex++;

            if (imageIndex >= carouselImagesArray.length) {
                imageIndex = 0;
            }

            switchImage(carouselImagesArray[imageIndex],switchImageAnimations[Math.floor(Math.random()*switchImageAnimations.length)], function () {
                switchImageAnimationPlaying = false;
            });

        }

    }

    function addInitCarouselImage() {

        imageIndex = 0;
        currentVisibleImage = carouselImagesArray[imageIndex];
        carouselContent.appendChild(currentVisibleImage);

    }

    function addListeners() {

        document.querySelector("#carousel .btn-pre").onclick = function () {
            showPreCarouselImage();
            restartSwitchImageTimer();
        };

        document.querySelector("#carousel .btn-next").onclick = function () {
            showNextCarouselImage();
            restartSwitchImageTimer();
        };

    }

    function switchImage(newImage,animPair,completeHandler) {

        animPair.outAnim(currentVisibleImage,function (target) {
            carouselContent.removeChild(target);
        });

        currentVisibleImage = newImage;
        animPair.inAnim(currentVisibleImage,function () {

            if (completeHandler){
                completeHandler();
            }

        });

        carouselContent.appendChild(currentVisibleImage);

    }

    function restartSwitchImageTimer() {

        if (switchImageTimerId != -1) {
            clearInterval(switchImageTimerId);
        }

        switchImageTimerId = setInterval(function () {
            switchImageWithEffect();
        },3000);

    }

    function init() {

        addListeners();
        addInitCarouselImage();
        restartSwitchImageTimer();

    }

    init();

})();