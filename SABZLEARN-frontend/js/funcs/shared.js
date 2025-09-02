import { handleSwiper } from "../swiper.js";
import { getMe } from "./auth.js";
import {
  isLogin,
  getUrlParam,
  getToken,
  courseShortName,
  showSwal,
  convertDateToShamsi,
} from "./utils.js";

const showUserNameInNavbar = () => {
  let isUserLogin = isLogin();
  let userNameBox = document.querySelector(".main-header__profile");

  if (isUserLogin) {
    getMe().then((data) => {
      userNameBox.setAttribute("href", "my-account/Account");
      userNameBox.innerHTML = `
      <span class="main-header__profile-text d-none d-lg-block">${data.name}</span>
        <i class="fas fa-user-alt ms-1"></i>
    `;
    });
  } else {
    userNameBox.innerHTML = `
    <i class="fas fa-user-plus ms-1"></i>
    <span class="main-header__profile-text d-none d-lg-block">ورود/ثبت نام</span>
      `;
    userNameBox.setAttribute("href", "register.html");
  }
};

const renderTopBarMenus = async () => {
  let topBarList = document.querySelector(".top-bar__menu");
  const res = await fetch("http://localhost:4000/v1/menus/topbar");
  const topBarMenus = await res.json();

  topBarList.innerHTML = "";

  const shuffle = [...topBarMenus].sort((a, b) => Math.random() - 0.5);

  shuffle.splice(0, 7).map((menu) => {
    topBarList.innerHTML += `
<li class="top-bar__item">
                <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
              </li>

    `;
  });
};

