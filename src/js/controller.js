import * as model from './model';
import recipeView from './views/recipeView';
import previewRecipeView from './views/previewRecipeView';

const searchResultPanelEl = document.querySelector('.results');

let recipeId;

const showInitialRecipeList = async function () {
  try {
    await model.loadInitialRecipesList();

    recipeId = model.initialRecipesData.results[0].id;
    previewRecipeView.render(model.initialRecipesData);

    // Loading details for first recipe
    await model.loadRecipeDetails(recipeId);
    recipeView.render(model.recipeDetails);
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

searchResultPanelEl.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('preview__link')) {
    recipeId = parseInt(e.target.dataset.id);
    model.loadRecipeDetails(recipeId);
    showRecipeDetails();
    console.log(model.recipeDetails);
  }
});

showInitialRecipeList();
