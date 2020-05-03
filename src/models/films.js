// Constants and utils
import {mergeObjects} from '../utils/objects';
//
import Model from './abstract/model';

export default class FilmsModel extends Model {
  updateFilm(filmID, film) {
    this.__state[filmID] = mergeObjects(this.__state[filmID], film, true);

    this.__callChangeHandlers();
  }
}
