
import React from 'react';
import { Container } from 'reactstrap';
import '../../styles/cartsection.css';

const CartSection = ({title}) => {
  return (
    <section className="cart__section">
      <Container className="text-center">
        <h1>{title}</h1>
      </Container>
    </section>
  )
}

export default CartSection