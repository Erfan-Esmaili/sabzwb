import {
  createNewDiscount,
  deleteDiscountCode,
  getAllDiscountCode,
  selectedCourse,
} from "./funcs/discount.js";

window.deleteDiscountCode=deleteDiscountCode

window.addEventListener("load", () => {
  const createDiscountBtn = document.querySelector("#create-discount");

  createDiscountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewDiscount();
    deleteDiscountCode()
  });
  getAllDiscountCode();
  selectedCourse();
});
