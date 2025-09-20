import { showSwal, getToken, convertDateToShamsi } from "../../funcs/utils.js";

const getAllContact = async () => {
  let contactListTableElem = document.querySelector(".table tbody");
  contactListTableElem.innerHTML = "";
  const res = await fetch("https://sabz.liara.run/v1/contact");
  const contact = res.json();

  contact.then((message) =>
    message.forEach((element, index) => {
      console.log(element);

      contactListTableElem.insertAdjacentHTML(
        "beforeend",
        `
        
        <tr>
        <td class=${element.answer == 0 ? "bg-danger" : "bg-success"}>${
          index + 1
        }</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td>${convertDateToShamsi(element.createdAt.slice(0, 10))}</td>
        <td>         
                 <button type="button" class="btn btn-success edit-btn" onclick="viewMessage('${
                   element.body
                 }')">مشاهده</button>
        </td>
        <td>
                  <button type="button" class="btn btn-warning text-white" onclick="answerToMessage('${
                    element.email
                  }')">پاسخ</button>
              </td>
        
              <td>
              <button type="button" class="btn btn-danger delete-btn" onclick="removeAnswer('${
                element._id
              }')">حذف</button>
              </td>
        </tr>
        
        
        
        
        `
      );
    })
  );
};

const viewMessage = async (body) => {
  console.log(body);
  showSwal(body, "", true, "", "", "مشاهده شد", "", "", () => {});
};

const answerToMessage = async (userEmail) => {
  Swal.fire({
    title: "پاسخ به پیام",
    input: "textarea",
    confirmButtonText: "ثبت پاسخ",
  }).then(async (result) => {
    if (result.isConfirmed && result.value.length > 0) {
      await fetch("https://sabz.liara.run/v1/contact/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          email: userEmail,
          answer: result.value,
        }),
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          showSwal(
            "پاسخ شما به ایمیل کاربر ارسال شد.",
            "success",
            false,
            "1800",
            "",
            "",
            "",
            "",
            () => {
              getAllContact();
            }
          );
        }
      });
    }
  });
};

const removeAnswer = async (answerID) => {
  Swal.fire({
    title: "از حذف پیغام مطمئنید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`https://sabz.liara.run/v1/contact/${answerID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }).then((res) => {
        if (res.ok) {
                    showSwal(
                      "پیغام با موفقیت حذف شد",
                      "success",
                      false,
                      1700,
                    "",
                      "",
                      "",
                      "",
                      ()=>{getAllContact()}
                    );
          
          
        }
      });
    }
  });
};

export { getAllContact, viewMessage, answerToMessage, removeAnswer };
