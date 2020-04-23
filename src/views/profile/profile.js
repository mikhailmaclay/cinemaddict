import View from '../abstract/view';
import createProfileTemplate from './profile.template';

export default class ProfileView extends View {
  get template() {
    return createProfileTemplate();
  }
}

