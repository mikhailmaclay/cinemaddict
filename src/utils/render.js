// Constants and utils
import {InsertAdjacentHTMLPosition} from '../constants/enums';

function render(targetElement, element, position = InsertAdjacentHTMLPosition.BEFORE_END) {
  targetElement.insertAdjacentHTML(position, element);
}

export default render;
