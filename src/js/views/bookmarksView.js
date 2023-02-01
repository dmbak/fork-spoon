import * as model from '../model';
import View from './view';
import recipeView from './recipeView';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _recipiInfoEl = document.querySelector('.recipe');

  _createBookmarkElement(rec) {
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
`;
  }

  _generateHTML() {
    let htmlEl = '';
    console.log(this._data);
    this._data.results.map(el => {
      htmlEl += this._createBookmarkElement(el);
    });
    return htmlEl;
  }

  showBookmarks() {
    console.log(model.bookmarkedRecipes);
    this.render(model.bookmarkedRecipes);
  }

  _addRemoveBookmark() {
    const self = this;
    this._recipiInfoEl.addEventListener('click', function (e) {
      const bookmarkBtn = e.target.closest('.btn--bookmark');
      const recipeId = model.recipeDetails.id;
      if (bookmarkBtn) {
        if (!model.recipeDetails.bookmarked) {
          model.recipeDetails.bookmarked = true;
          model.bookmarkedRecipes.results.push(model.recipeDetails);
          console.log(model.bookmarkedRecipes);
          recipeView.render(model.recipeDetails);
          self.showBookmarks();
        } else {
          model.recipeDetails.bookmarked = false;
          console.log(
            model.bookmarkedRecipes.results.findIndex(x => x.id === recipeId)
          );
          let index = model.bookmarkedRecipes.results.findIndex(
            x => x.id === recipeId
          );
          if (index !== -1) {
            model.bookmarkedRecipes.results.splice(index, 1);
          }
          console.log(model.bookmarkedRecipes);
          recipeView.render(model.recipeDetails);
          self.showBookmarks();
        }
      }
    });
  }
}
export default new BookmarksView();
