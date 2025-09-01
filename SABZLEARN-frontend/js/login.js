import { login, getMe } from "./funcs/auth.js";
import {
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,
} from "./funcs/shared.js";


 // !show user name in navbar
 showUserNameInNavbar();

 // ! !get all menus & submenus items &Responsive
 getAndShowNavbarMenus();

 // ! renderTopBarMenus
 renderTopBarMenus();
let $ = document;

let loginBtn = $.querySelector("#loginbtn");

window.addEventListener("keydown", (event) => {
 

  if (event.key == "Enter") {
    loginBtn.addEventListener("click", (event) => {
      event.preventDefault();
      login();
    });
  }
});
