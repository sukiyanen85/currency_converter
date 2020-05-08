import React from 'react';
import './Converter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import Currencies from './Currencies';


function Converter() {
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
                  <Form.Control type="text" placeholder="0" value={1} required />
              </Col>
              <Col sm="3">
                <Form.Control as="select">
                  <Currencies />
                </Form.Control>
              </Col>
              <Col sm="1" className="text-center" style={{ paddingTop:'5px' }}>
                  <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
              </Col>
              <Col sm="3">
              <Form.Control as="select">  
                  <Currencies />
              </Form.Control>
              </Col>
              <Col sm="2">
                <Button variant="success" type="submit">
                  <Spinner animation="border" size="sm"></Spinner>
                  Calcular
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
