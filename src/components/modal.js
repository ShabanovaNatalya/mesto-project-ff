export { openModal };

// @todo: Функция открытия модального окна
const openModal = (elem) => {
  elem.classList.add("popup_is-opened");

  elem.querySelector(".popup__close").addEventListener("click", closeModal);
 
  // обработчик события клика по оверлею

  elem.addEventListener("click", closeOverley);

  // обработчик события нажатия Esc
  document.addEventListener("keydown", closeEsc,{once:true});
};


// @todo: Функция закрытия модального окна 
const closeModal = () => {
  const openModal = document.querySelector(".popup_is-opened");
  openModal.classList.remove("popup_is-opened");
};

// @todo: Функция закрытия модального по оверлею

function closeOverley(event) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (event.target === openPopup) {
    closeModal(event.target)
  }
  document.removeEventListener("click", closeOverley);
}

// @todo: Функция закрытия модального Esc
function closeEsc(event) {
    if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened");
    closeModal(openModal);
  }
}

