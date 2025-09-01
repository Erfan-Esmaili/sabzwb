import { globalSearch ,showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,} from "./funcs/shared.js";

window.addEventListener('load',()=>{

  globalSearch()



    // !show user name in navbar
    showUserNameInNavbar();

    // ! !get all menus & submenus items &Responsive
    getAndShowNavbarMenus();
  
    // ! renderTopBarMenus
    renderTopBarMenus();
  
})