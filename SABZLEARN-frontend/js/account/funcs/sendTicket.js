import { getToken, showSwal } from "../../funcs/utils.js";

let departmentID = "-1";
let subDepartmentID = "-1";
let ticketPriority = "-1";
let userCourseID = undefined;

const prepareSendTicketForm = async () => {
  const ticketsDepartmentsWrapper = document.querySelector("#departments");
  const ticketsSubDepartmentsWrapper =
    document.querySelector("#sub-department");
  const ticketPriorityWrapper = document.querySelector("#ticket-priority");
  const userCoursesWrapperSelected = document.querySelector(
    "#user-courses-wrapper"
  );

  const res = await fetch(`https://sabz.liara.run/v1/tickets/departments`);
  const departments = await res.json();

  console.log(departments);
  departments.forEach((department) => {
    ticketsDepartmentsWrapper.insertAdjacentHTML(
      "beforeend",
      `
          <option value="${department._id}">${department.title}</option>
          
          `
    );
  });

  ticketsDepartmentsWrapper.addEventListener("change", async (event) => {
    departmentID = event.target.value;
    await fetch(
      `https://sabz.liara.run/v1/tickets/departments-subs/${departmentID}`
    )
      .then((res) => res.json())
      .then((subDepartment) => {
        console.log(subDepartment);
        ticketsSubDepartmentsWrapper.innerHTML = "";
        ticketsSubDepartmentsWrapper.insertAdjacentHTML(
          "beforeend",
          `
       <option class="ticket-form__option" disabled selected>لطفا یک مورد را انتخاب نمایید.</option>
      `
        );
        subDepartment.forEach((subDepartmentElem) => {
          ticketsSubDepartmentsWrapper.insertAdjacentHTML(
            "beforeend",
            `
      <option value="${subDepartmentElem._id}">${subDepartmentElem.title}</option>
      
      `
          );
        });
      });
  });

  ticketsSubDepartmentsWrapper.addEventListener("change", (event) => {
    subDepartmentID = event.target.value;
    if ((event.target.value == "63b688c5516a30a651e98156")) {
      userCoursesWrapperSelected.classList.remove("d-none");
      console.log('asf');
      
    } else {
      userCoursesWrapperSelected.classList.add("d-none");
    }
  });
  ticketPriorityWrapper.addEventListener(
    "change",
    (event) => (ticketPriority = event.target.value)
  );
  userCoursesWrapperSelected.addEventListener(
    "change",
    (event) => (userCourseID = event.target.value)
  );
};

const userCoursesRes = async () => {
  let ticketCoursesWrapper = document.getElementById("ticket-courses");

  await fetch("https://sabz.liara.run/v1/users/courses", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((courses) => {
      courses.forEach((course) => {
        console.log(course);

        ticketCoursesWrapper.insertAdjacentHTML(
          "beforeend",
          `
     <option value="${course._id}">${course.course.name}</option>
    `
        );
      });



    });
};

const sendNewTicket = async () => {
  let ticketSubjectTitleValue = document
    .getElementById("ticketSubjectTitle")
    .value.trim();
  let ticketContentValue = document
    .getElementById("ticketContent")
    .value.trim();

  const newTicketObj = {
    departmentID: departmentID,
    departmentSubID: subDepartmentID,
    title: ticketSubjectTitleValue,
    priority: ticketPriority,
    body: ticketContentValue,
    course: userCourseID
  };

  await fetch("https://sabz.liara.run/v1/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newTicketObj),
  }).then((res) => {res.json();
    if (res.ok) {
      showSwal(
        "تیکت شما با موفقیت ارسال شد",
        "success",
        false,
        "1900",
        "",
        "",
        "به زودی پشتیبانان به شما پاسخ خواهند داد",
        "",
        () => {
          location.href = "../tickets/index.html";
        }
      );
    }
  }).then(data=>console.log(data)
  );
};
export { prepareSendTicketForm, sendNewTicket, userCoursesRes };
