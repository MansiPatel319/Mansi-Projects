import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DemoComponent() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  useEffect(() => {
    history.push(`/${lang}/`);
  }, []);

  return <></>;
}

export default DemoComponent;
