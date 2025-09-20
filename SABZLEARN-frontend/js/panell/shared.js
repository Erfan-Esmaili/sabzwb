import { getAdminInfos, logout } from "./funcs/utils.js";
import {
  insertNotificationHtmlTemplate,
  seenNotification,
} from "./funcs/notification.js";

window.seenNotification = seenNotification;


window.addEventListener("load", () => {
  let $ = document;
  let adminName = $.querySelector("#admin-name");
  let adminNameWelcome = $.querySelector("#admin-welcome-name");
  let notificationIconElem = $.querySelector("#notificationIcon");
  let homeNotificationModal = $.querySelector(".home-notification-modal");
let logoutElem = document.querySelector("#logoutElem");
  
  // *get name admin & replace

  getAdminInfos().then((admin) => {
    console.log(admin);

    // !protect cms routes
    if (admin.role === "ADMIN") {
      adminName.innerHTML = admin.name;
      // adminNameWelcome.innerHTML = admin.name;
      //   profileAdminElem.setAttribute('src' ,`https://sabz.liara.run/courses/covers/${
      //   admin.profile
      // }`);
    } else {
      location.replace("../../login.html");
      // location.href='../../login.html'
    }

    ////Notifications ///
    notificationIconElem.addEventListener("mousemove", () => {
      homeNotificationModal.classList.add("active-modal-notification");
    });

    homeNotificationModal.addEventListener("mouseleave", () => {
      homeNotificationModal.classList.remove("active-modal-notification");
    });

    insertNotificationHtmlTemplate(admin.notifications);
  });

  logoutElem.addEventListener('click',()=>{
    logout()
  })
  
  
});
