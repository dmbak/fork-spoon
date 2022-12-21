import * as model from './model';
import icons from '../img/icons.svg';
import recipeView from './views/recipeView';

const searchResultPanelEl = document.querySelector('.results');
const recepeDetailsContainerEl = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

let recepeId;

const showRecepeList = async function () {
  try {
    // loadSpiner(recepeDetailsContainerEl);

    await model.loadRecepesList();

    recepeId = model.recepesData.results[0].id;
    const createSearchResultElement = function (recepe) {
      const searchElement = `<li class="preview">
        <a class="preview__link preview__link--active" data-id=${recepe.id} href="#23456">
          <figure class="preview__fig">
            <img src="${recepe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recepe.title}</h4>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      <br />`;
      return searchElement;
    };

    let htmlEl = '';
    model.recepesData.results.map(el => {
      htmlEl += createSearchResultElement(el);
    });

    searchResultPanelEl.insertAdjacentHTML('Afterbegin', htmlEl);
    showRecepeDetails();
  } catch (err) {
    console.error(err);
  }
};

const showRecepeDetails = async function () {
  try {
    recipeView.loadSpiner();

    await model.loadRecepeDetails(recepeId);

    recipeView.render(model.recepeDetails);
  } catch (err) {
    console.error(err);
  }
};

// let previewEl = searchResultPanelEl.children;
// console.log(previewEl);
searchResultPanelEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('preview__link')) {
    recepeId = parseInt(e.target.dataset.id);
    model.loadRecepeDetails(recepeId);
    showRecepeDetails();
    console.log(model.recepeDetails);
  }
});

showRecepeList();
