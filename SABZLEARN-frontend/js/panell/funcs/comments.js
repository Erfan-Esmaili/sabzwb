import { convertDateToShamsi, showSwal, getToken } from "../../funcs/utils.js";

const getAndShowAllComments = async () => {
  let commentsContentTable = document.querySelector(".table tbody");
  commentsContentTable.innerHTML = "";
  await fetch("https://sabz.liara.run/v1/comments")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((comment, index) => {
        console.log(comment);

        commentsContentTable.insertAdjacentHTML(
          "beforeend",
          `
          
          <tr>
                      <td class=${
                        comment.answer == 0
                          ? "no-answer-comment"
                          : "answer-comment"
                      }>${index + 1}</td>
                      <td>${comment.creator.name}</td>
                      <td>${comment.course}</td>
                      <td>${convertDateToShamsi(
                        comment.createdAt.slice(0, 10)
                      )}</td>
                      <td>${comment.score}</td>
                     <td>
                     <button type="button" class="btn btn-info delete-btn" onclick="showCommentContent('${
                       comment.body
                     }')">مشاهده</button>
                     </td>
                     <td>
                     <button type="button" class="btn btn-warning delete-btn" onclick="answerToComment('${comment._id}')">پاسخ</button>
                     </td>
                     <td>
                     <button type="button" class="btn btn-success delete-btn"onclick="acceptCommentContent('${
                       comment._id
                     }')">تایید</button>
                     </td>
                     <td>
                     <button type="button" class="btn btn-secondary delete-btn"onclick="rejectCommentContent('${
                       comment._id
                     }')">رد</button>
                     </td>
                     <td>
                     <button type="button" class="btn btn-danger delete-btn"onclick="removeComment('${
                       comment._id
                     }')">حذف</button>
                     </td>
                     </tr>
          
          
          
          `
        );
      });
    });
};

const showCommentContent = (commentBody) => {
  showSwal(commentBody, "", true, "", "", "دیدم", "", "", () => {
    "";
  });
};

const acceptCommentContent = (commentID) => {
  showSwal(
    "از تایید کامنت مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید!",
    "",
    async (res) => {
      if (res.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/comments/accept/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then((res) => {
            if(res.ok){
              showSwal(
                'کامنت تایید شد',
                'success',
                  '',
                  1800,
                  '',
                  "",
                  '',
                  '',
                  ()=>{
                    getAndShowAllComments()
                  }
              )
            }
          })
      }
    }
  );
};

const rejectCommentContent = (commentID) => {
  showSwal(
    "از رد کامنت مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید!",
    "",
    async (res) => {
      if (res.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/comments/reject/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then((res) => {
            if(res.ok){
              showSwal(
                'کامنت رد شد',
                'success',
                  '',
                  1800,
                  '',
                  "",
                  '',
                  '',
                  ()=>{
                    getAndShowAllComments()
                  }
              )
            }
          })
      }
    }
  );
};

const answerToComment=(commentID)=>{
  Swal.fire({
    title:'پاسخ خود را ثبت کنید',
    input:'textarea',
    confirmButtonText:'ثبت'
  }).then(async(body)=>{
      if(body.isConfirmed){
       await fetch(`https://sabz.liara.run/v1/comments/answer/${commentID}`,{
          method : "POST",
          headers : {
              Authorization : `Bearer ${getToken()}`,
              "Content-type" : "Application/json"
          },
          body:JSON.stringify({body:body.value})
        }).then(res=>{
          if(res.ok){
             showSwal(
                        "پاسخ شما با موفقیت ارسال شد",
                        "success",
                        false,
                        "1500",
                        "",
                        "",
                        "",
                        "",
                        () => {
                          getAndShowAllComments();
                        }
                      );
          }
          
        })



      }

    
  })
  
}

const removeComment=(commentID)=>{
   showSwal(
    "از حذف کامنت مطمئنید",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید!",
    "",
    async (res) => {
      if (res.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then((res) => {
            if(res.ok){
              showSwal(
                'کامنت با موفقیت حذف شد',
                'success',
                  '',
                  1500,
                  '',
                  "",
                  '',
                  '',
                  ()=>{
                    getAndShowAllComments()
                  }
              )
            }
          })
      }
    }
  );
}
export { getAndShowAllComments, showCommentContent, acceptCommentContent ,rejectCommentContent,answerToComment,removeComment};