const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");

  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();

  courses.slice(0, 6).map((course) => {
    console.log(course);

    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
    
    <div class="col-lg-4 col-md-6 col-12">
    <div class="courses__box rounded-4 overflow-hidden">
    <a href="course.html?name=${course.shortName}">
    <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${
      course.cover
    } alt="course">
    </a>
    
    <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
    <div class="course-box__main">
    <a href="course.html?name=${course.shortName}" class="courses-box__title">${
        course.name
      }</a>
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
      course.price == 0
        ? "رایگان"
        : course.price !== 0 &&
          course.discount &&
          `
      <span class="text-success">${(
        course.price -
        (course.price * course.discount) / 100
      ).toLocaleString()}</span>
      <span class="text-decoration-line-through fs-5 text-secondary">${course.price.toLocaleString()}</span>
      <span class="text-bg-success rounded h-25 fs-4 p-1 d-flex justify-content-center align-items-center">50%</span>
     `
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
};

const popularCourses = async () => {
  const popularCorsesContent = document.querySelector("#popularCorsesContent");

  await fetch("http://localhost:4000/v1/courses/popular")
    .then((res) => res.json())
    .then((data) => {
      data.map((popular) => {
        popularCorsesContent.insertAdjacentHTML(
          "beforeend",
          `
  
  <div class="swiper-slide">
  <div class="courses__box rounded-4 overflow-hidden">
  <a href="#">
    <img class="courses-box__img w-100" src="http://localhost:4000/courses/covers/${
      popular.cover
    }" alt="course">
  </a>
  
  <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
  <div class="course-box__main">
  <a href="#" class="courses-box__title">${popular.name}</a>
  </div>
  <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
  <div class="courses-box__teacher">
  <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
  <a class="courses-box__teacher-link" href="#">${popular.creator}</a>
  </div>
  
  <div class="courses-box__rating">

  ${Array(5 - popular.courseAverageScore)
    .fill(
      '<img src="./images/svgs/star.svg" alt="rating" class="search-box__star">'
    )
    .join("")}
${Array(popular.courseAverageScore)
  .fill(
    '<img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">'
  )
  .join("")}

  </div>
  
  </div>
  
  <div class="courses-box__status d-flex justify-content-between align-items-center">
  <div class="courses-box__users">
  <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
  <span class="courses-box__users-text">${popular.registers}</span>
  </div>
  <span class="courses-box__price">${
    popular.price == 0 ? "رایگان" : popular.price.toLocaleString()
  }</span>
  </div>
  <hr class="m-0">
  <div class="courses-box__footer d-flex justify-content-center align-items-center">
  <a href="#" class="courses-box__footer-link">
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
    });

  // !Swiper

  handleSwiper();
};

const presellCourses = async () => {
  const presellCoursesContent = document.querySelector(
    "#presellCoursesContent"
  );
  await fetch("http://localhost:4000/v1/courses/presell")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((presell) => {
        presellCoursesContent.insertAdjacentHTML(
          "beforeend",
          `
        
        <div class="swiper-slide">
        <div class="courses__box rounded-4 overflow-hidden">
        <a href="#">
        <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${
          presell.cover
        } alt="course">
        </a>
        
        <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
        <div class="course-box__main">
        <a href="#" class="courses-box__title">${presell.name}</a>
        </div>
        <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
        <div class="courses-box__teacher">
        <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
        <a class="courses-box__teacher-link" href="#">${presell.creator}</a>
        </div>
        
        <div class="courses-box__rating">
    
        ${Array(5 - presell.courseAverageScore)
          .fill(
            '<img src="./images/svgs/star.svg" alt="rating" class="search-box__star">'
          )
          .join("")}
    ${Array(presell.courseAverageScore)
      .fill(
        '<img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">'
      )
      .join("")}
    
        </div>
        
        </div>
        
        <div class="courses-box__status d-flex justify-content-between align-items-center">
        <div class="courses-box__users">
        <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
        <span class="courses-box__users-text">${presell.registers}</span>
        </div>
        <span class="courses-box__price">${
          presell.price == 0 ? "رایگان" : presell.price.toLocaleString()
        }</span>
        </div>
        <hr class="m-0">
        <div class="courses-box__footer d-flex justify-content-center align-items-center">
        <a href="#" class="courses-box__footer-link">
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
    });

  // !Swiper
  handleSwiper();
};

const article = async () => {
  const articleContent = document.querySelector("#articleContent");

  fetch("http://localhost:4000/v1/articles")
    .then((res) => res.json())
    .then((data) => {
      data.slice(0, 6).forEach((article) => {
        articleContent.insertAdjacentHTML(
          "beforeend",
          `
      <div class="col-lg-4 col-md-6 col-12">
            <div class="card article__card">
              <a href="#" class="article-card__link-img">
               <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${article.cover} alt="course">
              </a>
              <div class="card-body article-card__content">
                <a href="#" class="article-card__link">
                ${article.title}
                </a>
                <p class="article-card__text">
                ${article.description}
                </p>

                <a href="#" class="btn article-card__btn rounded-4">بیشتر بخوانید</a>



              </div>
            </div>
          </div>
    
    `
        );
      });
    });
};

// !get all menus & submenus items &Responsive

const getAndShowNavbarMenus = async () => {
  const menusWrapper = document.querySelector("#menuWrapper");
  const menuWrapperResponsive = document.querySelector(
    "#menuWrapperResponsive"
  );

  const res = await fetch("http://localhost:4000/v1/menus");
  const menus = await res.json();

  menus.forEach((menu) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
        
 <li class="main-header__item">
                <a href=category.html?cat=${
                  menu.href
                }&page=1 class="main-header__link">${menu.title}</a>

                ${
                  menu.submenus && menu.submenus.length > 0
                    ? `
                 <i class="fa fa-angle-down"></i>
                <ul class="main-header__dropdown">

                  ${menu.submenus
                    .map((sub) => {
                      return `  
                    <li class="main-header__dropdown-item">
                    <a href="#" class="main-header__dropdown-link">${sub.title}</a>
                  </li>`;
                    })
                    .join("")}

                </ul>
                `
                    : ""
                }
                </li>

                
                
                
                
                
              `
    );

    // !Responsive

    menuWrapperResponsive.insertAdjacentHTML(
      "beforeend",
      `
      <li class="main-header__item dropdown-item">
      <div class="dropdown-item__header">
      <a href=category.html?cat=${menu.href} class="main-header__link">${
        menu.title
      }</a>
      
      ${
        menu.submenus && menu.submenus.length > 0
          ? `
        <i class="fa fa-angle-down"></i>
        </div>
        <ul class="submenu-dropdown-content">
                 
                 ${menu.submenus
                   .map(
                     (sub) =>
                       `  
                    <li class="submenu-dropdown__item">
                    <a href="#" class="submenu-dropdown__link">${sub.title}</a>
                    </li>`
                   )
                   .join("")}
                    
                    </ul>
                    
                    `
          : ""
      }
                    
                    
                </li>
                
      
      
                
                
      
      
      
      
      
      `
    );
  });

  // !!add height to submenu item when is response

  showSubMenuItemResponse();
};

// ?add height to submenu item when is response
const showSubMenuItemResponse = () => {
  const dropdownItem = document.querySelectorAll(".dropdown-item");

  dropdownItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e);

      const submenuContent = item.querySelector(".submenu-dropdown-content");
      if (submenuContent) {
        submenuContent.classList.toggle("active-dropdown");
      }
    });
  });
};
////get category //

const getAndShowCategoryCourses = async () => {
  const getKeyUrl = getUrlParam("cat").split("/").pop();

  const res = await fetch(
    `http://localhost:4000/v1/courses/category/${getKeyUrl}`
  );
  const data = await res.json();
  return data;
};

// *dynamic
const insetHtmlCoursesBoxTemplate = (data, showType, parentElement) => {
  parentElement.innerHTML = "";

  if (showType == "row") {
    data.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
      
      <div class="col-lg-4 col-md-6 col-12">
      <div class="courses__box rounded-4 overflow-hidden">
      <a href="#">
      <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${
        course.cover
      }
        </a>
        
        <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
        <div class="course-box__main">
        <a href="#" class="courses-box__title">${course.name}</a>
        </div>
        <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
        <div class="courses-box__teacher">
        <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
        <path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z">
        </path>
        </svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
        <a class="courses-box__teacher-link" href="#">${course.creator}</a>
          </div>
          
          <div class="courses-box__rating">
          ${Array(5 - course.courseAverageScore)
            .fill(
              ` <img src="./images/svgs/star.svg" alt="rating" class="search-box__star">
            `
            )
            .join("")}
            ${Array(course.courseAverageScore)
              .fill(
                ` <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">`
              )
              .join("")}
              </div>
                        
              </div>
              
              <div class="courses-box__status d-flex justify-content-between align-items-center">
              <div class="courses-box__users">
              <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
              <path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z">
              </path>
              </svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
              <span class="courses-box__users-text">${course.registers}</span>
                </div>
                <span class="courses-box__price">${
                  course.price == 0 ? "رایگان" : course.price.toLocaleString()
                }</span>
                  </div>
                  <hr class="m-0">
                  <div class="courses-box__footer d-flex justify-content-center align-items-center">
                    <a href="#" class="courses-box__footer-link">
                    مشاهده اطلاعات
                    <svg class="svg-inline--fa fa-arrow-left me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z">
                    </path>
                    </svg><!-- <i class="fa fa-arrow-left me-2"></i> Font Awesome fontawesome.com -->
                    </a>
                    </div>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                    
                    </div>
                    
                    
                    
                    `
      );
    });
  } else {
    data.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
                        
                          <div class="col-12">
                          <div class="courses__box rounded-4 overflow-hidden d-flex gap-3">
                          <a href="#">
                          <img class="courses-box__img w-100 h-100" src=http://localhost:4000/courses/covers/${
                            course.cover
                          }
                            </a>
                            
                            <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3 flex-grow-1">
                            <div class="course-box__main">
                            <a href="#" class="courses-box__title fs-1">${
                              course.name
                            }</a>
                            </div>
                            <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
                            <div class="courses-box__teacher">
                            <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z">
                            </path>
                            </svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                            <a class="courses-box__teacher-link fs-3" href="#">${
                              course.creator
                            }</a>
                                  </div>
                                  
                                  <div class="courses-box__rating">
                                  ${Array(5 - course.courseAverageScore)
                                    .fill(
                                      ` <img src="./images/svgs/star.svg" alt="rating" class="search-box__star">
                                    `
                                    )
                                    .join("")}
                                    ${Array(course.courseAverageScore)
                                      .fill(
                                        ` <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">`
                                      )
                                      .join("")}
                                      </div>
                                      
                                      </div>
                                      
                              <div class="courses-box__status d-flex justify-content-between align-items-center">
                              <div class="courses-box__users">
                              <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                              <path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z">
                              </path>
                              </svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
                              <span class="courses-box__users-text">${
                                course.registers
                              }</span>
                                </div>
                                <span class="courses-box__price fs-3">${
                                  course.price == 0
                                    ? "رایگان"
                                    : course.price.toLocaleString()
                                }</span>
                                  </div>
                                  <hr class="m-0">
                                  <div class="courses-box__footer d-flex justify-content-center align-items-center">
                                  <a href="#" class="courses-box__footer-link fs-3">
                                  مشاهده اطلاعات
                                  <svg class="svg-inline--fa fa-arrow-left me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                  <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z">
                                  </path>
                                  </svg><!-- <i class="fa fa-arrow-left me-2"></i> Font Awesome fontawesome.com -->
                                  </a>
                                  </div>
                                  </div>
                                  
                                  
                                  
                                  
                                  
                                  </div>
                                  
                                  </div>
                                  
                                  
                                  
                                  `
      );
    });
  }
};

// ? sorting courses by price , last , first,...
const coursesSorting = (arrayCourses, filterMethod) => {
  let sortedCoursesArray = [];
  switch (filterMethod) {
    case "free":
      sortedCoursesArray = arrayCourses.filter((course) => course.price == 0);
      break;

    case "money":
      sortedCoursesArray = arrayCourses.filter((course) => course.price !== 0);
      break;

    case "first":
      sortedCoursesArray = [...arrayCourses].reverse();
      break;
    case "last":
      sortedCoursesArray = arrayCourses;
      break;
    case "score":
      sortedCoursesArray = [...arrayCourses].sort(
        (a, b) => b.courseAverageScore - a.courseAverageScore
      );

      break;

    default:
      sortedCoursesArray = arrayCourses;
  }

  return sortedCoursesArray;
};

// ! get data one course
const getOneCourse = () => {
  let $ = document;
  let courseTitleName = $.querySelector(".course-info__title");
  let courseDescription = $.querySelector(".course-info_paragraph");
  let countStudentCourse = $.querySelector(
    ".course-info__total-up__count-students"
  );
  let checkCourseRegister = $.querySelector(".course-info__register");
  let statusCourse = $.querySelector(".status-course");
  let CourseSupport = $.querySelector(".support");
  let dateCourse = $.querySelector(".dateCourse");
  let totalHours = $.querySelector(".total-hours-course");
  let countComment = $.querySelector(".countComment");
  let sessionCourses = $.querySelector(".session-courses");
  let commentsContent = $.querySelector(".comments__content");

  fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
      console.log(course);

      courseTitleName.innerHTML = course.name;
      courseDescription.innerHTML = course.description;
      countStudentCourse.innerHTML = course.courseStudentsCount;

      if (course.isUserRegisteredToThisCourse) {
        checkCourseRegister.insertAdjacentHTML(
          "beforeend",
          `
                              <span>
                    <i class="fa-solid fa-graduation-cap course-info__register-icon"></i>
                    ${"شما دانشجوی دوره هستید"}
                      </span>
                      
                      `
        );
      } else {
        checkCourseRegister.insertAdjacentHTML(
          "beforeend",
          `
                              <span>
                    <i class="fa-solid fa-graduation-cap course-info__register-icon"></i>
                    ${"در دوره ثبت نام کنید"}
                      </span>
                      
                      `
        );
        checkCourseRegister.addEventListener("click", async (event) => {
          event.preventDefault();

          if (course.price == 0) {
            const result = await Swal.fire({
              title: "میخواهید در دوره ثبت نام کنید؟",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "بله",
              cancelButtonText: "خیر",
              width: 500,
            });

            if (result.isConfirmed) {
              const res = await fetch(
                `http://localhost:4000/v1/courses/${course._id}/register`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ price: 0 }),
                }
              );

              if (res.ok) {
                showSwal(
                  "شما ثبت نام شدید",
                  "success",
                  false,
                  1800,
                  "",
                  "",
                  "شما از این پس دانشجوی دوره هستید",
                  "",
                  () => {
                    location.reload(); // ✅ با () صدا بزن
                  }
                );
              }
            }
          } else {
            const result = await Swal.fire({
              title: "میخواهید در دوره ثبت نام کنید؟",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "بله",
              cancelButtonText: "خیر",
              width: 500,
            });

            if (result.isConfirmed) {
              const discountResult = await Swal.fire({
                title: "کد تخفیف دارید؟",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "بله",
                cancelButtonText: "خیر",
                width: 500,
              });

              if (!discountResult.isConfirmed) {
                const res = await fetch(
                  `http://localhost:4000/v1/courses/${course._id}/register`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${getToken()}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ price: 0 }),
                  }
                );

                if (res.ok) {
                  showSwal(
                    "شما ثبت نام شدید",
                    "success",
                    false,
                    1800,
                    "",
                    "",
                    "شما از این پس دانشجوی دوره هستید",
                    "",
                    () => {
                      location.reload(); // ✅
                    }
                  );
                }
              } else {
                await Swal.fire({
                  title: "لطفا کد تخفیف را وارد کنید:",
                  input: "text",
                  showCancelButton: true,
                  confirmButtonText: "تایید",
                  cancelButtonText: "انصراف",
                }).then(async (code) => {
                  console.log(code);

                  if (code.isConfirmed) {
                    await fetch(`http://localhost:4000/v1/offs/${code.value}`, {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ course: course._id }),
                    }).then((res) => {
                      res.json().then((code) => {
                        console.log(code);

                        if (res.status == 404) {
                          showSwal(
                            "کد تخفیف نامعتبر می باشد",
                            "error",
                            false,
                            "1700",
                            "",
                            "",
                            "",
                            "",
                            () => {
                              "";
                            }
                          );
                        } else if (res.status == 409) {
                          showSwal(
                            "مهلت استفاده از کد تخفیف به اتمام رسیده!",
                            "error",
                            false,
                            "1700",
                            "",
                            "",
                            "",
                            "",
                            () => {
                              "";
                            }
                          );
                        } else {
                          fetch(
                            `http://localhost:4000/v1/courses/${course._id}/register`,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                price:
                                  course.price -
                                  (course.price * code.percent) / 100,
                              }),
                            }
                          ).then((res) => {
                            if (res.ok) {
                              showSwal(
                                "کد تخفیف با موفقیت اعمال شد",
                                "success",
                                false,
                                "1700",
                                "",
                                "",
                                "",
                                "",
                                () => {
                                  location.reload();
                                }
                              );
                            }
                          });
                        }
                      });
                    });
                  }
                });
              }
            }
          }
        });
      }
      statusCourse.innerHTML = course.isComplete
        ? "تکمیل شده"
        : "در حال برگزاری";
      CourseSupport.innerHTML = course.support;

      //// !گرفتن و تبدیل تاریخ به شمسی  ////

      dateCourse.innerHTML = convertDateToShamsi(course.updatedAt);

      //////
      // !totalHours

      if (course.sessions) {
        let totalMinutes = 0;
        let totalSecond = 0;

        course.sessions.forEach((session) => {
          const [minutes, second] = session.time.split(":").map(Number);
          totalMinutes += minutes / 60;
          totalSecond += second;
        });

        totalHours.innerHTML = Math.floor(totalMinutes);
      }
      // ?count comment
      countComment.innerHTML = course.comments.length;

      // //session courses //

      if (course.sessions.length) {
        course.sessions.forEach((session, index) => {
          sessionCourses.insertAdjacentHTML(
            "beforeend",
            `
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
             <div class="accordion-body">
               <div class="accordion-body__right">
                 <span class="count-session-course">
                 ${index + 1}
                 </span>
                 <i class="fa-solid fa-circle-play"></i>
                 ${
                   course.isUserRegisteredToThisCourse || session.free
                     ? `<a href="episode.html?name=${course.shortName}&id=${session._id}" class="title-session-course">
                 ${session.title}
                 </a>`
                     : `<span class="title-session-course">
                 ${session.title}
                 </span>`
                 }
                 
               </div>
               <div class="accordion-body__left">
               ${
                 !(course.isUserRegisteredToThisCourse || session.free)
                   ? '<i class="fas fa-lock"></i>'
                   : ""
               }
                 <span>
                 ${session.time}
                 </span>
               </div>
             </div>
           </div>

           `
          );
        });
      } else {
        sessionCourses.insertAdjacentHTML(
          "beforeend",
          `
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
             <div class="accordion-body">
               <div class="accordion-body__right">
                 <span>
                 --
                 
                 </span>
                 <i class="fa-solid fa-circle-play"></i>
                 <a href="#">
                   هیچ جلسه ای برای این دوره وجود ندارد
                 </a>
               </div>
               <div class="accordion-body__left">
                 <span>
                 00:00
                 </span>
               </div>
             </div>
           </div>

           `
        );
      }

      // !comments
      if (course.comments.length) {
        course.comments.forEach((comment) => {
          // console.log(comment.answerContent.createdAt);
          // console.log(comment.answerContent.createdAt);
          let commentDate = comment.creator.createdAt.slice(0, 10);

          commentsContent.insertAdjacentHTML(
            "beforeend",
            `
                         
                  <div class="comments__item">
                             <div class="comments__question">
                                 <div class="comments__question-header">
                                     <div class="comments__question-header-right">
                                         <span class="comments__question-name comment-name">${
                                           comment.creator.name
                                         }</span>
                                         <span class="comments__question-status comment-status">
                                           ${
                                             comment.creator.role == "USER"
                                               ? "دانشجو دوره"
                                               : "کاربر"
                                           }
                                             </span>
                                         <span class="comments__question-date comment-date">
                                         ${convertDateToShamsi(commentDate)}
                                         </span>
                                     </div>
                                     <div class="comments__question-header-left">
                                         <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                                     </div>
                                 </div>
                                 <div class="comments__question-text">
                                    
                                     <p class="comments__question-paragraph comment-paragraph">
                                     ${comment.body}
                                     </p>
                                 </div>
                             </div>
          
                                  ${
                                    comment.answerContent
                                      ? `
                                  
                                   <div class="comments__ansewr">
                                       <div class="comments__ansewr-header">
                                           <div class="comments__ansewr-header-right">
                                               <span class="comments__ansewr-name comment-name">
                                            ${
                                              comment.answerContent.creator.name
                                            }
                                                   </span>
                                               <span class="comments__ansewr-staus comment-status">
                                               ${
                                                 comment.answerContent.creator
                                                   .role == "ADMIN"
                                                   ? "مدرس"
                                                   : ""
                                               }
                                               </span>
                                               <span class="comments__ansewr-date comment-date">
                                               ${convertDateToShamsi(
                                                 comment.answerContent?.createdAt.slice(
                                                   0,
                                                   10
                                                 )
                                               )}
                                               </span>
                                           </div>
                                           <div class="comments__ansewr-header-left">
                                               <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                                           </div>
                                       </div>
                                       <div class="comments__ansewr-text">
                                           <p class="comments__ansewr-paragraph comment-paragraph">
                                           ${comment.answerContent.body}
                                           </p>
                                       </div>
                                   </div>
                                 
                                  `
                                      : ``
                                  }
                                  </div>
                                
                                  
          
                            
          
                  
                  `
          );
        });
      } else {
        commentsContent.insertAdjacentHTML(
          "beforeend",
          `
            <div class="alert alert-warning">هنوز نظری وجود ندارد!</div>
          `
        );
      }
    });
};

