import "./index.css";
import {
  createCard,
  deleteCard,
  likeCard,
} from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openModal } from "./components/modal.js";
import { event } from "jquery";

export { cardTemplate };

// @todo: DOM узлы
const content = document.querySelector(".content"),
  cardContainer = content.querySelector(".places__list"),
  forms = document.forms,
  // @todo: Темплейт карточки
  cardTemplate = document.querySelector("#card-template").content;


// @todo: Функция открытия изображения карточки

const openCard = (cardLink, cardCaption) => {
  const popupImage= document.querySelector(".popup_type_image");

  popupImage.querySelector(".popup__image").src = cardLink;
  popupImage.querySelector(".popup__caption").textContent = cardCaption;

  openModal(popupImage);
};


// Прототип карточки:
function Card(obj) {
  this.name = obj.name;
  this.link = obj.link;
}
Card.prototype.deleteCard = deleteCard;
Card.prototype.openCard = openCard;
Card.prototype.likeCard = likeCard;

// @todo: Вывести все карточки на страницу
initialCards.forEach((obj) => {
  const oneCard = new Card(obj);
  cardContainer.append(createCard(oneCard));
});


// Редактирование профиля
const editProfilePopup = document.querySelector(".popup_type_edit");
content.querySelector(".profile__edit-button").addEventListener("click", () => {
  openModal(editProfilePopup);
  nameInput.placeholder = content.querySelector(".profile__title").textContent;
  jobInput.placeholder = content.querySelector(".profile__description").textContent;
});

const profileTitle = content.querySelector(".profile__title"),
  profileDescription = content.querySelector(".profile__description"),
  formEditProfile = forms["edit-profile"],
  nameInput = formEditProfile.querySelector(".popup__input_type_name"),
  jobInput = formEditProfile.querySelector(".popup__input_type_description");

function editProfile() {
  const name = nameInput.value,
        job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  document
    .querySelector(".popup_type_edit")
    .classList.remove("popup_is-opened");
});

// Добавление новой карточки

const newCardPopup = document.querySelector(".popup_type_new-card");

content.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(newCardPopup);
});

const formNewCard = forms["new-place"],
  cardName = formNewCard.querySelector(".popup__input_type_card-name"),
  cardUrl = formNewCard.querySelector(".popup__input_type_url");

formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const oneCard = new Card({
    name: cardName.value,
    link: cardUrl.value,
  });

  cardContainer.prepend(createCard(oneCard));

  cardName.value = "";
  cardUrl.value = "";

  document
    .querySelector(".popup_type_new-card")
    .classList.remove("popup_is-opened");
});




