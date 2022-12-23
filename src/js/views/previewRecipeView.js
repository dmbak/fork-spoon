import icons from '../../img/icons.svg';

class PreviewRecipeView {
  #parentEl = document.querySelector('.results');
  #data;

  render(data) {
    this.#data = data;
    const htmlEl = this.#generateHTML();
    this.#parentEl.innerHTML = htmlEl;
  }

  #createSearchResultElement(rec) {
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" data-id=${rec.id} href="#23456">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      <br />
`;
  }

  #generateHTML() {
    let htmlEl = '';
    this.#data.results.map(el => {
      htmlEl += this.#createSearchResultElement(el);
      console.log(el);
    });
    return htmlEl;
  }

  renderError(err) {
    const html = `
        <div class="error">
            <p>${err}</p>
          </div> 
`;
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

export default new PreviewRecipeView();
