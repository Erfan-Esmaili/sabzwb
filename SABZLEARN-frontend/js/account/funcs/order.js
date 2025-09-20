import { getToken ,convertDateToShamsi} from "../../funcs/utils.js";
const getAndShowUserOrders = async () => {
  let orderTableBody = document.querySelector(".order__table-body");

  await fetch("https://sabz.liara.run/v1/orders", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((orders) =>
      orders.forEach((order,index) => {
        console.log(order);
        
        orderTableBody.insertAdjacentHTML(
          "beforeend",
          `
      
      <tr class="order__table-body-list">
             <td class="order__table-body-item">
                 ${index+1}
             </td>
             <td class="order__table-body-item">${convertDateToShamsi(order.createdAt.slice(0,10))}</td>
             <td class="order__table-body-item">${order.course.name}</td>
             <td class="order__table-body-item">${order.course.price.toLocaleString()}</td>
             <td class="order__table-body-item">
                 <a class="order__table-body-btn" href="#">نمایش</a>
             </td>
       </tr>
      
      
      
      `
        );
      })
    );
};
export { getAndShowUserOrders };
