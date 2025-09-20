import { convertDateToShamsi, showSwal, getToken } from "../../funcs/utils.js";

let courseID = null;

const getAllDiscountCode = async () => {
  const discountCodeTableElem = document.querySelector(".table tbody");
  discountCodeTableElem.innerHTML = "";

  await fetch("https://sabz.liara.run/v1/offs", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((code, index) => {
        discountCodeTableElem.insertAdjacentHTML(
          "beforeend",
          `
       <tr>
                      <td>${index + 1}</td>
                      <td>${code.code}</td>
                      <td>${code.creator}</td>
                      <td>${code.percent}</td>
                      <td>${code.max}</td>
                      <td>${code.uses}</td>
                      <td>${convertDateToShamsi(
                        code.createdAt.slice(0, 10)
                      )}</td>
                  
                     
                    <td>
                     <button type="button" class="btn btn-primary delete-btn">پاسخ</button>
                     </td>
                    <td>
                     <button type="button" class="btn btn-danger delete-btn"onclick="deleteDiscountCode('${
                       code._id
                     }')">حذف</button>
                     </td>
                     </tr>
      
      
      
      
      `
        );
      });
    });
};

const selectedCourse = async () => {
  let coursesContent = document.querySelector("#courses-select");
  await fetch("https://sabz.liara.run/v1/courses")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      data
        .filter((courses) => courses.price !== 0)
        .forEach((course) => {
          coursesContent.insertAdjacentHTML(
            "beforeend",
            `
        <option value="${course._id}">${course.name}</option>
      
      `
          );
        });
    });

  coursesContent.addEventListener("change", (event) => {
    courseID = event.target.value;
  });
};
const createNewDiscount = async () => {
  let discountCodeInputElem = document.querySelector("#title");
  let discountPresentInputElem = document.querySelector("#discountpresent");
  let maxUsesInputElem = document.querySelector("#maxuses");

  const newDiscountCodeObject = {
    code: discountCodeInputElem.value.trim(),
    percent: discountPresentInputElem.value.trim(),
    course: courseID,
    max: maxUsesInputElem.value.trim(),
  };

  await fetch("https://sabz.liara.run/v1/offs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDiscountCodeObject),
  }).then((response) => {
    if (response.ok) {
      showSwal(
        "کد تخفیف با موفقیت اضافه شد",
        "success",
        false,
        "1800",
        "",
        "",
        "",
        "",
        () => {
          getAllDiscountCode();
        }
      );
    }
  });
};

const deleteDiscountCode = async (codeID) => {
  Swal.fire({
    title: "از حذف پیغام مطمئنید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`https://sabz.liara.run/v1/offs/${codeID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }).then((res) => {
        if (res.ok) {
          showSwal(
            "کد تخفیف با موفقیت حذف شد",
            "success",
            false,
            1500,
            "",
            "",
            "",
            "",
            () => {
              getAllDiscountCode();
            }
          );
        }
      });
    }
  });
};
export {
  getAllDiscountCode,
  selectedCourse,
  createNewDiscount,
  deleteDiscountCode,
};
