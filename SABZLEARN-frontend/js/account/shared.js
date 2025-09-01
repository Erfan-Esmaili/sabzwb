import { logout } from "../panell/funcs/utils.js";

window.addEventListener('load',()=>{
  let logoutUserBtn = document.querySelector('#logout-user')

  logoutUserBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    logout()
  })
})