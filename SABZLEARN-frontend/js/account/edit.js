import { editUserInformation,editAdminInfo } from "./funcs/edit.js";

window.addEventListener("DOMContentLoaded", () => {
  let editInfosBtn = document.querySelector("#editInfosBtn");
  editUserInformation();

  editInfosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editAdminInfo();
  });
});
