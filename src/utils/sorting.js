export const sortFilmsByRating = (films) => films.slice().sort((filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

export const sortFilmsByCommentsCount = (films) => films.slice().sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);

export const sortFilmsByDate = (films) => films.slice().sort((filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date);