////دوره های مرتبط get courses related//

const getRelatedCourses = async () => {
  const courseRelatedContent = document.querySelector(
    ".course-info__courses-list"
  );
  await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((course) => {
        courseRelatedContent.insertAdjacentHTML(
          "beforeend",
          `
            <li class="course-info__courses-list-item">
            <a href="#" class="course-info__courses-list-link">
            <img src=http://localhost:4000/courses/covers/${course.cover} class="courses-list-item__img" alt="Course cover">
            <span>${course.name}</span>
            </a>
            
            </li>
            
            
            `
        );
      });
    });
};

// **get one session & show it**

const getOneSession = async () => {
  let sessionID = getUrlParam("id");
  let sidebarTopicsList = document.querySelector(".sidebar-topics__list");
  let episodeHeaderLeftTitle = document.querySelector(
    ".episode-header__left-text"
  );
  let episodeContentVideo = document.querySelector(".episode-content__video");
  fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`, {
    method: "GET",
    headers: {
      Authorization: ` Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.sessions.forEach((item) => {
        console.log(data);

        sidebarTopicsList.insertAdjacentHTML(
          "beforeend",
          `
      
      
      <li class="sidebar-topics__list-item">
                  <div class="sidebar-topics__list-right">
                    <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"></path></svg><!-- <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i> Font Awesome fontawesome.com -->

                    ${
                      item.free
                        ? `<a class="sidebar-topics__list-item-link" href="episode.html?name=${courseShortName}&id=${item._id}">${item.title}</a>`
                        : `<span class="sidebar-topics__list-item-link">${item.title}</span>`
                    }
                    
                    
                  </div>
                  <div class="sidebar-topics__list-left">
                 ${!item.free ? '<i class="fas fa-lock"></i>' : ""}
                    <span class="sidebar-topics__list-item-time">${
                      item.time
                    }</span>
                  </div>
                </li>
      
  
      `
        );
      });

      episodeHeaderLeftTitle.innerHTML = data.session.title;
      // episodeContentVideo.dataset.src = `http://localhost:4000/courses/covers/${data.session.video}`
      episodeContentVideo.setAttribute(
        "src",
        `http://localhost:4000/courses/covers/${data.session.video}`
      );
    });
};

