import * as model from '../model';
import View from './view';
import icons from '../../img/icons.svg';
import controlServingsView from './controlServingsView';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _data;

  _generateHTML() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-this.#data recipe__info-this.#data--minutes">${
              this._data.readyInMinutes
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-persons">${this._data.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
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

          <button class="btn--favorites">
            <svg class="icon--favorites">
              <use href="${icons}#icon-favorites${
      this._data.bookmarked === true ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
${this._data.extendedIngredients
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
          <div class="recipe__directions-text">${this._data.instructions}</div>
        </div>
`;
  }

  _updateRecipeDetails = async function () {
    model.recipeDetails.extendedIngredients.forEach(el => {
      el.amount = el.amount.toFixed(1);
    });

    this.render(model.recipeDetails);
    controlServingsView._controlServings();
  };
}
export default new RecipeView();
