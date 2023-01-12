import * as model from '../model';
import View from './view';

class PaginationView extends View {
  _data;
  _parentEl = document.querySelector('.pagination-container');
  _paginationNumbers = document.querySelector('#pagination-numbers');
  _nextButton = document.querySelector('.pagination__btn--next');
  _prevButton = document.querySelector('.pagination__btn--prev');
  _paginationLimit = 10;
  _pageCount;
  _itemsCount;

  _loadPageCount() {
    model.recipesSearchByNameData.totalResults <
    model.recipesSearchByNameData.number
      ? (this._itemsCount = model.recipesSearchByNameData.totalResults)
      : (this._itemsCount = model.recipesSearchByNameData.number);
    this._pageCount = Math.ceil(
      parseInt(this._itemsCount) / this._paginationLimit
    );
  }

  _appendPageNumber(index) {
    const pageNumberEl = document.createElement('button');
    pageNumberEl.className = 'pagination-number';
    pageNumberEl.innerHTML = index;
    pageNumberEl.setAttribute('page-index', index);
    pageNumberEl.setAttribute('aria-label', 'Page ' + index);
    this._paginationNumbers.appendChild(pageNumberEl);
  }

  _getPaginationNumbers() {
    this._parentEl.style.display = 'flex';

    for (let i = 1; i <= this._pageCount; i++) {
      this._appendPageNumber(i);
    }
  }

  clearPagination() {
    this._paginationNumbers.innerHTML = '';
  }

  hidePagination() {
    this._parentEl.style.display = 'none';
  }
}
export default new PaginationView();
