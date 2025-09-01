import { getAndShowUsers,deleteUser, banUser,register, changeRole } from "./funcs/users.js";

window.deleteUser = deleteUser
window.banUser = banUser
window.changeRole = changeRole

window.addEventListener("load", () => {
  let registerBTN = document.querySelector('#registerBTN')

  registerBTN.addEventListener('click' , (event)=>{
    event.preventDefault()
    register()
  })




  getAndShowUsers();
});
