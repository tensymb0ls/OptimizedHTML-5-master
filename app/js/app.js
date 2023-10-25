
import { Swiper } from "swiper";
import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper/modules';
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import { gsap, Power2 } from "gsap";
import MicroModal from "micromodal";


document.addEventListener('DOMContentLoaded', () => {
	// Modal
	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,

	})
	// Custom JS

	// Swiper
	// Slider image BG and total pagination code below
	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: 2100,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				let totalRes = total >= 10 ? total : `0${total}`;
				return totalRes;
			}
		}

	})
	// slider text content and controllers code below
	const swiperTEXT = new Swiper('.slider-text', {
		loop: false,
		speed: 2100,
		mousewheel: {
			invert: false
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	})
	// sliders synchronization
	swiperIMG.controller.control = swiperTEXT
	swiperTEXT.controller.control = swiperIMG

	// GEAR animation
	let gear = document.querySelector('.slider-gear');
	swiperTEXT.on('slideNextTransitionStart', function () {
		gsap.to(gear, 2.4, {
			rotation: '+=40',
			ease: Power2.easeOut
		})
	})
	swiperTEXT.on('slidePrevTransitionStart', function () {
		gsap.to(gear, 2.4, {
			rotation: '-=40',
			ease: Power2.easeOut
		})
	})

	// Count animation (current slide number)
	let curNum = document.querySelector('.slider-pagination-count .current'),
		pageCurr = document.querySelector('.slider-pagination-current__num')

	swiperTEXT.on('slideChange', function () {
		let ind = swiperTEXT.realIndex + 1
		gsap.to(curNum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function () {
				gsap.to(curNum, .1, {
					force3D: true,
					y: 10,
				})
				curNum.innerHTML = ind >= 10 ? ind : `0${ind}`;
				pageCurr.innerHTML = ind >= 10 ? ind : `0${ind}`;
			}
		})
		gsap.to(curNum, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3,
		})
	})

})
