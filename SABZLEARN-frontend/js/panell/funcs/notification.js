import { getToken } from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
  let homeNotificationModalList = document.querySelector(
    ".home-notification-modal-list"
  );

    homeNotificationModalList.innerHTML=''
  if (notifications.length) {
    notifications.forEach((notification) => {
      homeNotificationModalList.insertAdjacentHTML(
        "beforeend",
        `
      
        <li class="home-notification-modal-item">
          <span class="home-notification-modal-text">${notification.msg}</span>
          <a style="cursor: pointer;" onclick='seenNotification(${JSON.stringify(notifications)},${JSON.stringify(notification._id)})'>دیدم</a>  
          </li>
      
      `
      );
    });
  } else {
    homeNotificationModalList.insertAdjacentHTML(
      "beforeend",
      `
      
    <li class="home-notification-modal-item justify-content-center text-white bg-success rounded">
    پیغامی وجود ندارد
                                </li>
  
  `
    );
  }
};

const seenNotification = async (notifications,notificationID) => {
  console.log(notifications,notificationID);
  
  const res = await fetch(
    `https://sabz.liara.run/v1/notifications/see/${notificationID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    }
  );
  removeNotification(notifications,notificationID)
  const result = await res.json();
  console.log(result);
  
};


const removeNotification =(notifications , notificationID)=>{
  let filterNotifications = notifications.filter(notification=>notification._id!==notificationID)
  insertNotificationHtmlTemplate(filterNotifications)
}
export { insertNotificationHtmlTemplate, seenNotification };
