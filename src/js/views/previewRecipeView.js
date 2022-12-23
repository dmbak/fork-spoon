import View from './view';
import icons from '../../img/icons.svg';

class PreviewRecipeView extends View {
  _parentEl = document.querySelector('.results');
  _data;

  _createSearchResultElement(rec) {
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

  _generateHTML() {
    let htmlEl = '';
    this._data.results.map(el => {
      htmlEl += this._createSearchResultElement(el);
    });
    return htmlEl;
  }
}

export default new PreviewRecipeView();
