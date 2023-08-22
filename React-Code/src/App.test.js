//import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
