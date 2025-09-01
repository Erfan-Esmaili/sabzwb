import { getToken, convertDateToShamsi,showSwal } from "../../funcs/utils.js";

let categoryID = null;
let coverArticleFile = null;
let editorInstance = null;

//!ckEditor
ClassicEditor.create(document.querySelector("#editor"), {
  language: "fa",
})
  .then((editor) => {
    editorInstance = editor;
  })
  .catch((error) => {
    console.error(error);
  });

const getCategoryArticles = async () => {
  let categoryArticlesWrapper = document.querySelector(".category-list");
  let coverInputElem = document.querySelector("#cover");

  const res = await fetch("http://localhost:4000/v1/category");
  const categoryArticles = await res.json();

  categoryArticles.forEach((category) => {
    categoryArticlesWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <option value=${category._id}>${category.title}</option>
      `
    );
  });
  categoryArticlesWrapper.addEventListener("change", (event) => {
    categoryID = event.target.value;
  });
  coverInputElem.addEventListener("change", (event) => {
    coverArticleFile = event.target.files[0];
  });
};

const createNewArticle = async () => {
  let titleInputElem = document.querySelector("#title");
  let linkInputElem = document.querySelector("#link");
  let descriptionInputElem = document.querySelector("#description");

  const formData = new FormData();
  formData.append("title", titleInputElem.value.trim());
  formData.append("description", descriptionInputElem.value.trim());
  formData.append("body", editorInstance.getData());
  formData.append("shortName", linkInputElem.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("cover", coverArticleFile);

  const res = await fetch("http://localhost:4000/v1/articles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const result = res.json();

  console.log(res);
  console.log(result);
};

const getAndShowAllArticles = async () => {
  let articlesWrapper = document.querySelector(".table tbody");
  articlesWrapper.innerHTML = "";

  const res = await fetch("http://localhost:4000/v1/articles", {
    Authorization: `Bearer ${getToken}`,
  });
  const articles = await res.json();

  articles.forEach((article, index) => {
    articlesWrapper.insertAdjacentHTML(
      "beforeend",
      `

                <tr>
                    <td>${index + 1}</td>
                    <td>${article.title}</td>
                    <td>${article.publish == 1 ? "منتشر شده" : "پیش نویس"}</td>
                    <td>${convertDateToShamsi(
                      article.updatedAt.slice(0, 10)
                    )}</td>
                    <td>${article.creator.name}</td>
                    <td>
                    <button class='btn btn-primary'>ویرایش</button>
                    </td>
                    <td>
                   <button type="button" class="btn btn-danger" id="delete-btn" onclick="deleteArticle('${
                article._id
              }')">حذف</button>
                    </td>
                </tr>
              
              
              `
    );
  });
};

const deleteArticle = async (articleID) => {

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

        
        
        const res = await fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const article = await res.json();
        
        console.log(res);
        console.log(article);
        if(res.ok){
          getAndShowAllArticles()
        }
      }
})
};
export {
  getAndShowAllArticles,
  getCategoryArticles,
  createNewArticle,
  deleteArticle,
};
