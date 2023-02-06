import * as model from './model';
import recipeView from './views/recipeView';
import previewRecipeView from './views/previewRecipeView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
import controlServingsView from './views/controlServingsView';
import bookmarksView from './views/bookmarksView';

// const searchResultPanelEl = document.querySelector('.results');
// const BookmarksPanelEl = document.querySelector('.favorites');
let recipeId;

const loadFirstRecipeDetails = async function (id) {
  await model.loadRecipeDetails(id);
  recipeView.render(model.recipeDetails);
  controlServingsView._controlServings();
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
    controlServingsView._controlServings();
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

document.addEventListener('click', function (e) {
  e.preventDefault();
  const targetLink = e.target.closest('.preview__link');

  if (targetLink) {
    recipeId = parseInt(targetLink.dataset.id);
    model.loadRecipeDetails(recipeId);

    let elements = Array.from(document.querySelectorAll('.preview'));
    elements.forEach(item => {
      item.classList.remove('active');
    });
    e.target.closest('.preview').classList.add('active');

    showRecipeDetails();
  }
});

const init = function () {
  showInitialRecipeList();
  searchView.addHandlerSearch(showSearchResults);
  paginationView.hidePagination();
  paginationView._controlPagination();
  bookmarksView._addRemoveBookmark();
  bookmarksView.showBookmarks();
};

init();
