// Constants and utils
import {RenderPosition} from '../../constants/enums';
import {callSafely} from '../../utils/components';

const STRING_WITH_SPACE = ` `; // Служит для создания узла, чтобы можно было сделать замещение новым узлом при перерисовке (rerender).

export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error(`Can't instantiate View, only concrete one.`);
    }

    this._element = null;

    this._targetElement = null;
    this._position = null;
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
    this._render(targetElement, position);
  }

  remove() {
    /*
      Функция для безопасного вызова. Для тех случаев, когда в методах может быть обращение к несуществующим элементам,
      так как они еще не существуют.
    */
    callSafely(() => this.__removeEventListeners());
    this.element.remove();
    this._removeElement();
  }

  rerender() {
    if (!this._element) {
      return;
    }

    if (this._targetElement) {
      callSafely(() => this.__removeEventListeners());
      this.element.remove();
      this._removeElement();

      this._render(this._targetElement, this._position);
    }

    const oldElement = this._element;

    callSafely(() => this.__removeEventListeners());
    this._removeElement();

    oldElement.replaceWith(this.element);

    callSafely(() => {
      this.__selectElements();
      this.__addEventListeners();
    });
  }

  // Сделал отдельный метод, так как метод render может использоваться как метод жизненного цикла.
  _render(targetElement, position = RenderPosition.END) {
    /*
      Возможность передавать функцию в метод была добавлена для тех случаев, когда представление отрисовывается в другом
      представлении, которое может обновиться при изменении модели. Необходимо чтобы функция возвращала ссылку на находящийся
      в DOM элемент.
    */
    if (typeof targetElement === `function`) {
      this._targetElement = targetElement;
      this._position = position;

      targetElement = this._targetElement();
    }

    switch (position) {
      case RenderPosition.START:
        targetElement.prepend(this.element);

        break;

      case RenderPosition.END:
        targetElement.append(this.element);

        break;

      case RenderPosition.BEFORE:
        targetElement.before(this.element);

        break;

      case RenderPosition.AFTER:
        targetElement.after(this.element);

        break;

      default:
        return;
    }

    callSafely(() => {
      this.__selectElements();
      this.__addEventListeners();
    });
  }

  __selectElements() {}

  __addEventListeners() {}

  __removeEventListeners() {}

  _createElement() {
    const element = document.createElement(`div`);

    element.innerHTML = this.template || STRING_WITH_SPACE;

    this._element = element.firstChild;
  }

  _removeElement() {
    this._element = null;
  }
}
