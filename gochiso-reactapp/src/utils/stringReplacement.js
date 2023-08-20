/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

const replaceAt = (index, replacement, orgString) =>
  orgString.substr(0, index) +
  replacement +
  orgString.substr(index + replacement.length);

export default replaceAt;
