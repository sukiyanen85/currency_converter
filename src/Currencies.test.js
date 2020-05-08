import React from 'react';
import ReactDOM from 'react-dom';
import Currencies from './Currencies';

test('Currencies component is rending', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Currencies/>, div);
    ReactDOM.unmountComponentAtNode(div);
});