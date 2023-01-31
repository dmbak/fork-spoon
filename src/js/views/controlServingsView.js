import * as model from '../model';
// import View from './view';
import View from './view';
import recipeView from './recipeView';

class ControlServingsView extends View {
  _recipeInfoBtns = document.querySelector('.recipe__info-buttons');
  _recipeContainerEl = document.querySelector('.recipe');

  _controlServings = function () {
    let servingsVal = model.recipeDetails.servings;
    const initialServingValue = model.recipeDetails.servings;

    let self = this;
    this._recipeContainerEl.addEventListener('click', function (e) {
      e.preventDefault();
      const decreaseBtn = e.target.closest('.btn--decrease-servings');
      const increaseBtn = e.target.closest('.btn--increase-servings');

      const updateIngredients = function (initVal, val) {
        model.recipeDetails.extendedIngredients.forEach(el => {
          let valRate = val / initVal;
          el.amount = el.amount * valRate;
        });
        model.recipeDetails.servings = val;
      };

      if (decreaseBtn) {
        servingsVal--;
        updateIngredients(initialServingValue, servingsVal);
        recipeView._updateRecipeDetails();
      }

      if (increaseBtn) {
        servingsVal++;
        updateIngredients(initialServingValue, servingsVal);
        recipeView._updateRecipeDetails();
      }
    });
  };
}
export default new ControlServingsView();
