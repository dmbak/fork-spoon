import * as model from './model';
import recipeView from './views/recipeView';
import previewRecipeView from './views/previewRecipeView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';

const searchResultPanelEl = document.querySelector('.results');
const paginationContainer = document.querySelector('.pagination-container');

let recipeId;

const loadFirstRecipeDetails = async function (id) {
  await model.loadRecipeDetails(id);
  recipeView.render(model.recipeDetails);
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

const init = function () {
  showInitialRecipeList();
  searchView.addHandlerSearch(showSearchResults);
  paginationView.hidePagination();
  paginationView._controlPagination();
};

init();
