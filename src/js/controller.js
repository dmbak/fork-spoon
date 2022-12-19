import * as model from './model';
import icons from '../img/icons.svg';

const searchResultPanelEl = document.querySelector('.results');
const recepeDetailsContainerEl = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const loadSpiner = function (parentElement) {
  const html = `
          <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', html);
};

let recepeId;

const showRecepeList = async function () {
  try {
    loadSpiner(recepeDetailsContainerEl);
    await model.loadRecepesList();
    recepeId = model.recepesData.results[0].id;
    const createSearchResultElement = function (recepe) {
      const searchElement = `<li class="preview">
        <a class="preview__link preview__link--active" data-id=${recepe.id} href="#23456">
          <figure class="preview__fig">
            <img src="${recepe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recepe.title}</h4>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      <br />`;
      return searchElement;
    };

    let htmlEl = '';
    model.recepesData.results.map(el => {
      htmlEl += createSearchResultElement(el);
    });

    searchResultPanelEl.insertAdjacentHTML('Afterbegin', htmlEl);
    showRecepeDetails();
  } catch (err) {
    console.error(err);
  }
};

const showRecepeDetails = async function () {
  try {
    await model.loadRecepeDetails(recepeId);
    const createRecepeElement = function () {
      const recepeElement = `
        <figure class="recipe__fig">
          <img src="${model.recepeDetails.image}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${model.recepeDetails.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              model.recepeDetails.readyInMinutes
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              model.recepeDetails.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
${model.recepeDetails.extendedIngredients
  .map(ingredien => {
    return `
 
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredien.amount}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredien.unit}</span>
               ${ingredien.name} 
              </div>
            </li>
 `;
  })
  .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">${
            model.recepeDetails.instructions
          }</p>
        </div>
`;
      return recepeElement;
    };

    const htmlEl = createRecepeElement();

    recepeDetailsContainerEl.innerHTML = htmlEl;
  } catch (err) {
    console.error(err);
  }
};

// let previewEl = searchResultPanelEl.children;
// console.log(previewEl);
searchResultPanelEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('preview__link')) {
    recepeId = parseInt(e.target.dataset.id);
    model.loadRecepeDetails(recepeId);
    showRecepeDetails();
    console.log(model.recepeDetails);
  }
});

showRecepeList();
