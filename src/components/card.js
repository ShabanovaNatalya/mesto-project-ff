export { createCard, deleteCard, likeCard };
import { likeCardApi, deleteLike, deleteCardApi } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function createCard(
  cardData,
  functionCard,
  idProfile,
  deleteCardCb
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = newCard.querySelector(".card__image"),
    cardDeleteButton = newCard.querySelector(".card__delete-button"),
    cardLikeButton = newCard.querySelector(".card__like-button"),
    likeCount = newCard.querySelector(".card__like-count"),
    idCard = cardData.idCard;

  newCard.querySelector(".card__title").textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  if (cardData.id == idProfile) {

    function createDeleteCard() {
        deleteCardApi(idCard);
        functionCard.deleteCard(newCard);
    }

    cardDeleteButton.addEventListener("click", () => {
      deleteCardCb(createDeleteCard);

      document
        .querySelector(".popup_type_delete-card")
        .classList.add("popup_is-opened");
    });
  } else {
    cardDeleteButton.remove();
  }

  cardData.likes.forEach((element) => {
    if (element._id == idProfile) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  cardImage.addEventListener("click", () => {
    functionCard.openCard(cardData.link, cardData.name);
  });

  cardLikeButton.addEventListener("click", () => {
    functionCard.likeCard(event, cardData.idCard, likeCount);
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
