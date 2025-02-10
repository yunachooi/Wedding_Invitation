function Mobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }

let elementsArray = document.querySelectorAll(".area");
let screenH = window.innerHeight / 3 * 2.5;
let retVal = ele => ele.getBoundingClientRect().top;

window.onscroll = function () {
    elementsArray.forEach(function (ele) {
        let xval = retVal(ele);
        if (xval < screenH && xval > 0) ele.classList.add("view");
    });
};

elementsArray.forEach((ele, index) => {
    if (ele.querySelectorAll(".area") !== null) ele.querySelectorAll(".area").forEach((el, index) => el.style.animationDelay = "0." + (index + 3) + "s")
})

// 높이값
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
document.querySelector(".main_img").style.maxHeight = document.querySelector(".main_img > img").innerHeight + 'px';

// 디데이
const remainTime = document.querySelector(".countdown");
let days = remainTime.querySelector(".days");
let hour = remainTime.querySelector(".hour");
let min = remainTime.querySelector(".min");
let sec = remainTime.querySelector(".sec");
let myDay = document.querySelector(".dday_wrap .myDay_count .myDay");

function dDay() {
    const masTime = new Date("2025/05/25 12:30:00");
    const todayTime = new Date();

    const diff = masTime - todayTime;

    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMin = Math.floor((diff / (1000 * 60)) % 60);
    const diffSec = Math.floor(diff / 1000 % 60);

    days.innerText = `${diffDay}`;
    hour.innerText = `${diffHour}`;
    min.innerText = `${diffMin}`;
    sec.innerText = `${diffSec}`;
    myDay.innerText = `${diffDay}`;
}

dDay();
setInterval(dDay, 1000);

// 슬라이드 이미지
const sliderContainer = document.querySelector('.gallery_container');
const slider = document.querySelector('.gallery_container ul');
const sliderItem = slider.querySelectorAll('.gallery_item');


let clicked = false;
let xAxis;
let x;

if (!Mobile()) {
    sliderContainer.addEventListener('mouseup', () => {
        sliderContainer.style.cursor = `grab`;
    })

    sliderContainer.addEventListener('mousedown', e => {
        clicked = true
        xAxis = e.offsetX - slider.offsetLeft;
        sliderContainer.style.cursor = `grabbing`;
    })

    window.addEventListener('mouseup', () => {
        clicked = false;
    })

    sliderContainer.addEventListener('mousemove', e => {
        if (!clicked) return;
        e.preventDefault();

        x = e.offsetX;
        slider.style.left = `${x - xAxis}px`;
        slider.style.pointerEvents = 'none';

        checkSize();
    })
}

const checkSize = () => {
    let sliderContainerOut = sliderContainer.getBoundingClientRect();
    let sliderIn = slider.getBoundingClientRect();
    if (parseInt(slider.style.left) > 0) {
        slider.style.left = `0px`;
    } else if (sliderIn.right < sliderContainerOut.right) {
        slider.style.left = `-${sliderIn.width - sliderContainerOut.width}px`;
    }

    if (Math.abs(slider.offsetLeft) >= (slider.scrollWidth - sliderContainer.offsetWidth)) {
        slider.style.left = `-${slider.scrollWidth - sliderContainer.offsetWidth}px`;
    }
}

sliderContainer.addEventListener('touchstart', e => {
    clicked = true;
    xAxis = e.targetTouches[0].clientX - slider.offsetLeft;
}, { passive: true })

sliderContainer.addEventListener('touchmove', e => {
    if (!clicked) return;
    x = e.targetTouches[0].clientX;
    slider.style.left = `${x - xAxis}px`;
    checkSize();
}, { passive: true })

// 지도 
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.53602, 129.25894), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도에 마커를 생성하고 표시한다
var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(35.53602, 129.25894), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
});

//복사
let copyAddress = new ClipboardJS('#copy-map-address');
let copyAccount01 = new ClipboardJS('#copy-account01');
let copyAccount02 = new ClipboardJS('#copy-account02');
let copyAccount03 = new ClipboardJS('#copy-account03');
let copyAccount04 = new ClipboardJS('#copy-account04');
let copyAccount05 = new ClipboardJS('#copy-account05');
let copyAccount06 = new ClipboardJS('#copy-account06');

copyAddress.on('success', function (e) { copyItem(e) });
copyAccount01.on('success', function (e) { copyItem(e) });
copyAccount02.on('success', function (e) { copyItem(e) });
copyAccount03.on('success', function (e) { copyItem(e) });
copyAccount04.on('success', function (e) { copyItem(e) });
copyAccount05.on('success', function (e) { copyItem(e) });
copyAccount06.on('success', function (e) { copyItem(e) });

let copyShare = new ClipboardJS('#copy-share');
copyShare.on('success', function (e) { copyItem(e) });

function copyItem(event) {
    console.log(event)
    let copySuccess = event.trigger.querySelector('.copy_popup');
    copySuccess.style.display = 'block';
    setTimeout(() => { copySuccess.style.display = 'none' }, 2000);
}

//계죄번호 확인
let accountWrap = document.querySelector(".account_wrap");
let accountItem = accountWrap.querySelectorAll(".item .title");
accountItem.forEach(ele => ele.addEventListener("click", function () {
    let itemArea = this.parentElement;
    if (itemArea.classList.contains("on")) {
        accountItem.forEach(el => el.parentElement.classList.remove("on"));
        itemArea.classList.remove("on");
    } else {
        accountItem.forEach(el => el.parentElement.classList.remove("on"));
        itemArea.classList.add("on");
    }
}));

const BTNID = '#kakaotalk-sharing-btn';
const CHUNSIKIMG = "https://item.kakaocdn.net/do/b5d3d6a7b67fbf5afdaffb79fffbf8b14022de826f725e10df604bf1b9725cfd";
const webUrl = "http://yunachooi.dothome.co.kr"

// 일반적인 공유
const custom = {
    container: BTNID,
    objectType: 'location',
    address: '울산 남구 문수로 44',
    addressTitle: '문수컨벤션웨딩홀',

    content: {
        title: '성식❤️유나의 결혼식에 초대합니다.',
        description: '2025년 12월 13일 토요일 낮 12시 30분',
        imageUrl: CHUNSIKIMG,
        link: {
            mobileWebUrl: webUrl,
            webUrl: webUrl,
        },
    },

    social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
    },

    buttons: [
        {
            title: '청첩장 보기',
            link: {
                mobileWebUrl: webUrl,
                webUrl: webUrl,
            },
        },
    ],
}

Kakao.init("79a4075bbcdb4349a14e5ed9c88caddb");
Kakao.Link.createDefaultButton(custom);