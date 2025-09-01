import {
  createSession,
  getAndShowAllSessions,
  prepareCreateNewSessionForm,
} from "./funcs/sessions.js";

window.addEventListener("load", () => {
  let createSessionBtn = document.querySelector("#create-session");

  getAndShowAllSessions();
  prepareCreateNewSessionForm();

  createSessionBtn.addEventListener("click", event => {
    event.preventDefault()
      createSession();
   
  });
});
