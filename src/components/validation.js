export { enableValidation, clearValidation };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible' ,
// });

function enableValidation(obj) {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${obj.errorClass}_active`);
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(`.${obj.errorClass}_active`);
    errorElement.textContent = "";
  };

  const checkInputValidity = (formElement, inputElement) => {
    const regex = /[a-z-\s\wа-яё]/gi;

    if (!inputElement.value) {
      showInputError(
        formElement,
        inputElement,
        inputElement.dataset.errorMessage
      );
    } else if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);

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
  buttonElement.classList.remove(obj.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(`${obj.inputErrorClass}`);
  });

  errorList.forEach((errorElement) => {
    errorElement.classList.remove(`${obj.errorClass}_active`);
  });

};
