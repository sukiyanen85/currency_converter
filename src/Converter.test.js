import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './Converter';

test('Converter component is rending', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Converter/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
