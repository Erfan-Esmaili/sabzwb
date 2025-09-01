import { editAdminInfo } from "./funcs/users.js"
 
window.addEventListener('load',()=>{
  let editInfoBtn = document.getElementById('editInfoBtn')

  editInfoBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    editAdminInfo()
  })
})