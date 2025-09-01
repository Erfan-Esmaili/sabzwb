import { getAndShowNavbarMenus } from "./funcs/shared.js";
import {
  getOneSession,
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,
} from "./funcs/shared.js";
window.addEventListener("load", () => {
  // **get and show menus and submenus
  getAndShowNavbarMenus();

  // **get one session
  getOneSession();

  // !show user name in navbar
  showUserNameInNavbar();

  // ! !get all menus & submenus items &Responsive
  getAndShowNavbarMenus();

  // ! renderTopBarMenus
  renderTopBarMenus();
});
