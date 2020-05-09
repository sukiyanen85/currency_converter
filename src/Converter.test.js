import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './Converter';
import { render, fireEvent } from '@testing-library/react';
import axiosMock from 'axios';

describe('Test Converter Component', () => {
  it('Converter component is rending', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Converter/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /** Very important use async, because this test has an asyncronus action ( axios request ) **/

  it('Test a Conversion', async  () => {
    const { findByTestId, getByTestId } = render(<Converter />);

    /** Mock Axios request */
    axiosMock.get.mockResolvedValueOnce({
      data: {
        success: true,
        rates: {
          'EUR': '1',
          'GBP': '0.88'
        } 
      }
    });

    /** getByTestId is used when the element is present */
    fireEvent.click(getByTestId('btn-convert'));

    /** findByTestId is used when an asyncronus action need to happen in order to make the action */
    /** Returns a promise */
    const modal = await findByTestId('modal');

    /** Confirm that axiosMock.get was called */
    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    expect(modal).toHaveTextContent('1 EUR = 0.88 GBP');
  });
});


