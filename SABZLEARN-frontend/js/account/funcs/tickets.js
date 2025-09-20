import { getToken, convertDateToShamsi } from "../../funcs/utils.js";
const getAndShowAllTickets = async () => {
  let ticketContentWrapper = document.querySelector(".ticket-content");
  let ticketCountTitle = document.querySelector(".ticket-content__title");

  await fetch("https://sabz.liara.run/v1/tickets/user", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((tickets) => {
      console.log(tickets);

      ticketCountTitle.innerHTML = `نمایش ${tickets.length} تیکت`;

      if (tickets.length) {
        tickets.forEach((ticket) => {
          ticketContentWrapper.insertAdjacentHTML(
            "beforeend",
            `
          
              <div class="ticket-content__box">
                                    <div class="ticket-content__right">
                                        <div class="ticket-content__right-right">
                                            <a class="ticket-content__link" href="../Ansewr-Ticket/index.html?id=${ticket._id}">${
                                              ticket.title
                                            }</a>
                                            <span class="ticket-content__category">
                                                <svg class="svg-inline--fa fa-ellipsis-v fa-w-6 ticket-content__icon" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="ellipsis-v" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" data-fa-i2svg=""><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg><!-- <i class="fa fa-ellipsis-v ticket-content__icon"></i> Font Awesome fontawesome.com -->
                                                ${ticket.departmentID}</span>
                                        </div>
                                        <div class="ticket-content__right-left">
                                            <span class="ticket-content__name">${
                                              ticket.user
                                            }</span>
                                        </div>
                                    </div>
                                    <div class="ticket-content__left">
                                        <div class="ticket-content__left-right">
                                            <div class="ticket-content__condition ${
                                              ticket.answer == 0
                                                ? "unanswered"
                                                : "answered"
                                            }">
                                                <span class="ticket-content__condition-text ">${
                                                  ticket.answer == 0
                                                    ? "پاسخ داده نشده"
                                                    : "پاسخ داده شده"
                                                }</span>
                                            </div>
                                        </div>
                                        <div class="ticket-content__left-left">
                                            <span class="ticket-content__time">${convertDateToShamsi(
                                              ticket.createdAt.slice(0, 10)
                                            )}</span>
                                           
                                        </div>
                                    </div>
                                </div>
          
          
          `
          );
        });
      } else {
        ticketContentWrapper.innerHTML = "";
        ticketContentWrapper.insertAdjacentHTML(
          "beforeend",
          `
      <div class="bg-danger text-white p-5">هیچ تیکتی وجود ندارد :(</div>
      `
        );
      }
    });
};

export { getAndShowAllTickets };
