import { getToken, showSwal } from "../../funcs/utils.js";

const getAdminInfos = async () => {
  const res = await fetch("http://localhost:4000/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const admin = await res.json();

  return admin;
};


const logout = () => {
  
    showSwal(
      "خروج از حساب کاربری",
      "warning",
      true,
      "",
      "در صورت انصراف دکمه ESC را فشار دهید",
      "بله",
      "مطمئنی؟",
      "",
      (result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user')
          showSwal(
            "با موفقیت از حساب خود خارج شدید",
            "success",
            false,
            1700,
            "درحال انتقال به صفحه اصلی",
            "",
            "",
            "",
            () => {
              location.href = "../../index.html";
            }
          );
        }
      }
    );
  
};

export { getAdminInfos, logout };
