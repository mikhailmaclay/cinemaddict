// Constants and utils
import {getRandomNumberFromRange} from '../utils/randomizers';
import {getRandomArrayValue} from '../utils/randomizers';
import {getRandomDate} from '../utils/date';
import {castLots} from '../utils/randomizers';

const DESCRIPTION_SENTENCES = [
  `In a world where there is no place for justice, it’s hard to find the strength to stand up against the wheel of fate.`,
  `The famous duck in a hurry to help his friends.`,
  `Jailbreak has never been so epic.`,
  `Murders and sexual abuse fill the screen while watching.`,
  `Happiness is accessible to everyone!`,
  `The superhero decided to get a job.`,
  `The reason for this is large taxes.`,
  `No one expected this, but he surprised everyone.`,
  `He will meet the needs day after day.`,
  `But what will happen when he becomes an adult?`,
  `The streets of the city were empty.`
];

const FILM_TITLES = [
  `Shawshank's Eleven`,
  `Daddy Effect`,
  `Froppered`,
  `Runaway Fiesta`,
  `Some Like VAZ`,
  `Connie and Blade`,
  `Beggary`,
  `American Tele`,
  `No Country for Bailiff`,
  `Own`,
  `Boondock Sinners`,
  `Forward to the Past`,
  `Stranger Stuff`,
  `Immutable`,
  `Walking Mad`
];

const POSTERS = [
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`
];

const DIRECTORS = [
  `Sam Damon`,
  `Saira Sucks`,
  `Rice Xanax`,
  `Sadam Andler`,
  `Sugar Alikov`
];

const WRITERS = [
  `Trenton Quarantino`,
  `Sepsis Cort Poppola`,
  `Scartin Morteze`,
  `Helmut Alchcock`,
  `Laup Dreader`
];

const ACTORS = [
  `Sylvester In-The-Dining-Room`,
  `Boris Low-Cost-Cocoa`,
  `John Two-Bolts`,
  `Bruce Washis`,
  `Morgan Busyman`,
  `Gary Starikov`,
  `Arnold Black-Mountain`,
  `Emma Kamneva`,
  `Burger-King Camembert-Daughter`,
  `Tilda Windows`
];

const COUNTRIES = [
  `Krakozh`,
  `Wadiya`,
  `Russia`,
  `USA`,
  `United Kingdom`
];

const GENRES = [
  `Drama`,
  `Anime`,
  `Comedy`,
  `Fantasy`,
  `Horror`
];

const DateDifference = {
  RELEASE_DATE: -10000,
  WATCH_DATE: -365
};

const Limit = {
  GENRES: [1, 4],
  DESCRIPTION: 3,
  RUNTIME: [20, 180],
  DATE: [new Date(1930, 0), new Date()],
  RATING: [3, 10],
  COMMENTS: [0, 15],
  WRITERS: 2,
  ACTORS: [2, 4],
  AGE_RATING: [0, 18]
};

let filmID = 1;

const createGenres = () => {
  const tempGenres = [];
  const [minGenresCount, maxGenresCount] = Limit.GENRES;

  for (let i = 0; i < Math.min(GENRES.length, getRandomNumberFromRange(minGenresCount, maxGenresCount)); i++) {
    tempGenres.push(getRandomArrayValue(GENRES, tempGenres));
  }

  return tempGenres;
};

const createWriters = () => {
  const tempWriters = [];

  for (let i = 0; i < Math.min(WRITERS.length, Limit.WRITERS); i++) {
    tempWriters.push(getRandomArrayValue(WRITERS, tempWriters));
  }

  return tempWriters;
};

const createActors = () => {
  const tempActors = [];
  const [minActorsCount, maxActorsCount] = Limit.ACTORS;

  for (let i = 0; i < Math.min(ACTORS.length, getRandomNumberFromRange(minActorsCount, maxActorsCount)); i++) {
    tempActors.push(getRandomArrayValue(ACTORS, tempActors));
  }

  return tempActors;
};

const createDescription = () => {
  const tempDescription = [];

  for (let i = 0; i < Math.min(DESCRIPTION_SENTENCES.length, Limit.DESCRIPTION); i++) {
    tempDescription.push(getRandomArrayValue(DESCRIPTION_SENTENCES, tempDescription));
  }

  return tempDescription.join(` `);
};

const createMockFilm = () => {
  const filmTitle = getRandomArrayValue(FILM_TITLES);
  const [minAgeRating, maxAgeRating] = Limit.AGE_RATING;
  const [minRating, maxRating] = Limit.RATING;
  const [minRuntime, maxRuntime] = Limit.RUNTIME;
  const [minCommentsCount, maxCommentsCount] = Limit.COMMENTS;

  return {
    "id": filmID++,
    "comments": new Array(getRandomNumberFromRange(minCommentsCount, maxCommentsCount)),
    "film_info": {
      "title": filmTitle,
      "alternative_title": filmTitle,
      "total_rating": getRandomNumberFromRange(minRating, maxRating),
      "poster": getRandomArrayValue(POSTERS),
      "age_rating": getRandomNumberFromRange(minAgeRating, maxAgeRating),
      "director": getRandomArrayValue(DIRECTORS),
      "writers": createWriters(),
      "actors": createActors(),
      "release": {
        "date": getRandomDate(DateDifference.RELEASE_DATE),
        "release_country": getRandomArrayValue(COUNTRIES)
      },
      "runtime": getRandomNumberFromRange(minRuntime, maxRuntime),
      "genre": createGenres(),
      "description": createDescription()
    },
    "user_details": {
      "personal_rating": getRandomNumberFromRange(minRating, maxRating),
      "watching_date": getRandomDate(DateDifference.WATCH_DATE),
      "watchlist": castLots(),
      "already_watched": castLots(),
      "favorite": castLots()
    }
  };
};

const createMockFilms = (count) => {
  const tempMockFilms = [];

  for (let i = 0; i < count; i++) {
    tempMockFilms.push(createMockFilm());
  }

  return tempMockFilms;
};

export default createMockFilms;
