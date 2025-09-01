import {
  getToken,
  convertDateToShamsi,
  getUrlParam,
} from "../../funcs/utils.js";

const showAnswerAndQuestions = async () => {
  const ticketID = getUrlParam("id");
  const ticketQuestionBox = document.querySelector(
    ".ticket-send__answer-user-text"
  );
  const ticketAnswerBox = document.querySelector(".ticket-send__answer-text");
  await fetch(`http://localhost:4000/v1/tickets/answer/${ticketID}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((ticket) => {
      console.log(ticket);
      ticketAnswerBox.innerHTML = `${ticket.ticket}`;
      ticketQuestionBox.innerHTML = `${ticket.answer}`;
    });
};

export { showAnswerAndQuestions };
