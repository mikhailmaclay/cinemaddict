// Libraries
import moment from 'moment';
// Constants and utils
import {DateFormat, TimeValue} from '../constants/enums';

export const formatDate = (date, format) => {
  if (format === DateFormat.FROM_NOW) {
    return moment(date).startOf(`second`).fromNow();
  }

  return moment(date).format(format);
};

export const formatDuration = (duration, format) => {
  const start = new Date();
  const end = new Date(start.getTime() + (duration * TimeValue.MILLISECOND.MINUTE));
  const difference = moment(end).diff(moment(start));

  return moment.utc(difference).format(format);
};
