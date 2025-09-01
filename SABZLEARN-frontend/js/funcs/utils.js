// !!sweet alert
const showSwal = (
  title,
  icon,
  showConfirmButton,
  timer,
  footer,
  confirmButtonText,
  text,
  width,
  callback
) => {
  Swal.fire({
    title,
    icon,
    text,
    showConfirmButton,
    confirmButtonText,
    timer,
    footer,
    width,
  }).then((result) => callback(result));
};


// !!get &set localstorage
const setToLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};
// ?Token
const getToken = () => {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  return userInfos ? userInfos.token : null;
};

const isLogin = () => {
  let userInfo = localStorage.getItem("user");
  return userInfo ? true : false;
};

const getUrlParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

let courseShortName = getUrlParam("name");

const searchInArray = (array, searchProperty, searchValue) => {
  let outPutArray = [];
  outPutArray = array.filter((item) =>
    item[searchProperty].toLowerCase().includes(searchValue.toLowerCase())
  );

  return outPutArray;
};
//// تبدیل تاریخ به شمسی////
const convertDateToShamsi = (dateOfGhamari) => {
  let dateUpdateCourse = dateOfGhamari;

  const date = new Date(dateUpdateCourse);
  const getShamsDate = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return getShamsDate;
};



// ** pagination

const addParamToUrl=(key,value)=>{
  
    const url = new URL(window.location.href);
    let param = url.searchParams
    param.set(key,value)
    url.search = param.toString()
    location.href = url.search
}
window.addParamToUrl= addParamToUrl


const paginationItems = (
  array,
  countItemsInPage,
  paginationParentElem,
  currentPage
) => {
  paginationParentElem.innerHtml = "";
  let endIndex = countItemsInPage * currentPage;
  let startIndex = endIndex - countItemsInPage;
  let paginationCount = Math.ceil(array.length / countItemsInPage);
  let itemsForShow = array.slice(startIndex, endIndex);

  for (let i = 1; i < paginationCount + 1; i++) {
    paginationParentElem.insertAdjacentHTML(
      "beforeend",
      `
      <li class="page-item pagination-item" onclick="addParamToUrl('page' , ${i})">

      ${i==currentPage?`
      <a class="page-link courses-pagination__link courses-top-bar__icon--active" href="#">
          ${i}
      </a>
     
      
      `:`
      <a class="page-link courses-pagination__link" href="#">
          ${i}
      </a>
      `}
      
            </li>


      `
    );
  }
  return itemsForShow;
};

export {
  showSwal,
  setToLocalStorage,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlParam,
  courseShortName,
  searchInArray,
  convertDateToShamsi,
  paginationItems,
  addParamToUrl
};
