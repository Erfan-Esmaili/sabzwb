import {
  getAllCourse,
  createNewCourse,
  prepareCreateCourseForm,
  courseRemove
} from "./funcs/courses.js";
window.courseRemove =courseRemove


window.addEventListener("load", () => {
  const createNewCourseBtn = document.querySelector("#create-course-btn");

  //!/
  getAllCourse()

  //!/
  prepareCreateCourseForm();
  //

  createNewCourseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewCourse();
  });
});
