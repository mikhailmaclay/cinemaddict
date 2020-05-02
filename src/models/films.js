// Constants and utils
import {mergeObjects} from '../utils/objects';
// Models
import Model from './abstract/model';
import {Film} from '../utils/adapters';

export default class FilmsModel extends Model {
  updateFilm(filmID, film) {
    this.__state[filmID] = mergeObjects(this.__state[filmID], film);
    // eslint-disable-next-line no-proto
    this.__state[filmID].__proto__ = Film.prototype;

    this.__callChangeHandlers();
  }
}
