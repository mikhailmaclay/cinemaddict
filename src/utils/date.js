// Libraries
import moment from 'moment';
// Constants and utils
import {TimeValue} from '../constants/enums';
import {castLots} from './randomizers';
import {getRandomNumberFromRange} from './randomizers';

export const getRandomDate = (difference) => {
  const date = new Date();
  let sign;

  if (difference < 0) {
    sign = -1;
  } else {
    sign = castLots(1, -1);
  }

  difference = sign * getRandomNumberFromRange(0, Math.abs(difference));

  date.setDate(date.getDate() + difference);

  return date;
};

export const formatDate = (date, format) => moment(date).format(format);

export const formatDuration = (duration, format) => {
  const start = new Date();
  const end = new Date(start.getTime() + (duration * TimeValue.MILLISECOND.MINUTE));
  const difference = moment(end).diff(moment(start));

  return moment.utc(difference).format(format);
};
