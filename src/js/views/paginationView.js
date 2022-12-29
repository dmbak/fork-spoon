import * as model from '../model';

const paginatedList = document.querySelector('.results');
const listItems = paginatedList.querySelectorAll('.preview');
const paginationNumbers = document.getElementById('pagination-numbers');
const nextButton = document.querySelector('.pagination__btn--next');
const prevButton = document.querySelector('.pagination__btn--prev');

const paginationLimit = 10;
let pageCount = 10;

export const loadPageCount = function () {
  let itemsCount;
  // console.log(model.recipesSearchByNameData);
  model.recipesSearchByNameData.totalResults <
  model.recipesSearchByNameData.number
    ? (itemsCount = model.recipesSearchByNameData.totalResults)
    : (itemsCount = model.recipesSearchByNameData.number);
  pageCount = Math.ceil(parseInt(itemsCount) / paginationLimit);
};

const appendPageNumber = index => {
  const pageNumberEl = document.createElement('button');
  pageNumberEl.className = 'pagination-number';
  pageNumberEl.innerHTML = index;
  pageNumberEl.setAttribute('page-index', index);
  pageNumberEl.setAttribute('aria-label', 'Page ' + index);
  paginationNumbers.appendChild(pageNumberEl);
  console.log(index);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
    console.log(i);
  }
};

loadPageCount();
getPaginationNumbers();
