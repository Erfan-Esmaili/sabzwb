import { createNewArticle, deleteArticle, getAndShowAllArticles, getCategoryArticles } from "./funcs/articles.js";

window.deleteArticle=deleteArticle
window.addEventListener('load' , ()=>{
  let addNewArticleBtn = document.querySelector("#addNewArticleBtn");

  getAndShowAllArticles()
  getCategoryArticles()



addNewArticleBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  createNewArticle()
})

    
  })