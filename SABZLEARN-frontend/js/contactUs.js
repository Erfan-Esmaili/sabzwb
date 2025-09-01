import {
  contactUs,
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,
} from "./funcs/shared.js";

window.addEventListener("load", () => {
  // !show user name in navbar
  showUserNameInNavbar();

  // ! !get all menus & submenus items &Responsive
  getAndShowNavbarMenus();

  // ! renderTopBarMenus
  renderTopBarMenus();

  let submitBtn = document.querySelector("#submit-btn");

  document.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await contactUs(); // مستقیم اجرا کن
    }
  });

  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await contactUs();
  });
});
