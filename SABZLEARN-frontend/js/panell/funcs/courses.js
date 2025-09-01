import { getToken, showSwal } from "../../funcs/utils.js";

const getAllCourse = async () => {
  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = res.json();
  courses.then((res) => {
    const coursesTableElem = document.querySelector(".table tbody");
    coursesTableElem.innerHTML = "";
    res.forEach((course, index) => {
      coursesTableElem.insertAdjacentHTML(
        "beforeend",
        `
          
             <tr>
          <td>
              ${index + 1}
          </td>
          <td id="id">${course.name}</td>
          <td id="name">
            <a>${
              course.price == 0
                ? "رایگان"
                : course.price.toLocaleString("en-US")
            }</a>
          </td>
          <td>${course.registers}</td>
          <td>${course.support}</td>
          <td>${course.categoryID.title}</td>
          <td>${course.courseAverageScore}</td>
          <td>${course.status == "start" ? "درحال برگزاری" : "پیش فروش"}</td>
          <td>
              <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
          </td>
          <td>
              <button type="button" class="btn btn-danger" id="delete-btn" onclick="courseRemove('${
                course._id
              }')">حذف</button>
          </td>
      </tr>
          
          `
      );
    });
  });
};

let categoryID = -1;
let status = "start";
let courseCover = null;

const prepareCreateCourseForm = async () => {
  let categoryList = document.querySelector(".category-list");
  let courseStatusPresellElem = document.querySelector("#presell");
  let courseStatusStartElem = document.querySelector("#start");
  let courseCoverElem = document.querySelector("#course-cover");

  const res = await fetch(`http://localhost:4000/v1/category`);
  const categories = await res.json();

  categories.forEach((category) => {
    categoryList.insertAdjacentHTML(
      "beforeend",
      `
      <select class="category-list d-block w-100 rounded p-1">
        <option value="${category._id}">${category.title}</option>
      </select>
      `
    );
  });

  categoryList.addEventListener("change", (event) => {
    categoryID = event.target.value;
  });

  courseStatusPresellElem.addEventListener("change", (event) => {
    status = event.target.value;
  });

  courseStatusStartElem.addEventListener("change", (event) => {
    status = event.target.value;
  });

  courseCoverElem.addEventListener("change", (event) => {
    courseCover = event.target.files[0];
  });
};

const createNewCourse = async () => {
  let courseNameElem = document.querySelector("#course-Name");
  let coursePriceElem = document.querySelector("#price");
  let courseDescriptionElem = document.querySelector("#course-description");
  let courseShortnameElem = document.querySelector("#course-shortname");
  let courseSupportElem = document.querySelector("#course-support");

  const formData = new FormData();
  formData.append("name", courseNameElem.value.trim());
  formData.append("description", courseDescriptionElem.value.trim());
  formData.append("shortName", courseShortnameElem.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("price", coursePriceElem.value.trim());
  formData.append("support", courseSupportElem.value.trim());
  formData.append("status", status);
  formData.append("cover", courseCover);

  let res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
};

const courseRemove = async (courseID) => {
  showSwal(
    "از حذف دوره مطمئنید؟",
    "warning",
    true,
    "",
    "",
    "بله",
    "",
    "",
    async (result) => {
      console.log(result);

      if (result.isConfirmed) {
        await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((res) => (res.ok ? getAllCourse() : ""));
        showSwal(
          "دوره با موفقیت حذف شد",
          "success",
          false,
          "1200",
          "",
          "",
          "",
          "",
          () => {
            "";
          }
        );
      } else if (result.isDismissed) {
        console.log("کاربر خیر را زد یا خارج شد");
      }
    }
  );
};
export { getAllCourse, createNewCourse, prepareCreateCourseForm, courseRemove };
