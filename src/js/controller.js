import * as model from './model';
import recipeView from './views/recipeView';
import previewRecipeView from './views/previewRecipeView';
import searchView from './views/searchView';

const searchResultPanelEl = document.querySelector('.results');

let recipeId;

const loadFirstRecipeDetails = async function (id) {
  await model.loadRecipeDetails(id);
  recipeView.render(model.recipeDetails);
};

const showInitialRecipeList = async function () {
  try {
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

    await model.loadRecipeSearchByName(query);

    previewRecipeView.render(model.recipesSearchByNameData);

    recipeId = model.recipesSearchByNameData.results[0].id;
    loadFirstRecipeDetails(recipeId);
  } catch (err) {
    console.error(err);
  }
};

searchResultPanelEl.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('preview__link')) {
    recipeId = parseInt(e.target.dataset.id);
    model.loadRecipeDetails(recipeId);
    showRecipeDetails();
    console.log(model.recipeDetails);
  }
});

const init = function () {
  showInitialRecipeList();
  searchView.addHandlerSearch(showSearchResults);
};

init();
