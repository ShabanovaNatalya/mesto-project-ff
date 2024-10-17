export { createCard, deleteCard, likeCard };
import { popupDeleteCard } from "../index.js";
import { openModal } from "./modal.js";
import { likeCardApi, deleteLike, deleteCardApi } from "../api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function createCard(cardData, idProfile, handleSubmitConfirmPopup) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = newCard.querySelector(".card__image"),
    cardDeleteButton = newCard.querySelector(".card__delete-button"),
    likeCount = newCard.querySelector(".card__like-count"),
    IdCard = cardData.idCard;

  newCard.querySelector(".card__title").textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  if (cardData.id == idProfile) {
    cardDeleteButton.addEventListener("click", () => {
      openModal(popupDeleteCard);
      handleSubmitConfirmPopup = deleteCardApi(IdCard);
      cardData.deleteCard(newCard);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardData.likes.forEach((element) => {
    if (element._id == idProfile) {
      newCard
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }
  });

  cardImage.addEventListener("click", () => {
    cardData.openCard(cardData.link, cardData.name);
  });

  newCard.querySelector(".card__like-button").addEventListener("click", () => {
    cardData.likeCard(event, cardData.idCard, likeCount);
  });

  return newCard;
}

// @todo: Функция удаления карточки

const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция лайка карточки

const likeCard = (event, idCard, likeCount) => {
  const target = event.target;

  if (target.classList.contains("card__like-button_is-active")) {
    deleteLike(idCard)
      .then((data) => {
        likeCount.textContent = data.likes.length;
        event.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Лайк не удален");
      });
  } else {
    likeCardApi(idCard)
      .then((data) => {
        likeCount.textContent = data.likes.length;
        event.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Лайк не поставлен");
      });
  }
};