// !! contact US

const contactUs = async () => {
  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let phoneInput = document.querySelector("#phone");
  let messageBodyInput = document.querySelector("#messagedBody");

  let userInfos = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    body: messageBodyInput.value.trim(),
  };

  fetch("http://localhost:4000/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfos),
  }).then((res) => {
    if (res.status == 201) {
      showSwal(
        "پیغام با موفقیت ارسال شد.",
        "success",
        false,
        1500,
        `<div class="swal-footer-anim">در حال انتقال به صفحه اصلی...</div>`,
        "",
        "",
        "",
        () => {}
      );
      // **Enter to main page
      setTimeout(() => {
        location.href = "SABZLEARN-frontend/index.html";
      }, 2000);

      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      messageBodyInput.value = "";
    } else {
      showSwal(
        "خطا",
        "error",
        false,
        1200,
        "",
        "",
        "لطفا همه فیلدها را پر کنید.",
        "",
        () => {}
      );
    }
  });
};

// ?global Search

const globalSearch = async () => {
  let coursesContainer = document.querySelector("#courses-container");
  let articlesWrapper = document.querySelector("#articles-wrapper");
  let getSearchValue = getUrlParam("value");
  console.log(getSearchValue);
  fetch(`http://localhost:4000/v1/search/${getSearchValue}`)
    .then((res) => res.json())
    .then((data) => {
      // !! allResultCourses from Search
      if (data.allResultCourses.length) {
        data.allResultCourses.forEach((course) => {
          console.log(data);

          coursesContainer.insertAdjacentHTML(
            "beforeend",
            `
          
      <div class="col-lg-4 col-md-6 col-12">
      <div class="courses__box rounded-4 overflow-hidden">
     <a href="course.html?name=${course.shortName}">
      <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${
        course.cover
      }
        </a>
        
        <div class="p-3 course-box__main-content d-flex flex-column justify-content-between gap-3">
        <div class="course-box__main">
        <a href="course.html?name=${
          course.shortName
        }" class="courses-box__title">${course.name}</a>
        </div>
        <div class="courses-box__rating-teacher d-flex justify-content-between align-items-center">
        <div class="courses-box__teacher">
        <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
        <path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z">
        </path>
        </svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
        <a class="courses-box__teacher-link" href="#">عرفان اسماعیلی</a>
          </div>
          
          <div class="courses-box__rating">
          <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">
          <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">
          <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">
          <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">
          <img src="./images/svgs/star_fill.svg" alt="rating" class="search-box__star">

              </div>
                        
              </div>
              
              <div class="courses-box__status d-flex justify-content-between align-items-center">
              <div class="courses-box__users">
              <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
              <path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z">
              </path>
              </svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
              <span class="courses-box__users-text">2</span>
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
                    <svg class="svg-inline--fa fa-arrow-left me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z">
                    </path>
                    </svg><!-- <i class="fa fa-arrow-left me-2"></i> Font Awesome fontawesome.com -->
                    </a>
                    </div>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                    
                    </div>
          
          `
          );
        });
      } else {
        coursesContainer.insertAdjacentHTML(
          "beforeend",
          `
                      <div class="alert alert-danger w-100">دوره ای یافت نشد!</div>

        `
        );
      }

      // !! allResultArticles from Search
      if (data.allResultArticles.length) {
        data.allResultArticles.forEach((article) => {
          articlesWrapper.insertAdjacentHTML(
            "beforeend",
            `
            
                        <div class="col-lg-4 col-md-6 col-12">
                  <div class="card article__card">
                    <a href="#" class="article-card__link-img">
                    <img class="courses-box__img w-100" src=http://localhost:4000/courses/covers/${article.cover} alt="course">
                    </a>
                    <div class="card-body article-card__content">
                      <a href="#" class="article-card__link">
                      ${article.title}
                      </a>
                      <p class="article-card__text">
                      ${article.description}
                      </p>

                      <a href="#" class="btn article-card__btn rounded-4">بیشتر بخوانید</a>



                    </div>
                  </div>
                </div>

            
            `
          );
        });
      } else {
        articlesWrapper.insertAdjacentHTML(
          "beforeend",
          `
        <div class="alert alert-danger w-100">مقاله ای یافت نشد!</div>
        `
        );
      }
    });
};

