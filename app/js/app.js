
import { Swiper } from "swiper";
import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper/modules';
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import { gsap, Power2 } from "gsap";

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS

	// Swiper
	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: 2100,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				return `0${total}`
			}
		}

	})

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

	// GEAR
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

	// Count
	let curNum = document.querySelector('.slider-pagination-count .current'),
		pageCurr = document.querySelector('.slider-pagination-count')

	swiperTEXT.on('slideChange', function () {
		let ind = swiperTEXT.realIndex
		console.log(ind)
		// **TODO 3.04.36
	})

})
