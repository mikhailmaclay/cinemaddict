import {pluralize} from '../../utils/numbers';

const createFooterTemplate = (filmsCount) => {
  return (
    `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      ${filmsCount !== null ? (
      `<section class="footer__statistics">
          ${filmsCount} ${pluralize(filmsCount, [`movie`, `movies`])} inside
        </section>`
    ) : ``}
    </footer>`
  );
};

export default createFooterTemplate;
