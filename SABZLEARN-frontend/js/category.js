import {
  getAndShowCategoryCourses,
  insetHtmlCoursesBoxTemplate,
  coursesSorting,
  getAndShowNavbarMenus,
  showUserNameInNavbar,
  renderTopBarMenus,
} from "./funcs/shared.js";

import { searchInArray, paginationItems, getUrlParam,addParamToUrl } from "./funcs/utils.js";

// **pagination
window.addParamToUrl= addParamToUrl

window.addEventListener("load", () => {
  const categoryCoursesContent = document.querySelector(
    "#categoryCoursesContent"
  );
  const pageLayout = document.querySelectorAll(".Page-layout");
  const coursesFilteringSelection = document.querySelectorAll(
    ".courses-top-bar-selection-item"
  );
  const coursesFilteringTitle = document.querySelector(
    ".courses-top-bar__selection-title"
  );
  const loading = document.querySelector("#Loading");
  const coursesSearchBoxInput = document.querySelector(
    ".courses-top-bar__input"
  );

  // !show user name in navbar
  showUserNameInNavbar();

  // ! !get all menus & submenus items &Responsive
  getAndShowNavbarMenus();

// ! renderTopBarMenus
renderTopBarMenus()


  // !getAndShowCategoryCourses
  getAndShowCategoryCourses().then((responseCourses) => {
    let data = [...responseCourses];
    let coursesShowType = "row";

    // **گرفتن دیتا برای نمایش در صفحه لیست دوره ها
    if (data.length) {
      insetHtmlCoursesBoxTemplate(
        data,
        coursesShowType,
        categoryCoursesContent
      );
    } else {
      categoryCoursesContent.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger d-flex align-items-center" role="alert">
    <div>
  دوره ای وجود ندارد!  </div>
  </div>`
      );
    }

    // *گرفتن دیتا برای نشان دادن ستونی یا ردیفی دوره ها
    pageLayout.forEach((layout) => {
      layout.addEventListener("click", (event) => {
        pageLayout.forEach((item) =>
          item.classList.remove("courses-top-bar__icon--active")
        );

        layout.classList.add("courses-top-bar__icon--active");
        if (layout.className.includes("row")) {
          coursesShowType = "row";
          insetHtmlCoursesBoxTemplate(
            data,
            coursesShowType,
            categoryCoursesContent
          );
        } else {
          coursesShowType = "column";

          insetHtmlCoursesBoxTemplate(
            data,
            coursesShowType,
            categoryCoursesContent
          );
        }
      });
    });

    // *نمایش دوره ها بر اساس ایتم های گرانترین ارزانترین و ...
    coursesFilteringSelection.forEach((filter) => {
      filter.addEventListener("click", (event) => {
        coursesFilteringSelection.forEach((item) =>
          item.classList.remove("courses-top-bar-selection-item--active")
        );
        event.target.classList.add("courses-top-bar-selection-item--active");

        coursesFilteringTitle.innerHTML = "";
        coursesFilteringTitle.insertAdjacentHTML(
          "beforeend",
          `
          ${event.target.innerHTML}
           <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
          `
        );

        let userSelectedFilter = event.target.dataset.key;
        let showFilterCourses = coursesSorting([...data], userSelectedFilter);

        loading.classList.remove("d-none");
        categoryCoursesContent.classList.add("d-none");
        setTimeout(() => {
          loading.classList.add("d-none");
          categoryCoursesContent.classList.remove("d-none");
        }, 1000);
        insetHtmlCoursesBoxTemplate(
          showFilterCourses,
          coursesShowType,
          categoryCoursesContent
        );

        //  })
      });
    });

    // !Handel courses search box

    coursesSearchBoxInput.addEventListener("input", (event) => {
      let searchValue = event.target.value;

      let showCourses = searchInArray([...data], "name", searchValue);
      // console.log(showCourses.length);
      if (showCourses.length) {
        insetHtmlCoursesBoxTemplate(
          showCourses,
          coursesShowType,
          categoryCoursesContent
        );
      } else {
        categoryCoursesContent.innerHTML = "";
        categoryCoursesContent.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
      دوره ای یافت نشد!  </div>
      </div>`
        );
      }
    });

    // ? Handel pagination
    let paginationContent = document.querySelector("#previousarrow");
    let currentPage = getUrlParam("page");
    
    let showItemsInPage = paginationItems(
      [...data],
      3,
      paginationContent,
      currentPage
    );

    insetHtmlCoursesBoxTemplate(
      showItemsInPage,
      coursesShowType,
      categoryCoursesContent
    );
    
  });
});

