export { createCard, deleteCard, likeCard };
import { cardTemplate } from "../index.js";

// @todo: Функция создания карточки

function createCard(obj) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = newCard.querySelector(".card__image");

  newCard.querySelector(".card__title").textContent = obj.name;

  cardImage.alt = obj.name;
  cardImage.src = obj.link;

  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", () => obj.deleteCard(newCard));

  newCard
    .querySelector(".card__image")
    .addEventListener("click", () => obj.openCard(obj.link, obj.name));

  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", obj.likeCard);

  return newCard;
}

// @todo: Функция удаления карточки

const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция лайка карточки

const likeCard = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

