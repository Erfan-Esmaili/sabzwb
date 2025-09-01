import { prepareSendTicketForm, sendNewTicket, userCoursesRes } from "./funcs/sendTicket.js";

window.addEventListener("load", () => {
  let sendTicketBtn = document.querySelector("#sendTicketBtn");
  sendTicketBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendNewTicket();
  });
  prepareSendTicketForm();
  userCoursesRes();
});
