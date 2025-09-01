import { answerToTicket, getAndShowAllTickets, seeBodyTicket } from "./funcs/tickets.js"

window.seeBodyTicket=seeBodyTicket
window.answerToTicket=answerToTicket
window.addEventListener('DOMContentLoaded',()=>{
  getAndShowAllTickets()
})