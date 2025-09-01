import {
  getAndShowMenus,
  createNewMenu,
  getCategoryMenus,
  removeMenu
} from "./funcs/menus.js";

window.removeMenu =removeMenu


window.addEventListener("load", () => {
  let createMenuBtn = document.querySelector("#create-menu-btn");

  // ////
  getAndShowMenus();
// ////
  getCategoryMenus();

  createMenuBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewMenu();
  });
});
