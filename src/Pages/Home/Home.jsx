import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import './Home.css';
const Home = () => {
  return (
    <div className='hero d-flex align-items-center'>
      <Container>
        <Row>
          <Col className="container">
            <Card className="top">
              <div>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>My Balance</label>
                      <span>$12,34,567</span>
                    </div>
                    <div className="top-row-col">
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} />
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} className="top-row-col-logo2"/>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>.... .... .... 1234</label>
                    </div>
                  </div>
                  
                </Row>
                <Row>
                  
                </Row>
              </div>
            </Card>
          </Col>
          <Col>
            <Card className="top">
              <div>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>My Balance</label>
                      <span>$12,34,567</span>
                    </div>
                    <div className="top-row-col">
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} />
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} className="top-row-col-logo2"/>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>.... .... .... 1234</label>
                    </div>
                  </div>
                  
                </Row>
                <Row>
                  
                </Row>
              </div>
            </Card>
          </Col>
          <Col>
          <Card className="top">
              <div>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>My Balance</label>
                      <span>$12,34,567</span>
                    </div>
                    <div className="top-row-col">
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} />
                      <FontAwesomeIcon icon={faCircle} size="2xl" style={{color:"black"}} className="top-row-col-logo2"/>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="top-row">
                    <div className="top-row-col">
                      <label>.... .... .... 1234</label>
                    </div>
                  </div>
                  
                </Row>
                <Row>
                  
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col className="container">
           
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home


