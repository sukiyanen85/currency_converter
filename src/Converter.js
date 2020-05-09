import React, { useState } from 'react';
import './Converter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import Currencies from './Currencies';

function Converter() {
  /** Fixer.io Credentials */

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=';
  const FIXER_KEY = '9f9084ab402e69167dd50cde460a8a33';

  /** Component variables */

  const [ amount, setAmount ] = useState('1');
  const [ firstCurrency, setFirstCurrency ]   = useState('EUR');
  const [ secondCurrency, setSecondCurrency ] = useState('GBP');
  const [ showSpinner, setShowSpinner] = useState(false);
  const [ formValidated, setFormValidated ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ showAlert, setAlert ] = useState(false);
  const [ currencyConvertion, setCurrencyConvertion ] = useState('');

  function handleAmount(event){
    const re = /^[0-9]*\.?[0-9]*$/;

    let value = event.target.value;

    // if value is not blank, then test the regex

    if (value === '' || re.test(value)) {
      setAmount(value);
    }
  }

  function closeModal(){
    setShowModal(false);
    setAmount('1');
    setFormValidated(false);
  }

  function handleFirstCurrency(event){
    setFirstCurrency(event.target.value);
  }

  function handleSecondCurrency(event){
    setSecondCurrency(event.target.value);
  }

  function handleSpinner(show){
    setShowSpinner(show);
  }

  function handleConversion(data){
      /** In case the data provided from the API is invalid */
      if(!data || data.success !== true){
        return false;
      }

      const rateFirstCurrency  = data.rates[firstCurrency];
      const rateSecondCurrency = data.rates[secondCurrency];

      return (( 1 / rateFirstCurrency * rateSecondCurrency) * amount).toFixed(2);
  }

  function formSubmited(event){
    event.preventDefault();
    setFormValidated(true);

    if( event.currentTarget.checkValidity() === true) { // If the form is validated
        //TODO Make call to the fixer.io API
        setShowSpinner(true);
        axios.get(FIXER_URL + FIXER_KEY)
          .catch(res => {
              setAlert(true);
          })
          .then(res => {
            const converted = handleConversion(res.data);
            if(converted){
              setAlert(false);
              setCurrencyConvertion(converted);
              setShowModal(true);
            }
            else {
              setAlert(true);
            }
          });

          setShowSpinner(false);
    }
  }

  return (
    <>
        <h1>Converter</h1>
        
        <Alert variant="danger" show={showAlert}>
          Ups! An error occurred, could not fetch the convertion from fixer API
        </Alert>

        <Jumbotron>
          <Form onSubmit={formSubmited} noValidate validated={formValidated}>
            <Form.Row>
              <Col sm="3">
                  <Form.Control type="text" placeholder="0" onChange={handleAmount} value={amount} required />
              </Col>
              <Col sm="3">
                <Form.Control as="select" value={firstCurrency} onChange={handleFirstCurrency}>
                  <Currencies />
                </Form.Control>
              </Col>
              <Col sm="1" className="text-center" style={{ paddingTop:'5px' }}>
                  <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
              </Col>
              <Col sm="3">
              <Form.Control as="select" value={secondCurrency} onChange={handleSecondCurrency}>  
                  <Currencies />
              </Form.Control>
              </Col>
              <Col sm="2">
                <Button variant="success" type="submit" data-testid="btn-convert">
                  <span className={!showSpinner ? 'hidden' : null}>
                    <Spinner animation="border" size="sm"></Spinner>
                  </span>
                  <span show={showSpinner ? 'hidden' : null}>
                    Calcular
                  </span>
                </Button>
              </Col>
            </Form.Row>
           </Form>
        </Jumbotron>

        <Modal show={showModal} onHide={closeModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Requesting convertion</Modal.Title>
          </Modal.Header>
          <Modal.Body>{amount} {firstCurrency} = {currencyConvertion} {secondCurrency}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Converter;
