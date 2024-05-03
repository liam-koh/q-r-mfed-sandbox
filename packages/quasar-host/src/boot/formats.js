import { boot } from 'quasar/wrappers';
import { date } from 'quasar';

export default boot(async ({ app }) => {
  app.config.globalProperties.$filters = {
    dateFormatDotMin(value) {
      return date.formatDate(value, 'YYYY.MM.DD HH:mm');
    },
  };
});
