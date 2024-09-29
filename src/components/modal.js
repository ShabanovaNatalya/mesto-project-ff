export { openModal, closeModal };

// @todo: Функция открытия модального окна
const openModal = (elem) => {
  elem.classList.add("popup_is-opened");

  // обработчик события нажатия Esc
  document.addEventListener("keydown", closeEsc,{once:true});
};


// @todo: Функция закрытия модального окна 
const closeModal = (elem) => {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
};


// @todo: Функция закрытия модального Esc
function closeEsc(event) {
    if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened");
    closeModal(openModal);
  }
}

