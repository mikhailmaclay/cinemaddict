// Constants and utils
import {Emotion} from '../constants/enums';
import {getRandomArrayValue, getRandomDate, getRandomObjectValue} from '../utils/randomizers';

const RANDOM_DATE_DIFFERENCE = -200;

const COMMENT_SENTENCES = [
  `Does the name Trenton Quarantino tell you anything?`,
  `I thought an Oscar...`,
  `It is sad.`,
  `Actor with a cabbage, but not red.`,
  `Everyone has it in the house.`,
  `Here it is - the film of my dreams, guys!`,
  `There are no fees, but keep on.`,
  `Today, this film is not everyone can watch.`,
  `Not only everyone can watch.`,
  `Few can do this.`,
  `Кто русский?`,
  `2020?`
];

const USER_NAMES = [
  `DarkStranger01`,
  `SomeoneFromTheNet`,
  `GodXXX`,
  `AlexFrostHost`,
  `AmericanDead`
];

let commentID = 1;

const createComment = () => {
  return {
    "id": commentID++,
    "author": getRandomArrayValue(USER_NAMES),
    "comment": getRandomArrayValue(COMMENT_SENTENCES),
    "emotion": getRandomObjectValue(Emotion),
    "date": getRandomDate(RANDOM_DATE_DIFFERENCE)
  };
};

const createMockComments = (count) => {
  const tempMockComments = [];

  for (let i = 0; i < count; i++) {
    tempMockComments.push(createComment());
  }

  return tempMockComments;
};

export default createMockComments;
