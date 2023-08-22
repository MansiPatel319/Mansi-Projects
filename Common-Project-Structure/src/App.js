require('dotenv').config();

import React from 'react';
import ToasterComponent from './Components/UI/Toaster';
import Routes from './Routes';
import Provider from './Store/StoreProvider';

function App() {
  return (
    <div>
      <Provider>
        <Routes />
        <ToasterComponent />
      </Provider>
    </div>
  );
}

export default App;
