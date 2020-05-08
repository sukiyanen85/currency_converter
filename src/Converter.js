import React, { useState } from 'react';
import './Converter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import Currencies from './Currencies';


function Converter() {

  const [ amount, setAmount ] = useState('1');
  const [ firstCurrency, setFirstCurrency ]   = useState('EUR');
  const [ secondCurrency, setSecondCurrency ] = useState('GBP');
  const [ showSpinner, setShowSpinner] = useState(false);

  function handleAmount(event){
    const re = /^[0-9]*\.?[0-9]*$/;

    let value = event.target.value;

    // if value is not blank, then test the regex

    if (value === '' || re.test(value)) {
      setAmount(event.target.value);
    }
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

  return (
    <>
        <h1>Converter</h1>
        
        <Alert variant="danger" show={true}>
          Ups! An error occurred, could not fetch the convertion from fixer API
        </Alert>

        <Jumbotron>
          <Form>
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
                <Button variant="success" type="submit">
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

        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Requesting convertion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="success">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Converter;
