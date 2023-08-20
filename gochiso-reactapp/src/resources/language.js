import english from './languages/english';
import japanese from './languages/japanese';
import strings from './strings';

function getLangValue(value, language) {
  if (language === strings.LANG_ENG) {
    return english[value];
  }
  return japanese[value];
}

export default getLangValue;
