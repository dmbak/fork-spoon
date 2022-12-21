import * as model from './model';
import icons from '../img/icons.svg';
import recipeView from './views/recipeView';

const searchResultPanelEl = document.querySelector('.results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

let recipeId;

const showRecipeList = async function () {
  try {
    // loadSpiner(recepeDetailsContainerEl);

    await model.loadRecipesList();

    recipeId = model.recipesData.results[0].id;
    const createSearchResultElement = function (recipe) {
      const searchElement = `<li class="preview">
        <a class="preview__link preview__link--active" data-id=${recipe.id} href="#23456">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
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
    model.recipesData.results.map(el => {
      htmlEl += createSearchResultElement(el);
    });

    searchResultPanelEl.insertAdjacentHTML('Afterbegin', htmlEl);
    showRecipeDetails();
  } catch (err) {
    console.error(err);
  }
};

const showRecipeDetails = async function () {
  try {
    recipeView.loadSpiner();

    await model.loadRecipeDetails(recipeId);

    recipeView.render(model.recipeDetails);
  } catch (err) {
    console.error(err);
  }
};

searchResultPanelEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('preview__link')) {
    recipeId = parseInt(e.target.dataset.id);
    model.loadRecipeDetails(recipeId);
    showRecipeDetails();
    console.log(model.recipeDetails);
  }
});

showRecipeList();
