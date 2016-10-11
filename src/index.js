import Validator from './validator';
import { register } from './utils/maps';
import mixin from './mixin';
import directive from './directive';
import ErrorBag from './errorBag';

// eslint-disable-next-line
const install = (Vue, {locale = 'en', delay = 0, errorBagName = 'errors', dictionary = null} = {}) => {
  if (dictionary) {
    Validator.updateDictionary(dictionary);
  }

  Validator.setDefaultLocale(locale);

  const options = {
    locale,
    delay,
    dictionary,
    errorBagName
  };

  Object.defineProperties(Vue.prototype, {
    $validator: {
      get() {
        return register(this);
      }
    }
  });

  Vue.mixin(mixin(options)); // Install Mixin.
  Vue.directive('validate', directive(options)); // Install directive.
};

export default {
  install,
  Validator,
  ErrorBag
};
