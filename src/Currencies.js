import React from 'react';

function Converter() {

  const COUNTRY_CURRENCIES = [
    { "code": "EUR", "description": "Euro" },
    { "code": "GBP", "description": "Pound" },
    { "code": "USD", "description": "US Dolar" },
    { "code": "CAD", "description": "Canadian Dolar" }
  ];

  function order(currency1, currency2){
      if(currency1.description < currency2.description)
          return -1;
      else if(currency1.description > currency2.description )
          return 1;

      return 0;
  }

  return COUNTRY_CURRENCIES.sort(order).map(currency => 
    <option key={currency.code} value={currency.code}>
        {currency.description}
    </option>  
  );
}

export default Converter;
