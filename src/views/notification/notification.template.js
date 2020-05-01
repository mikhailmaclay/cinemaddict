import './notification.styles.scss';

const createNotificationTemplate = (notification) => {
  if (!notification) {
    return ``;
  }

  const {heading, text} = notification;

  return (
    `<div class="notification">
        <div class="notification__container">
            ${heading ? `<b class="notification__heading">${heading}</b>` : ``}
            ${text ? `<p class="notification__text">${text}</p>` : ``}
            <button class="notification__close" type="button">Close</button>
        </div>
    </div>`
  );
};

export default createNotificationTemplate;
