// Constants and utils
import Config from './constants/config';
import render from './utils/render';
// Views
import createProfileTemplate from './views/components/profile/profile';
import createMainNavigationTemplate from './views/components/main-navigation/main-navigation';
import createSortingTemplate from './views/components/sorting/sorting';
import createFilmsTemplate from './views/components/films/films';
import createFilmListTemplate from './views/components/film-list/film-list';
import createFilmCardTemplate from './views/components/film-card/film-card';
import createFilmListShowMoreTemplate from './views/components/film-list-show-more/film-list-show-more';
import createFilmDetailsTemplate from './views/components/film-details/film-details';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmsTemplateChildren = {
  filmList: createFilmListTemplate({
    heading: `All movies. Upcoming`,
    films: createFilmCardTemplate().repeat(Config.FILM_CARDS_COUNT),
    showMoreButton: createFilmListShowMoreTemplate()
  }),
  topRatedFilmList: createFilmListTemplate({heading: `Top rated`, films: createFilmCardTemplate().repeat(Config.EXTRA_FILM_CARDS_COUNT)}, true),
  mostCommentedFilmList: createFilmListTemplate({heading: `Most commented`, films: createFilmCardTemplate().repeat(Config.EXTRA_FILM_CARDS_COUNT)}, true)
};

render(headerElement, createProfileTemplate());
render(mainElement, createMainNavigationTemplate());
render(mainElement, createSortingTemplate());
render(mainElement, createFilmsTemplate(filmsTemplateChildren));
render(document.body, createFilmDetailsTemplate());
