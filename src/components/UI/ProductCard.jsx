import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from '../../redux/slices/cartSlice';
import { collection, addDoc, updateDoc, doc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

const ProductCard = ({ item }) => {
    const uid = useSelector(state => state.user.uid);
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const navigateToProduct = () => {
        navigate(`/shop/${item.id}`);
    }

    const addToCart = async () => {
        const newCartItem = {
            itmid: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
            uid: uid,
            quantity: quantity,
        }

        if (uid !== "") {
            const alreadyExists = cartItems.filter(cartItem => cartItem.itmid === item.id);

            if (alreadyExists.length > 0) {
                const existingItem = doc(db, "cart", alreadyExists[0].id);
                await updateDoc(existingItem, {
                    quantity: alreadyExists[0].quantity + quantity
                });
                toast.success("Product updated");
            } else {
                try {
                    const docRef = await collection(db, 'cart');
                    await addDoc(docRef, newCartItem);
                    toast.success("Product added successfully");
                } catch (error) {
                    toast.error("Failed to add cart Item");
                }
            }

            setAddedToCart(true);
        } else {
            navigate('/login');
            toast.error('Please login');
        }
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    return (
        <Col lg='3' md='4' sm='6' className={`col-6 mb-2 ${addedToCart ? 'added-to-cart' : ''}`}>
            <div className="product__item">
                <div className="product_img" onClick={navigateToProduct}>
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
                </div>
                <div className="p-2 product__info">
                    <h3 className="product_name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span className='category'>{item.category}</span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard;
