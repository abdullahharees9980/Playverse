import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: products } = useGetData('gameproducts');
  const { cartItems } = useSelector((state) => state.cart);

  const docRef = doc(db, 'gameproducts', id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('no product');
      }
    };

    getProduct();
  }, [id]);

  const {
    imgUrl,
    productName,
    price,
    description,
    category,
    stock,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category && item.id !== id);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    const addFeedback = async () => {
      try {
        const feedbackRef = await collection(db, 'feedback');
        await addDoc(feedbackRef, reviewObj);
        toast.success('Review submitted');
      } catch (error) {
        console.error('Error adding feedback: ', error);
        toast.error('Failed to submit review');
      }
    };

    addFeedback();
  };

  const addToCart = async () => {
    if (isToastVisible) return;

    const newCartItem = {
      id,
      productName: product.productName,
      price: product.price,
      imgUrl: product.imgUrl,
      uid: uid,
      quantity: 1,
    };

    if (uid !== '') {
      const alreadyExists = cartItems.filter((cartItem) => {
        return cartItem.productName === product.productName;
      });
      if (alreadyExists.length > 0) {
        const existingItem = doc(db, 'cart', alreadyExists[0].id);
        await updateDoc(existingItem, {
          quantity: alreadyExists[0].quantity + 1,
        });
        toast.success('Product updated');
      } else {
        try {
          const docRef = await collection(db, 'cart');
          await addDoc(docRef, newCartItem);
          toast.success('Product added successfully');
        } catch (error) {
          toast.error('Failed to add cart Item');
        }
      }
    } else {
      navigate('/login');
      toast.error('Please login');
    }

    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <motion.img
                src={imgUrl}
                alt={productName}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </Col>

            <Col lg="6">
              <motion.div
                className="product__details"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>{productName}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">RS: {price}</span>
                  <span>Category: {category}</span>
                  
                </div>
                <p className="mt-3">{description}</p>

                <div>
                  <motion.button 
                    className="buy_btn w-30 mt-3"
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link to="/shop">Continue Browsing</Link>
                  </motion.button>
                </div>

                <div>
                  <motion.button 
                    className="buy_btn w-30 mt-3"
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <a href="https://wa.me/94778275233" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp style={{ marginRight: '8px' }} /> Chat on WhatsApp
                    </a>
                  </motion.button>
                </div>
              </motion.div>
            </Col>

            <Col lg="12" className="mt-5">
              <motion.h2
                className="related__title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                You might also like
              </motion.h2>
            </Col>
            <ProductsList data={relatedProducts} />
           
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <motion.div
                className="desc"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                              </motion.div>

              {tab === 'desc' ? (
                <motion.div
                  className="tab__content mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  
                </motion.div>
              ) : (
                <motion.div
                  className="product__review mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="review__wrapper">
                    <div className="review__form">
                      <h4>Leave your Experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form_group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form_group d-flex align-items-center gap-5 rating_group">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.span
                              key={star}
                              className={`star ${star <= rating ? 'filled' : ''}`}
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(star)}
                            >
                              <i className="ri-star-fill"></i>
                            </motion.span>
                          ))}
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message...."
                            required
                          />
                        </div>
                        <motion.button 
                          whileTap={{ scale: 1.2 }} 
                          type="submit" 
                          className="buy_btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
