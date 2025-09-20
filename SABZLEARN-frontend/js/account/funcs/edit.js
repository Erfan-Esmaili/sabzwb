import {getToken,showSwal} from '../../funcs/utils.js'
let nameInputElem = document.querySelector("#name");
  let usernameInputElem = document.querySelector("#username");
  let emailInputElem = document.querySelector("#email");
  let phoneInputElem = document.querySelector("#phone");
  let passwordInputElem = document.querySelector("#password");
  let repeatPasswordInputElem = document.querySelector("#Repeat-password");


const editUserInformation=async()=>{

 await fetch('https://sabz.liara.run/v1/auth/me',{
      headers:{
        Authorization : `Bearer ${getToken()}`
       }
  }).then(res=>res.json()).then(data=>{
    console.log(data)
    phoneInputElem.value=data.phone
    nameInputElem.value=data.name
    emailInputElem.value=data.email
    usernameInputElem.value=data.username


  }
       )
}


const editAdminInfo = async () => {
  

  const newAdminInfosObject = {
    name: nameInputElem.value.trim(),
    username: usernameInputElem.value.trim(),
    email: emailInputElem.value.trim(),
    password: passwordInputElem.value.trim(),
    phone: phoneInputElem.value.trim(),
  };

  if(passwordInputElem.value.trim() === repeatPasswordInputElem.value.trim()){
 await fetch("https://sabz.liara.run/v1/users", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAdminInfosObject),
  })
    .then((res) =>{
      if(res.ok){
            showSwal(
              "اطلاعات با موفقیت تغییر کرد",
              "success",
              false,
              "1800",
              "",
              "",
              "",
              "",
              () => {
                location.href = '../account/index.html'
              })

        
        
      }
    })
  }else{
    showSwal(
              "گذرواژه ها یکسان نیستند",
              "error",
              false,
              "1800",
              "",
              "",
              "",
              "",
              () => {
                
              })
  }

 
};
export {editUserInformation,editAdminInfo}