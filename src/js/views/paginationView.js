import * as model from '../model';
import View from './view';

class PaginationView extends View {
  _data;
  _parentEl = document.querySelector('.pagination-container');
  _paginationNumbers = document.querySelector('#pagination-numbers');
  _paginationNumberList = document.querySelectorAll('.pagination-number');
  _nextButton = document.querySelector('.pagination__btn--next');
  _prevButton = document.querySelector('.pagination__btn--prev');
  _resultsElements = document.getElementsByClassName('preview');
  _paginationLimit = 10;
  _pageCount;
  _CurrentPage;
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

  _setCurrentPage(pageNum) {
    let elements = Array.from(this._resultsElements);

    this._currentPage = pageNum;

    const prevRange = (pageNum - 1) * this._paginationLimit;
    const currRange = pageNum * this._paginationLimit;

    elements.forEach((item, index) => {
      item.style.display = 'none';
      if (index >= prevRange && index < currRange) {
        item.style.display = 'block';
      }
    });
  }

  _setActivePaginationNumber(targetEl) {
    const allNumEls = this._paginationNumbers.childNodes;
    console.log(allNumEls);
    allNumEls.forEach(item => {
      item.classList.remove('active');
    });
    targetEl.classList.add('active');
  }

  clearPagination() {
    this._paginationNumbers.innerHTML = '';
  }

  hidePagination() {
    this._parentEl.style.display = 'none';
  }
}
export default new PaginationView();
