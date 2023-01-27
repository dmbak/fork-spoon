import * as model from './model';
import recipeView from './views/recipeView';
import previewRecipeView from './views/previewRecipeView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';

const searchResultPanelEl = document.querySelector('.results');
let recipeId;

const loadFirstRecipeDetails = async function (id) {
  await model.loadRecipeDetails(id);
  recipeView.render(model.recipeDetails);
  controlServings();
};

const showInitialRecipeList = async function () {
  try {
    recipeView.loadSpiner();
    previewRecipeView.loadSpiner();
    await model.loadInitialRecipesList();

    recipeId = model.initialRecipesData.results[0].id;
    previewRecipeView.render(model.initialRecipesData);

    loadFirstRecipeDetails(recipeId);
  } catch (err) {
    console.error(err);
  }
};

const showRecipeDetails = async function () {
  try {
    recipeView.loadSpiner();

    await model.loadRecipeDetails(recipeId);

    recipeView.render(model.recipeDetails);

    controlServings();
  } catch (err) {
    model.renderError(err);
  }
};

const showSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    searchView.loadSpiner();
    await model.loadRecipeSearchByName(query);

    searchView.clearValue();

    // console.log(model.recipesSearchByNameData.results.length);

    if (model.recipesSearchByNameData.results.length <= 10) {
      previewRecipeView.render(model.recipesSearchByNameData);
      recipeId = model.recipesSearchByNameData.results[0].id;
      loadFirstRecipeDetails(recipeId);
      paginationView.hidePagination();
    }

    if (model.recipesSearchByNameData.results.length > 10) {
      previewRecipeView.render(model.recipesSearchByNameData);
      recipeId = model.recipesSearchByNameData.results[0].id;
      loadFirstRecipeDetails(recipeId);
      paginationView._paginationInit();
    }
  } catch (err) {
    console.error(err);
  }
};

searchResultPanelEl.addEventListener('click', function (e) {
  e.preventDefault();
  const targetLink = e.target.closest('.preview__link');
  if (targetLink) {
    recipeId = parseInt(targetLink.dataset.id);
    model.loadRecipeDetails(recipeId);
    showRecipeDetails();
  }
});

const controlServings = function () {
  const recipeInfoBtns = document.querySelector('.recipe__info-buttons');

  recipeInfoBtns.addEventListener('click', function (e) {
    e.preventDefault();
    const decreaseBtn = e.target.closest('.btn--decrease-servings');
    const increaseBtn = e.target.closest('.btn--increase-servings');
    const servingsEl = document.querySelector('.recipe__info-persons');
    const initialServingValue = model.recipeDetails.servings;
    let servingsVal = servingsEl.innerHTML;

    const updateIngredients = function (initVal, val) {
      console.log(model.recipeDetails);
      model.recipeDetails.extendedIngredients.forEach(el => {
        let valRate = val / initVal;
        el.amount = el.amount * valRate;
      });
      model.recipeDetails.servings = val;
    };

    if (decreaseBtn) {
      servingsVal--;
      updateIngredients(initialServingValue, servingsVal);
      recipeView.render(model.recipeDetails);
    }
    if (increaseBtn) {
      servingsVal++;
      updateIngredients(initialServingValue, servingsVal);
      recipeView.render(model.recipeDetails);
    }
  });
};

const init = function () {
  showInitialRecipeList();
  searchView.addHandlerSearch(showSearchResults);
  paginationView.hidePagination();
  paginationView._controlPagination();
};

init();
