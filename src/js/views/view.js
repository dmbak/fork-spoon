import icons from '../../img/icons.svg';

export default class View {
  _parentEl = document.querySelector('.recipe');
  _data;

  render(data) {
    this._data = data;
    const htmlEl = this._generateHTML();
    this._parentEl.innerHTML = htmlEl;
  }

  loadSpiner() {
    const html = `
          <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(err) {
    const html = `
        <div class="error">
            <p>${err}</p>
          </div> 
`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
