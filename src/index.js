import "./index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: DOM узлы
const content = document.querySelector(".content"),
  cardContainer = content.querySelector(".places__list"),
  forms = document.forms,
  popupImage = document.querySelector(".popup_type_image"),
  imagePopup = popupImage.querySelector(".popup__image"),
  imageCaption = popupImage.querySelector(".popup__caption");
  
// @todo: Функция открытия изображения карточки
const openCard = (cardLink, cardCaption) => {
  imagePopup.src = cardLink;
  imagePopup.alt = cardCaption;
  imageCaption.textContent = cardCaption;
  openModal(popupImage);
};

// @todo: Вывести все карточки на страницу
initialCards.forEach((obj) => {
  cardContainer.append(
    createCard({
      name: obj.name,
      link: obj.link,
      deleteCard,
      openCard,
      likeCard,
    })
  );
});

// Редактирование профиля

const editProfilePopup = document.querySelector(".popup_type_edit"),
  profileTitle = content.querySelector(".profile__title"),
  profileDescription = content.querySelector(".profile__description"),
  formEditProfile = forms["edit-profile"],
  nameInput = formEditProfile.querySelector(".popup__input_type_name"),
  jobInput = formEditProfile.querySelector(".popup__input_type_description");

content.querySelector(".profile__edit-button").addEventListener("click", () => {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function editProfile() {
  const name = nameInput.value,
    job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  closeModal(editProfilePopup);
});

// Добавление новой карточки

const newCardPopup = document.querySelector(".popup_type_new-card");

content.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(newCardPopup);
});

const formNewCard = forms["new-place"],
  cardName = formNewCard.querySelector(".popup__input_type_card-name"),
  cardUrl = formNewCard.querySelector(".popup__input_type_url");

const formAddCard = (cardName, cardUrl) => {
  cardContainer.prepend(
    createCard({
      name: cardName.value,
      link: cardUrl.value,
      deleteCard,
      openCard,
      likeCard,
    })
  );
  forms["new-place"].reset();
};

formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  formAddCard(cardName, cardUrl);
  closeModal(newCardPopup);
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
