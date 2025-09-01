import { getAndShowAllCourses ,popularCourses , presellCourses,article,getAndShowNavbarMenus,globalSearch, showUserNameInNavbar,
  renderTopBarMenus,} from "./funcs/shared.js";


// !!typewriter
window.addEventListener('load',()=>{

  var app = document.getElementById('landingTitleText');
  
  var typewriter = new Typewriter(landingTitleText, {
    loop: true,
    delay: 70, 
    cursor: ''
  });
  
  typewriter.typeString('ما به هر قیمتی دوره آموزشی تولید نمیکنیم!')
  .pauseFor(2000)
  .start()
  
  
  // !!swiper
  
  const swiper = new Swiper('.swiper', {
    // speed: 400,
    loop:true,
    autoplay: {
      delay: 2300,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      990 :{
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
    
  });

    // !show user name in navbar
    showUserNameInNavbar();

    // ! !get all menus & submenus items &Responsive
    getAndShowNavbarMenus();
  
  // ! renderTopBarMenus
  renderTopBarMenus()
  
  // **show all courses
getAndShowAllCourses()

// **getpopularCourses
popularCourses()

// **get presellCourses
presellCourses()

// **
article()


// ** global search

let searchInput = document.querySelector('.landing__searchbar-input')
let searchBtn = document.querySelector('.landing__searchbar-btn')

searchBtn.addEventListener('click' , async(event)=>{
  event.preventDefault()
  location.href=`search.html?value=${searchInput.value.trim()}`
 await globalSearch()
 searchInput.value=''
})

searchInput.addEventListener('keyup',async(event)=>{
  if(event.key==='Enter'){
    event.preventDefault()
    location.href=`search.html?value=${searchInput.value.trim()}`
   await globalSearch()
   searchInput.value=''
  
  }
  
})

})


// ??Enable tooltips Bootstrap

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))