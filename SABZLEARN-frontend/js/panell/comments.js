import { acceptCommentContent, answerToComment, getAndShowAllComments, rejectCommentContent, removeComment, showCommentContent } from "./funcs/comments.js"

window.showCommentContent=showCommentContent
window.acceptCommentContent=acceptCommentContent
window.rejectCommentContent=rejectCommentContent
window.answerToComment=answerToComment
window.removeComment=removeComment

window.addEventListener('load',()=>{
  getAndShowAllComments()
})