import { register } from "./funcs/auth.js";
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

const $ = document;

const registerBtn = $.querySelector("#registerbutton");

registerBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  await register();
});
