import icons from '../../img/icons.svg';

class RecipeView {
  #parentEl = document.querySelector('.recipe');
  #data;

  render(data) {
    this.#data = data;
    const htmlEl = this.#generateHTML();
    this.#parentEl.innerHTML = htmlEl;
  }

  loadSpiner() {
    const html = `
          <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('afterbegin', html);
  }

  #generateHTML() {
    return `
        <figure class="recipe__fig">
          <img src="${this.#data.image}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-this.#data recipe__info-this.#data--minutes">${
              this.#data.readyInMinutes
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-this.#data recipe__info-this.#data--people">${
              this.#data.servings
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
${this.#data.extendedIngredients
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
          <div class="recipe__directions-text">${this.#data.instructions}</div>
        </div>
`;
  }
}

export default new RecipeView();
