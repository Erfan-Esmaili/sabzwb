import { answerToMessage, getAllContact, removeAnswer, viewMessage } from "./funcs/contacts.js";

window.viewMessage= viewMessage
window.answerToMessage= answerToMessage
window.removeAnswer= removeAnswer

window.addEventListener('load' , ()=>{
  getAllContact()
})