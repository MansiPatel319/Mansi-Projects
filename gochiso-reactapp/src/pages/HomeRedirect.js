import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomeRedirect() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  useEffect(() => {
    setTimeout(() => {
      history.push(`/${lang}/`);
    }, 300);
  }, []);

  return <></>;
}

export default HomeRedirect;
