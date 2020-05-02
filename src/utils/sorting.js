export const sortFilmsByRating = (films) => films.slice().sort((filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

export const sortFilmsByCommentsCount = (films) => films.slice().sort((filmA, filmB) => {
  const areCommentsLoadedA = !filmA.comments.hasOwnProperty(`length`);
  const areCommentsLoadedB = !filmB.comments.hasOwnProperty(`length`);
  const filmCommentsCountA = areCommentsLoadedA ? Object.values(filmA.comments).length : filmA.comments.length;
  const filmCommentsCountB = areCommentsLoadedB ? Object.values(filmB.comments).length : filmB.comments.length;

  return filmCommentsCountB - filmCommentsCountA;
});

export const sortFilmsByDate = (films) => films.slice().sort((filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date);
