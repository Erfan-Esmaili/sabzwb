import {
  ShowAllCoursesInCoursesPage,
  insetHtmlCoursesBoxTemplate,
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,
} from "./funcs/shared.js";
import { paginationItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener("load", () => {
  // !show user name in navbar
  showUserNameInNavbar();

  // ! !get all menus & submenus items &Responsive
  getAndShowNavbarMenus();

  // ! renderTopBarMenus
  renderTopBarMenus();

  ShowAllCoursesInCoursesPage().then((courses) => {
    const coursesContainer = document.querySelector("#courses-container");

    courses.map((course) => {
      coursesContainer.insertAdjacentHTML(
        "beforeend",
        `
      
      <div class="col-lg-4 col-md-6 col-12">
      <div class="courses__box rounded-4 overflow-hidden">
      <a href="course.html?name=${course.shortName}">
      <img class="courses-box__img w-100" src=https://sabz.liara.run/courses/covers/${
        course.cover
      } alt="course">
      </a>
      
      <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
      <div class="course-box__main">
      <a href="course.html?name=${
        course.shortName
      }" class="courses-box__title">${course.name}</a>
      </div>
      <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
      <div class="courses-box__teacher">
      <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
      <a class="courses-box__teacher-link" href="#">${course.creator}</a>
      </div>
      
      <div class="courses-box__rating">
  
      ${Array(5 - course.courseAverageScore)
        .fill(
          '<img src="./images/svgs/star.svg" alt="rating" class="search-box__star">'
        )
        .join("")}
  ${Array(course.courseAverageScore)
    .fill(
      '<img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">'
    )
    .join("")}
  
      </div>
      
      </div>
      
      <div class="courses-box__status d-flex justify-content-between align-items-center">
      <div class="courses-box__users">
      <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
      <span class="courses-box__users-text">${course.registers}</span>
      </div>
      <span class="courses-box__price">${
        course.price == 0 ? "رایگان" : course.price.toLocaleString()
      }</span>
      </div>
      <hr class="m-0">
      <div class="courses-box__footer d-flex justify-content-center align-items-center">
      <a href="course.html?name=${
        course.shortName
      }" class="courses-box__footer-link">
      مشاهده اطلاعات
      <svg class="svg-inline--fa fa-arrow-left me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg><!-- <i class="fa fa-arrow-left me-2"></i> Font Awesome fontawesome.com -->
      </a>
      </div>
      </div>
      
      
      
      
      
      </div>
      
      </div>
      
      
      
      `
      );
    });

    let paginationWrapper = document.querySelector("#previousarrow");
    let currentPage = +getUrlParam("page");
    let showItemsInPage = paginationItems(
      [...courses],
      3,
      paginationWrapper,
      currentPage
    );

    insetHtmlCoursesBoxTemplate([...showItemsInPage], "row", coursesContainer);
  });
});