////send comment  //

const sendComment = async () => {
  let commentTextarea = document.querySelector(
    ".comments__score-input-respond"
  );
  let commentScore = document.querySelector("#commentscore");
  let score = 5;
  commentScore.addEventListener("change", () => (score = commentScore.value));

  let dataCommentObj = {
    body: commentTextarea.value,
    courseShortName: courseShortName,
    score: score,
  };

  await fetch(`http://localhost:4000/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataCommentObj),
  }).then((res) => {
    if (res.ok) {
      showSwal(
        "نظر شما با موفقیت ثبت شد",
        "success",
        "",
        "2100",
        "",
        "",
        "نظر شما پس از تایید منتشر خواهد شد",
        "",
        () => {}
      );
    } else {
      showSwal(
        "خطایی رخ داد",
        "error",
        "",
        "2000",
        "لطفا دوباره تلاش کنید",
        "",
        "",
        "",
        () => {}
      );
    }
  });
};

// ? get All courses and show it in the Courses page
const ShowAllCoursesInCoursesPage = async () => {
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();

  return courses;
};

export {
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowNavbarMenus,
  getAndShowAllCourses,
  popularCourses,
  presellCourses,
  article,
  getAndShowCategoryCourses,
  insetHtmlCoursesBoxTemplate,
  coursesSorting,
  getOneCourse,
  getRelatedCourses,
  getOneSession,
  contactUs,
  globalSearch,
  sendComment,
  ShowAllCoursesInCoursesPage,
};
