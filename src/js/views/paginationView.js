import * as model from '../model';
import View from './view';

// const paginationContainer = document.querySelector('.pagination-container');
// const paginatedList = document.querySelector('.results');
// const listItems = paginatedList.querySelectorAll('.preview');
// const paginationNumbers = document.getElementById('pagination-numbers');
// const nextButton = document.querySelector('.pagination__btn--next');
// const prevButton = document.querySelector('.pagination__btn--prev');

// const paginationLimit = 10;
// let pageCount;

// export const loadPageCount = function () {
//   let itemsCount;
//   model.recipesSearchByNameData.totalResults <
//   model.recipesSearchByNameData.number
//     ? (itemsCount = model.recipesSearchByNameData.totalResults)
//     : (itemsCount = model.recipesSearchByNameData.number);
//   pageCount = Math.ceil(parseInt(itemsCount) / paginationLimit);
// };

// loadPageCount();

// const appendPageNumber = index => {
//   const pageNumberEl = document.createElement('button');
//   pageNumberEl.className = 'pagination-number';
//   pageNumberEl.innerHTML = index;
//   pageNumberEl.setAttribute('page-index', index);
//   pageNumberEl.setAttribute('aria-label', 'Page ' + index);
//   paginationNumbers.appendChild(pageNumberEl);
// };

// export const getPaginationNumbers = function () {
//   console.log(pageCount);
//   paginationContainer.style.display = 'inline';

//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

class PaginationView extends View {
  _data;
  _paginationContainer = document.querySelector('.pagination-container');
  _paginatedList = document.querySelector('.results');
  _listItems = this._paginatedList.querySelectorAll('.preview');
  _paginationNumbers = document.getElementById('pagination-numbers');
  _nextButton = document.querySelector('.pagination__btn--next');
  _prevButton = document.querySelector('.pagination__btn--prev');

  _paginationLimit = 10;
  _pageCount;
  _itemsCount;

  _loadPageCount() {
    model.recipesSearchByNameData.totalResults <
    model.recipesSearchByNameData.number
      ? (itemsCount = model.recipesSearchByNameData.totalResults)
      : (itemsCount = model.recipesSearchByNameData.number);
    pageCount = Math.ceil(parseInt(itemsCount) / paginationLimit);
  }

  _generateHTML() {
    return `
            <div class="pagination-container">
          <button
            class="pagination-button"
            id="prev-button"
            title="Previous page"
            aria-label="Previous page"
          >
            &lt;
          </button>

          <div id="pagination-numbers"></div>

          <button
            class="pagination-button"
            id="next-button"
            title="Next page"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>
      `;
  }
  _appendPageNumber(index) {
    const pageNumberEl = document.createElement('button');
    pageNumberEl.className = 'pagination-number';
    pageNumberEl.innerHTML = index;
    pageNumberEl.setAttribute('page-index', index);
    pageNumberEl.setAttribute('aria-label', 'Page ' + index);
    paginationNumbers.appendChild(pageNumberEl);
  }

  _getPaginationNumbers() {
    console.log(pageCount);
    paginationContainer.style.display = 'inline';

    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  }
}
export default new PaginationView();
