export { enableValidation, clearValidation };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible' ,
// });

//Показать ошибку ввода
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}_active`);
};

//Скрыть ошибку ввода

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(`.${errorClass}_active`);
  errorElement.textContent = "";
};

//Изменение кнопки в зависимости валидности

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

//Проверка на валидность нескольких полей

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Проверка на валидность  полей

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorPattern,
      inputErrorClass,
      errorClass
    );
  } else if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else if (!inputElement.value) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function enableValidation(obj) {
  //Установка прослушивателей событий
  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );

    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(
          formElement,
          inputElement,
          obj.inputErrorClass,
          obj.errorClass
        );
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// очистка ошибок валидации вызовом clearValidation

function clearValidation(formElement, obj) {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${obj.inputErrorClass}`)
  );
  const errorList = Array.from(
    formElement.querySelectorAll(`.${obj.errorClass}_active`)
  );

  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    checkInputValidity(
      formElement,
      inputElement,
      obj.inputErrorClass,
      obj.errorClass
    );
  });
}
