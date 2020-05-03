export const sortFilmsByRating = (films) => films.slice().sort((filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

export const sortFilmsByCommentsCount = (films) => films.slice().sort((filmA, filmB) => {
  const areCommentsReadA = !filmA.comments.hasOwnProperty(`length`);
  const areCommentsReadB = !filmB.comments.hasOwnProperty(`length`);
  const filmCommentsCountA = areCommentsReadA ? Object.values(filmA.comments).length : filmA.comments.length;
  const filmCommentsCountB = areCommentsReadB ? Object.values(filmB.comments).length : filmB.comments.length;

  return filmCommentsCountB - filmCommentsCountA;
});

export const sortFilmsByDate = (films) => films.slice().sort((filmA, filmB) => new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date));
