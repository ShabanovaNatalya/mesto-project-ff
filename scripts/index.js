// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");

// @todo: Функция создания карточки

initialCards.forEach(function (element) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__image").setAttribute("src", element.link);
  card.querySelector(".card__title").textContent = element.name;

  card.querySelector(".card__delete-button").addEventListener("click", function (event) {
      event.target.closest(".card").remove();
    });
    
  cardContainer.append(card);
});

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
