import { getOneCourse,getRelatedCourses,sendComment, showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus, } from "./funcs/shared.js";

window.addEventListener('load',()=>{
// 

  // !show user name in navbar
  showUserNameInNavbar();

  // ! !get all menus & submenus items &Responsive
  getAndShowNavbarMenus();

// ! renderTopBarMenus
renderTopBarMenus()

// ////
  getOneCourse()
  // //محصولات مشابه////
  getRelatedCourses()
  ////ارسال کامنت////

  let sendBtn = document.querySelector(".comments__respond-btn");
sendBtn.addEventListener('click' , (event)=>{
  event.preventDefault()
  sendComment()
})
  
  
})