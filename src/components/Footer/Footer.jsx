import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear()
  return( 
  <footer className="footer">
    <Container>
      <Row>
        <Col lg = '4' className='mb-4' md='6'>
        <div className="logo">
                    <div>
                        <h1 className='play'>
                        PlayVerse
                        </h1>   
                    </div>            
                </div>
                <p className="footer__text mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                       Doloremque et laborum recusandae voluptas nesciunt tenetur facere rem perspiciatis. 
                                        
                      </p>        
        </Col>
        <Col lg = '3'  md='3' className='mb-4'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title">Top Catergories</h4>    
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to= '#'>PC games</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to= '#'>PS4 games</Link>
              </ListGroupItem>
              </ListGroup>            
          </div>
        </Col>
        <Col lg = '2' md='3' className='mb-4'>
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Useful Links</h4>    
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to= '/shop'>Shop</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to= '/home2'>Home</Link>
              </ListGroupItem>
              </ListGroup>            
          </div>
        </Col>
        <Col lg = '3' md='3'>
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Contact</h4>    
            <ListGroup className="footer__contact">
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
               <span><i className="ri-map-pin-line"></i></span>
               <p>No 96 Kawdana Road Dehiwela</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i className="ri-phone-line"></i></span>
               <p>+94778275233</p>
               <p>+94701831313</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i className="ri-mail-line"></i></span>
               <p>abdullahharees9980@gmail.com </p>
              </ListGroupItem>

              
              </ListGroup>            
          </div>          
        </Col>
      <Col lg =  '12' className='mb-4'>
        <p className="footer__copyright">Copyright {year} developed by Abdullah Harees.All rights reserved.</p>
      </Col>
      </Row>
    </Container>
  </footer>
  ) 
 
}

export default Footer