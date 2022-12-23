import View from './view';
import icons from '../../img/icons.svg';

class PreviewRecipeView extends View {
  _parentEl = document.querySelector('.results');
  _data;

  _createSearchResultElement(rec) {
    return `
      <li class="preview">
        <a class="preview__link" data-id=${rec.id} href="">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
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
