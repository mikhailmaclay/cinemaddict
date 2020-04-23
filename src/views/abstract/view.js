// Constants and utils
import {RenderPosition} from '../../constants/enums';

export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error(`Can't instantiate View, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`Abstract getter not implemented: getTemplate`);
  }

  get element() {
    if (!this._element) {
      this._createElement();
    }

    return this._element;
  }

  render(targetElement, position = RenderPosition.END) {
    switch (position) {
      case RenderPosition.START:
        targetElement.prepend(this.element);

        break;

      case RenderPosition.END:
        targetElement.append(this.element);

        break;

      default:
        return;
    }

    this.__selectElements();
    this.__addEventListeners();
  }

  remove() {
    this.__removeEventListeners();
    this.element.remove();
    this._removeElement();
  }

  __rerender() {
    if (!this._element) {
      return;
    }

    const oldElement = this._element;
    const parent = oldElement.parentElement;

    this.__removeEventListeners();
    this._removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, oldElement);

    this.__selectElements();
    this.__addEventListeners();
  }

  __selectElements() {
    return;
  }

  __addEventListeners() {
    return;
  }

  __removeEventListeners() {
    return;
  }

  _createElement() {
    const element = document.createElement(`div`);

    element.innerHTML = this.template;

    this._element = element.firstElementChild;
  }

  _removeElement() {
    this._element = null;
  }
}
