import { showSwal, setToLocalStorage, getToken } from "./utils.js";

let $ = document;

// ?register
const register = async () => {
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
    await fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((Response) => {
        if (Response.status == 201) {
          // !showSwal
          showSwal(
            "ثبت نام با موفقیت انجام شد",
            "success",
            false,
            1700,
            `<div class="swal-footer-anim">در حال انتقال به صفحه اصلی...</div>`,
            ""
          );

          setTimeout(() => {
            location.href = "SABZLEARN-frontend/index.html";
          }, 2000);

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
      })
      .then((data) => {
        // console.log(data.accessToken),
        setToLocalStorage("user", { token: data.accessToken });
      })
      .catch((err) => console.log("خطا", err));
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

// *Login

const login = () => {
  const usernameInput = $.getElementById("usernameInput");
  const passwordInput = $.getElementById("passwordInput");

  let userInfosForLogin = {
    identifier: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`http://localhost:4000/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfosForLogin),
  })
    .then((Response) => {
      if (Response.status == 200) {
        // !showSwal
        showSwal(
          "ورود با موفقیت انجام شد",
          "success",
          false,
          1700,
          `<div class="swal-footer-anim">در حال انتقال به صفحه اصلی...</div>`
        );

        // **Enter to main page
        setTimeout(() => {
          location.href = "SABZLEARN-frontend/index.html";
        }, 2000);
      } else {
        // !showSwal

        showSwal(
          "خطا",
          "error",
          true,
          "",
          "",
          "ثبت نام ",
          "نام کاربری وجود ندارد. ابتدا ثبت نام کنید",
          "50rem",
          (result) => {
            location.href = "register.html";
          }
        );
      }
      return Response.json();
    })

    .then((data) => setToLocalStorage("user", { token: data.accessToken }))
    .catch((err) => console.log("خطا", err));
};

const getMe = async () => {
  getToken();

  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  return data;
};

// !!EXPORT
export { register, login, getMe, getToken };
