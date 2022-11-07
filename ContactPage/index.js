window.addEventListener("load", function () {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const form = document.querySelector("form");

  const errorName = document.getElementById("errorName");
  const errorPhone = document.getElementById("errorPhone");
  const errorEmail = document.getElementById("errorEmail");
  const errorMessage = document.getElementById("errorMessage");

  const subBtn = document.getElementById("subBtn");

  subBtn.addEventListener("click", subBtnClick);

  function subBtnClick(e) {
    let isEmail = include(emailInput, "@");
    let isName = validField(nameInput);
    let isPhone = validLength(phoneInput, 9, 10);
    let isMessage = validLength(messageInput, 1, 300);

    if (!isName) errorName.style.display = "block";
    else errorName.style.display = "none";
    if (!isEmail) errorEmail.style.display = "block";
    else errorEmail.style.display = "none";
    if (!isMessage) errorMessage.style.display = "block";
    else errorMessage.style.display = "none";
    if (!isPhone) errorPhone.style.display = "block";
    else errorPhone.style.display = "none";

    if(isEmail && isMessage && isPhone && isName){
        form.classList.add('disNone');
        const h3= document.createElement("h3");
        h3.innerHTML = "Thank you :)";
        document.querySelector('body').appendChild(h3);
    }
  }
});

function validField(field) {
  return field != null && !isNallOrEmpty(field.value);
}

function isNallOrEmpty(str) {
  return str == null || str.length == 0;
}

function include(field, thing) {
  return validField(field) && field.value.includes(thing);
}
function validLength(field, min, max) {
  return (
    validField(field) && field.value.length >= min && field.value.length <= max
  );
}
