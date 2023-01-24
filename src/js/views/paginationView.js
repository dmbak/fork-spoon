import * as model from '../model';
import View from './view';

class PaginationView extends View {
  _data;
  _parentEl = document.querySelector('.pagination-container');
  _paginationNumbers = document.querySelector('#pagination-numbers');
  _paginationNumberList = document.querySelectorAll('.pagination-number');
  _nextButton = document.querySelector('#next-button');
  _prevButton = document.querySelector('#prev-button');
  _resultsElements = document.getElementsByClassName('preview');
  _paginationLimit = 10;
  _pageCount;
  _currentPage;
  _itemsCount;
  _pageIndex;

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

  _controlArrows() {
    if (this._pageIndex === 1) {
      this._prevButton.style.display = 'none';
      this._nextButton.style.display = 'inline';
    } else if (this._pageIndex === this._pageCount) {
      this._prevButton.style.display = 'inline';
      this._nextButton.style.display = 'none';
    } else {
      this._nextButton.style.display = 'inline';
      this._prevButton.style.display = 'inline';
    }
  }

  _getPaginationNumbers() {
    this._pageIndex = 1;
    this._parentEl.style.display = 'flex';
    this._prevButton.style.display = 'none';

    for (let i = 1; i <= this._pageCount; i++) {
      this._appendPageNumber(i);
    }
  }

  _setCurrentPage(pageNum) {
    const prevButtonEl = document.querySelector('#prev-button');
    const nextButtonEl = document.querySelector('#next-button');
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

  _paginationInit() {
    this.clearPagination();
    this._loadPageCount();
    this._getPaginationNumbers();
    this._setCurrentPage(1);
    this._currentPage = 1;
    this._setActivePaginationNumber(
      document.querySelector(`[page-index="${this._currentPage}"]`)
    );
  }

  _setActivePaginationNumber(targetEl) {
    this._paginationNumbers.childNodes.forEach(item => {
      item.classList.remove('active');
    });
    targetEl.classList.add('active');
  }

  _controlPagination() {
    let self = this;
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const paginationEl = e.target.closest('.pagination-number');
      const paginationNextEl = e.target.closest('#next-button');
      const paginationPrevEl = e.target.closest('#prev-button');

      self._controlArrows();

      if (paginationEl) {
        self._setActivePaginationNumber(paginationEl);
        self._pageIndex = paginationEl.getAttribute('page-index');
        self._setCurrentPage(self._pageIndex);
        self._controlArrows();
      }

      if (paginationNextEl) {
        self._pageIndex++;
        self._currentPage++;
        renderingArrows();
      }

      if (paginationPrevEl) {
        self._pageIndex--;
        self._currentPage--;
        renderingArrows();
      }

      function renderingArrows() {
        self._setCurrentPage(self._pageIndex);
        self._setActivePaginationNumber(
          document.querySelector(`[page-index="${self._currentPage}"]`)
        );
        self._controlArrows();
      }
    });
  }

  clearPagination() {
    this._paginationNumbers.innerHTML = '';
  }

  hidePagination() {
    this._parentEl.style.display = 'none';
  }
}
export default new PaginationView();
