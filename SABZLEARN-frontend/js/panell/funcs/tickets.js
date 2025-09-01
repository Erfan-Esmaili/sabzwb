import { getToken, showSwal, convertDateToShamsi } from "../../funcs/utils.js";

const getAndShowAllTickets = async () => {
  let ticketsWrapper = document.querySelector(".table tbody");

  await fetch("http://localhost:4000/v1/tickets", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((tickets) => {
      console.log(tickets[2]);
      tickets.forEach((ticket, index) => {
        ticketsWrapper.insertAdjacentHTML(
          "beforeend",
          `
            <tr>
                      <td class="no-answer-comment ${ticket.answer==1?'answer-ticket':'no-answer-ticket'}">${index + 1}</td>
                      <td>${ticket.title}</td>
                      <td>${ticket.user}</td>
                      <td>${ticket.course ? ticket.course : "___"}</td>
                      <td>
                      ${
                        ticket.priority == 1
                          ? "زیاد"
                          : ticket.priority == 2
                          ? "متوسط"
                          : ticket.priority == 3
                          ? "کم"
                          : ""
                      }
                      </td>
                      <td>${ticket.departmentID}</td>
                      <td>${ticket.departmentSubID}</td>
                      <td>${convertDateToShamsi(
                        ticket.createdAt.slice(0, 10)
                      )}</td>
                     
                     <td>
                     <button type="button" class="btn btn-warning delete-btn" onclick="seeBodyTicket('${
                       ticket.body
                     }')">مشاهده</button>
                     </td>
                     <td>
                     <button type="button" class="btn btn-success delete-btn" onclick="answerToTicket('${
                       ticket._id
                     }')">پاسخ</button>
                     </td>
                     
                     </tr>
    
  
  
  `
        );
      });
    });
};

const seeBodyTicket = (BodyTicket) => {
  showSwal(BodyTicket, "", true, "", "", "دیدم", "", "", () => {});
};

const answerToTicket =async (ticketID) => {
  Swal.fire({
    title: "پاسخ خود را ثبت کنید",
    input: "textarea",
    confirmButtonText: "ثبت",
  }).then(async (body) => {
    if (body.isConfirmed) {
      await fetch(`http://localhost:4000/v1/tickets/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ticketID:ticketID, body: body.value }),
      }).then((res) => {
        if (res.ok) {
          showSwal(
            "پاسخ شما با موفقیت ارسال شد",
            "success",
            false,
            "1500",
            "",
            "",
            "",
            "",
            () => {
              getAndShowAllTickets();
            }
          );
        }
      });
    }
  });
};
export { getAndShowAllTickets, seeBodyTicket,answerToTicket };
