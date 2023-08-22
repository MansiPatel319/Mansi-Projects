import React from 'react';
import AppContext from './AppContext';
import useIEReducer from './Reducer';

export default function Provider({ children }) {
  const [state, dispatch] = useIEReducer();

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}
