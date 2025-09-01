// !!swiper


const handleSwiper=()=>{


const swiper = new Swiper('.mySwiper', {
  loop: false,
  autoplay: {
    delay: 2300,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",  // سلکتور عنصر pagination
    clickable: true,     
    dynamicBullets: true,      // کاربر بتونه روی نقطه‌ها کلیک کنه
 },
  breakpoints: { // 
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
   },
    768:{
      slidesPerView: 2,
      spaceBetween: 20,
   },
    // when window width is >= 768px
    880: {
      slidesPerView: 3,
      spaceBetween: 30,
   },
    // when window width is >= 992px
    992: {
      slidesPerView: 4,    
      spaceBetween: 30,

    },
  },
});
}
export {handleSwiper}

