function createFilmsTemplate(children) {
  const {filmList, topRatedFilmList, mostCommentedFilmList} = children;

  return (
    `<section class="films">${filmList}${topRatedFilmList}${mostCommentedFilmList}</section>`
  );
}

export default createFilmsTemplate;
