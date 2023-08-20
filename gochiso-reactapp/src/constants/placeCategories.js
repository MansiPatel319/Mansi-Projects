import getLangValue from '../resources/language';
import strings from '../resources/strings';

const getPlaceCategories = (lang) => (
  [
    { id: 1, title: getLangValue(strings.SOCIAL_ENTERPRICE, lang), isActive: false },
    { id: 2, title: getLangValue(strings.NATURAL, lang), isActive: false },
    { id: 3, title: getLangValue(strings.FARMERS_MARKET, lang), isActive: false },
    { id: 4, title: getLangValue(strings.FAIRTRADE, lang), isActive: false },
    { id: 5, title: getLangValue(strings.SECONDHAND_GOODS, lang), isActive: false },
    { id: 6, title: getLangValue(strings.PLANT_BASED, lang), isActive: false },
    { id: 7, title: getLangValue(strings.ZERO_WASTE, lang), isActive: false },
    { id: 8, title: getLangValue(strings.GREENGROCER, lang), isActive: false },
    { id: 9, title: getLangValue(strings.TRADITIONAL, lang), isActive: false },
    { id: 10, title: getLangValue(strings.ETHICAL_FASHION, lang), isActive: false },
    { id: 11, title: getLangValue(strings.ETHICAL_COSMETICS, lang), isActive: false },
    { id: 12, title: getLangValue(strings.REPAIR, lang), isActive: false },
    { id: 13, title: getLangValue(strings.RECYCLE, lang), isActive: false },
    { id: 14, title: getLangValue(strings.DOMESTIC_MADE, lang), isActive: false },
    { id: 15, title: getLangValue(strings.GIVES_BACK, lang), isActive: false },
    { id: 16, title: getLangValue(strings.SECONDHAND_APPAREL, lang), isActive: false },
    { id: 17, title: getLangValue(strings.FLEA_MARKET, lang), isActive: false },
    { id: 18, title: getLangValue(strings.RENTAL_SHARE, lang), isActive: false },
    { id: 19, title: getLangValue(strings.EXPERIENCES, lang), isActive: false },
    { id: 20, title: getLangValue(strings.LOCAL, lang), isActive: false },

  ]
);
export const getSustainableCategory = (lang) => (
  [
    { id: 101, title: getLangValue(strings.RESTAURANTS__AND_CAFE, lang), isActive: false },
    { id: 102, title: getLangValue(strings.FOOD, lang), isActive: false },
    { id: 103, title: getLangValue(strings.FASHION, lang), isActive: false },
    { id: 104, title: getLangValue(strings.GENERAL_GOODS, lang), isActive: false },
    { id: 105, title: getLangValue(strings.THREER, lang), isActive: false },
    { id: 106, title: getLangValue(strings.EXPERIENCES, lang), isActive: false },
    { id: 107, title: getLangValue(strings.ACCOMMODATION, lang), isActive: false },
  ]
);
export const getPlaceType = (lang) => (
  [
    { id: 201, name: getLangValue(strings.OFFLINE, lang), is_selected: '0' },
    { id: 202, name: getLangValue(strings.ONLINE, lang), is_selected: '0' },

  ]
);
export const getOwnerType = (lang) => (
  [
    { id: 301, name: getLangValue(strings.YES, lang), label: 1, is_selected: '0' },
    { id: 302, name: getLangValue(strings.NO, lang), label: 0, is_selected: '0' },

  ]
);
export default getPlaceCategories;
