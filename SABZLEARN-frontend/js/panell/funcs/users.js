import { getToken, showSwal } from "../../funcs/utils.js";

const getAndShowUsers = async () => {
  let usersWrapper = document.querySelector("table tbody");
  usersWrapper.innerHTML = "";
  await fetch("https://sabz.liara.run/v1/users", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      data.forEach((user, index) => {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `
          
      <tr>
              <td>${index + 1}</td>
              <td>${user.name}</td>
              <td>${user.username}</td>
              <td>${user.phone}</td>
              <td>${user.email}</td>
              <td>${user.role === "ADMIN" ? "مدیریت" : "کاربر"}</td>
              <td>
                  <button type="button" class="btn btn-primary edit-btn" onclick="changeRole('${
                    user._id
                  }')">تغییر نقش</button>
              </td>
              <td>
              <button type="button" class="btn btn-danger delete-btn" onclick="deleteUser('${
                user._id
              }')">حذف</button>
              </td>
              <td>
              <button type="button" class="btn btn-warning text-white delete-btn" onclick="banUser('${
                user._id
              }')">بن</button>
              </td>
         </tr>
              
              
                                        
                                        `
        );
      });
    });
};

const deleteUser = async (userID) => {
  showSwal(
    "از حذف کاربر مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید.",
    "",
    async (result) => {
      if (result.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/users/${userID}`, {
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
                getAndShowUsers();
              }
            );
          }
        });
      }
    }
  );
};

const banUser = async (userID) => {
  showSwal(
    "از بن کاربر مطمئنید؟",
    "question",
    true,
    "",
    "",
    "بله",
    "در صورت انصراف دکمه ESC را فشار دهید.",
    "",
    async (result) => {
      if (result.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((res) => {
          if (res.ok) {
            showSwal(
              "کاربر با موفقیت بن شد",
              "success",
              false,
              "1200",
              "",
              "",
              "",
              "",
              () => {
                getAndShowUsers();
              }
            );
          }
        });
      }
    }
  );
};

// ?register
const register = async () => {
  let $ = document;
  let nameInput = $.querySelector("#name");
  let usernameInput = $.querySelector("#username");
  let emailInput = $.querySelector("#email");
  let phoneInput = $.querySelector("#phone");
  let passwordInput = $.querySelector("#password");
  let confirmPasswordInput = $.querySelector("#confirmpassword");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: confirmPasswordInput.value.trim(),
  };

  if (passwordInput.value.trim() === confirmPasswordInput.value.trim()) {
    await fetch(`https://sabz.liara.run/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    }).then((Response) => {
      if (Response.status == 201) {
        showSwal(
          "ثبت نام با موفقیت انجام شد",
          "success",
          false,
          1700,
          "",
          "",
          () => {
            getAndShowUsers();
          }
        );

        nameInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
      } else if (Response.status == 409) {
        showSwal(
          "خطا",
          "error",
          true,
          "",
          "",
          "باشه",
          "نام کاربری یا ایمیل قبلا ثبت شده!",
          "50rem",
          () => {
            "";
          }
        );
      } else if (Response.status == 403) {
        showSwal(
          "خطا",
          "error",
          true,
          "",
          "",
          "باشه",
          "شماره تماس منع شده است. با این شماره نمی توانید ثبت نام کنید",
          "50rem",
          () => {
            "";
          }
        );
      }

      return Response.json();
    });
  } else {
    showSwal(
      "خطا",
      "error",
      true,
      "",
      "",
      "تایید",
      "رمز عبور و تکرار رمز عبور باید یکسان باشد",
      "",
      () => {
        "";
      }
    );
  }
};

const changeRole = (userID) => {
  swal
    .fire({
      title: "از بین ADMIN یا USER یک نقش را بنویسید",
      input: "textarea",
      confirmButtonText: "ثبت",
    })
    .then(async (res) => {
      if (res.isConfirmed) {
        await fetch(`https://sabz.liara.run/v1/users/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            role: res.value.toUpperCase(),
            id: userID,
          }),
        }).then((Response) => {
          if (Response.ok) {
            showSwal(
              "تغییر نقش با موفقیت انجام شد",
              "success",
              false,
              1700,
              "",
              "",
              "",
              "",
              () => {
                getAndShowUsers();
              }
            );
          }
        });
      }
    });
};


// !!update infos admin
const editAdminInfo = async () => {
  let nameInputElem = document.querySelector("#name");
  let usernameInputElem = document.querySelector("#username");
  let emailInputElem = document.querySelector("#email");
  let phoneInputElem = document.querySelector("#phone");
  let passwordInputElem = document.querySelector("#password");

  const newAdminInfosObject = {
    name: nameInputElem.value.trim(),
    username: usernameInputElem.value.trim(),
    email: emailInputElem.value.trim(),
    password: passwordInputElem.value.trim(),
    phone: phoneInputElem.value.trim(),
  };

  await fetch("https://sabz.liara.run/v1/users", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAdminInfosObject),
  })
    .then((res) =>{
      if(res.ok){
            showSwal(
              "اطلاعات با موفقیت تغییر کرد",
              "success",
              false,
              "1800",
              "",
              "",
              "",
              "",
              () => {
                location.href = '../main/index.html'
              })

        
        
      }
    })
};
export { getAndShowUsers, deleteUser, banUser, register, changeRole,editAdminInfo };
