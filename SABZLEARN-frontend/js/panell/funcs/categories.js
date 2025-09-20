import { getToken, showSwal } from "../../funcs/utils.js";

const getCategories = async () => {
  let categoryWrapper = document.querySelector(".table tbody");
  categoryWrapper.innerHTML = "";

  await fetch("https://sabz.liara.run/v1/category")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((category, index) => {
        categoryWrapper.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
          <td>${index + 1}</td>
          <td>${category.title}</td>
          <td>${category.name}</td>
         <td>
                  <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
              </td>
              <td>
              <button type="button" class="btn btn-danger delete-btn" onclick="deleteCategory('${
                category._id
              }')">حذف</button>
              </td>
          </tr>
          
          
          
          `
        );
      });
    });
};

const deleteCategory = (categoryID) => {
  showSwal(
    "از حذف دسته بندی مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید.",
    "",
    async (result) => {
      if (result.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((res) => {
          if (res.ok) {
            showSwal(
              "کاربر با موفقیت حذف شد",
              "success",
              false,
              "1200",
              "",
              "",
              "",
              "",
              () => {
                getCategories();
              }
            );
          }
        });
      }
    }
  );
};

const addNewCategory = async () => {
  let titleInputElem = document.querySelector("#title");
  let hrefInputElem = document.querySelector("#href");

  let newCategory = {
    title: titleInputElem.value.trim(),
    name: hrefInputElem.value.trim(),
  };

  await fetch("https://sabz.liara.run/v1/category", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  }).then((res) => {
    if (res.ok) {
      showSwal(
        "دسته بندی با موفقیت اضافه شد",
        "success",
        false,
        "1200",
        "",
        "",
        "",
        "",
        () => {
          getCategories();
          titleInputElem.value = "";
          hrefInputElem.value = "";
        }
      );
    }
  });
};

export { getCategories, deleteCategory, addNewCategory };
