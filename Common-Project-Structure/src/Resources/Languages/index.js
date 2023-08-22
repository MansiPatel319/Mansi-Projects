import React, { useContext } from 'react';
import AppContext from '../../Store/AppContext';
import textResource from './Language.json';

export const convertText = (key) => {
  const [state] = useContext(AppContext);
  const { lang } = state;
  return textResource[`${key}.${lang}`];
};

const FormatText = ({ text }) => {
  const [state] = useContext(AppContext);
  const { lang } = state;
  return <>{textResource[`${text}.${lang}`]}</>;
};
export default FormatText;
