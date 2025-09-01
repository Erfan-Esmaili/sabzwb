import { getToken, showSwal } from "../../funcs/utils.js";

let categoryMenusID = null;

const getAndShowMenus = async () => {
  let menusWrapperElem = document.querySelector(".item-menus");
  menusWrapperElem.innerHTML=''
  await fetch("http://localhost:4000/v1/menus/all")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((menu, index) => {
        menusWrapperElem.insertAdjacentHTML(
          "beforeend",
          `
          
          <tr>

                                        <td>${index + 1}</td>
                                        <td>${menu.title}</td>
                                        <td><a href="#">${menu.href}</a></td>
                                        <td>${
                                          menu.parent
                                            ? menu.parent.title
                                            : "___"
                                        }</td>
                                        <td>
                                            <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger delete-btn" onclick="removeMenu('${
                                              menu._id
                                            }')">حذف</button>
                                        </td>
                                    </tr>
          
          `
        );
      });
    });
};

const getCategoryMenus = async () => {
  let parentMenusElem = document.querySelector("#parentMenus");

  await fetch("http://localhost:4000/v1/menus")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((menu) => {
        parentMenusElem.insertAdjacentHTML(
          "beforeend",
          `
          <option value="${menu._id}">${menu.title}</option>
          `
        );
      });
    });

  parentMenusElem.addEventListener("change", (event) => {
    categoryMenusID = event.target.value;
  });
};

const createNewMenu = async () => {
  let titleInputElem = document.querySelector("#title");
  let hrefInputElem = document.querySelector("#href");

  const newMenuInfos = {
    title: titleInputElem.value.trim(),
    href: hrefInputElem.value.trim(),
    parent: categoryMenusID,
  };

  await fetch("http://localhost:4000/v1/menus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newMenuInfos),
  }).then((res) => {
    if (res.ok) {
      showSwal(
        " با موفقیت اضافه شد",
        "success",
        false,
        "1300",
        "",
        "",
        "",
        "",
        () => {
          getAndShowMenus();
          titleInputElem.value = "";
          hrefInputElem.value = "";
        }
      );
    }
  });
};

const removeMenu = async (menuID) => {
  showSwal(
    "از حذف دوره مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید.",
    "",
    async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((res) => {
          if (res.ok) {
            showSwal(
              "دوره با موفقیت بن شد",
              "success",
              false,
              "1200",
              "",
              "",
              "",
              "",
              () => {
                getAndShowMenus();
              }
            );
          }
        });
      }
    }
  );
};

export { getAndShowMenus, createNewMenu, getCategoryMenus, removeMenu };
