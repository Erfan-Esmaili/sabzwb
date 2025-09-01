import { deleteCategory, getCategories,addNewCategory } from "./funcs/categories.js";

window.deleteCategory=deleteCategory

window.addEventListener('load' , ()=>{
  let createCategoryBtn = document.querySelector('#create-category-btn')

  createCategoryBtn.addEventListener('click' , (event)=>{
    event.preventDefault()
    addNewCategory()
  })
  getCategories()
  
  
  
})