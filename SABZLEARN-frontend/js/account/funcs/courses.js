import { getToken, showSwal } from "../../funcs/utils.js";

const getAllUserCourses = async () => {
  let coursesWrapperElem = document.querySelector("#courses-wrapper");
  let courseFilterLinkHeader = document.querySelectorAll(
    ".course-filter__link"
  );
  await fetch("http://localhost:4000/v1/users/courses/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((courses) => {
      console.log(courses);
      if (courses.length) {
        courses.forEach((course) => {
          coursesWrapperElem.insertAdjacentHTML(
            "beforeend",
            `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price.toLocaleString()
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
          );
        });
      } else {
        coursesWrapperElem.insertAdjacentHTML(
          "beforeend",
          `
            
            <div class="alert alert-danger text-bg-danger">هنوز در دوره ای ثبت شرکت نکرده اید</div>
            `
        );
      }

      courseFilterLinkHeader.forEach((filterLink) => {
        filterLink.addEventListener("click", (event) => {
          event.preventDefault();
          let filterMethod = event.target.getAttribute("filter");

          courseFilterLinkHeader.forEach((link)=>link.classList.remove('courses-header__link-active')
          )
          event.target.classList.add('courses-header__link-active')
          switch (filterMethod) {
            case "free":
              {
                  if(courses.length){

                let freeCourses = [...courses].filter(
                  (course) => course.course.price == 0
                );
                coursesWrapperElem.innerHTML = "";
                freeCourses.forEach((course) => {
                  coursesWrapperElem.insertAdjacentHTML(
                    "beforeend",
                    `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
                  );
                });
              }else{
                coursesWrapperElem.innerHTML = "";
                       coursesWrapperElem.insertAdjacentHTML('beforeend',`
                          <div class="bg-danger text-white">دوره ای وجود ندارد</div>
                        `)       
              }
              }

              break;
            case "money":
              {
                if(courses.length){
                let moneyCourses = [...courses].filter(
                  (course) => course.course.price !== 0
                );
                coursesWrapperElem.innerHTML = "";

                moneyCourses.forEach((course) => {
                  coursesWrapperElem.insertAdjacentHTML(
                    "beforeend",
                    `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price.toLocaleString()
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
                  );
                });
              }else{
                 coursesWrapperElem.innerHTML = "";
                       coursesWrapperElem.insertAdjacentHTML('beforeend',`
                          <div class="bg-danger text-white">دوره ای وجود ندارد</div>
                        `) 
              }
              }
              break;
            case "complete":
              {
                 if(courses.length){
                let completeCourses = [...courses].filter(
                  (course) => course.course.isComplete ==1
                );
                coursesWrapperElem.innerHTML = "";

                completeCourses.forEach((course) => {
                  coursesWrapperElem.insertAdjacentHTML(
                    "beforeend",
                    `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price.toLocaleString()
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
                  );
                });
              }else{
                  coursesWrapperElem.innerHTML = "";
                       coursesWrapperElem.insertAdjacentHTML('beforeend',`
                          <div class="bg-danger text-white">دوره ای وجود ندارد</div>
                        `)
              }
              }
              break;
            case "active":
              {
                 if(courses.length){
                let activeCourses = [...courses].filter(
                  (course) => course.course.isComplete ==0
                );
                coursesWrapperElem.innerHTML = "";

                activeCourses.forEach((course) => {
                  coursesWrapperElem.insertAdjacentHTML(
                    "beforeend",
                    `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price.toLocaleString()
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
                  );
                });
              }else{
                   coursesWrapperElem.innerHTML = "";
                       coursesWrapperElem.insertAdjacentHTML('beforeend',`
                          <div class="bg-danger text-white">دوره ای وجود ندارد</div>
                        `)
              }
              }
              break;
            default:{
                coursesWrapperElem.innerHTML = "";

              [...courses].forEach((course) => {

                coursesWrapperElem.insertAdjacentHTML(
                  "beforeend",
                  `
                  
                  <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="#">
                    <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${
                      course.course.cover
                    }">
                </a>
            </div>
            <div class="main__box-left">
                <a href="#" class="main__box-title">${course.course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">مبلغ:</span>
                        <span class="main__box-all-value">${
                          course.course.price == 0
                            ? "رایگان"
                            : course.course.price.toLocaleString()
                        }</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت</span>
                        <span class="main__box-completed-value">${
                          course.course.isComplete == 1
                            ? "تکمیل"
                            : "درحال برگزاری"
                        }</span>
                    </div>
                </div>
                                            </div>
                                        </div>
                  `
                );
              });
            }

          }
        });
      });
    });
};

export { getAllUserCourses };
