import "./index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getProfile,
  getInitialCards,
  changeNameJob,
  postNewCard,
  changeAvatarPatch,
  deleteCardApi,
} from "./components/api.js";

let idProfile;

//функция удаления нужной карточки
let handleSubmitConfirmPopup = function () {};

let deleteCardCb = function (a) {
  handleSubmitConfirmPopup = a;
};

//Конфигурция валидации

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// включение валидации вызовом enableValidation

enableValidation(validationConfig);

// @todo: DOM узлы
const content = document.querySelector(".page"),
  cardContainer = content.querySelector(".places__list"),
  forms = document.forms,
  popupImage = content.querySelector(".popup_type_image"),
  imagePopup = popupImage.querySelector(".popup__image"),
  imageCaption = popupImage.querySelector(".popup__caption"),
  changeAvatarPopup = content.querySelector(".popup_type_change-avatar"),
  editProfilePopup = content.querySelector(".popup_type_edit"),
  profileTitle = content.querySelector(".profile__title"),
  profileImage = content.querySelector(".profile__image"),
  profileDescription = content.querySelector(".profile__description"),
  formChangeAvatar = forms["change-avatar"],
  changeAvatarUrl = formChangeAvatar.querySelector(
    ".popup__input_type_avatar_url"
  ),
  formChangeAvatarButton = formChangeAvatar.querySelector(".popup__button"),
  profilEditButton = content.querySelector(".profile__edit-button"),
  formEditProfile = forms["edit-profile"],
  nameInput = formEditProfile.querySelector(".popup__input_type_name"),
  jobInput = formEditProfile.querySelector(".popup__input_type_description"),
  formEditProfileButton = formEditProfile.querySelector(".popup__button"),
  popupDeleteCard = content.querySelector(".popup_type_delete-card");

// @todo: Функция открытия изображения карточки
const openCard = (cardLink, cardCaption) => {
  imagePopup.src = cardLink;
  imagePopup.alt = cardCaption;
  imageCaption.textContent = cardCaption;
  openModal(popupImage);
};

// @todo: Функция загрузки профиля

function renderProfile(obj) {
  profileTitle.textContent = obj.name;
  profileDescription.textContent = obj.about;
  profileImage.style.backgroundImage = `url(${obj.avatar})`;
  idProfile = obj._id;
}

// @todo: Функция вывода все карточки на страницу

const functionCard = {
  deleteCard,
  openCard,
  likeCard,
};

function renderCards(array) {
  array.forEach((obj) => {
    cardContainer.append(
      createCard(
        {
          name: obj.name,
          link: obj.link,
          likes: obj.likes,
          id: obj.owner._id,
          idCard: obj._id,
        },
        functionCard,
        idProfile,
        deleteCardCb
      )
    );
  });
}

//Вывод с сервера данных пользователя и карточки

Promise.all([getProfile(), getInitialCards()])
  .then(([profileObj, initialCards]) => {
    renderProfile(profileObj);
    renderCards(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// Редактирование профиля

profilEditButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfileButton);
  changeNameJob(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .then(() => {
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log("Ошибка. Профиль не обновлен.");
    })
    .finally(() => {
      renderLoading(false, formEditProfileButton);
    });
});

//Смена аватара

profileImage.addEventListener("click", () => {
  openModal(changeAvatarPopup);
});

formChangeAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, formChangeAvatarButton);
  changeAvatarPatch(changeAvatarUrl.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      formChangeAvatar.reset();
      closeModal(changeAvatarPopup);
    })
    .catch((err) => {
      console.log("Ошибка. Аватар не обновлен.");
    })
    .finally(() => {
      renderLoading(false, formChangeAvatarButton);
    });
});

// Добавление новой карточки

const newCardPopup = content.querySelector(".popup_type_new-card"),
  formNewCard = forms["new-place"],
  cardName = formNewCard.querySelector(".popup__input_type_card-name"),
  cardUrl = formNewCard.querySelector(".popup__input_type_url"),
  formNewCardButton = formNewCard.querySelector(".popup__button");

content.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(newCardPopup);
});

formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, formNewCardButton);
  postNewCard(cardName.value, cardUrl.value)
    .then((data) => {
      cardContainer.prepend(
        createCard(
          {
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data.owner._id,
            idCard: data._id,
          },
          functionCard,
          idProfile,
          deleteCardCb
        )
      );
    })
    .then(() => {
      closeModal(newCardPopup);
      formNewCard.reset();
    })
    .catch((err) => {
      console.log("Ошибка. Карточка не добавлена");
    })
    .finally(() => {
      renderLoading(false, formNewCardButton);
    });
});

//Подтверждение удаления карточки

const confirmationDeleteCard = forms["delete-card"];
confirmationDeleteCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmitConfirmPopup();
  closeModal(popupDeleteCard);
});

// Обработчики клика закрытия модального по крестику и по оверлею

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

//Функция загрузки Сохранение...

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}
