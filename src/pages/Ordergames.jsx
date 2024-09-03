import React, { useState } from "react";
import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { motion } from "framer-motion";
import "../styles/orderGameForm.css";
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderGameForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",  // Changed from email to phone
    gameTitle: "",
    platform: "",
    quantity: 1,
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "gameorders"), formData);
      console.log("Order Submitted", formData);
      toast.success("Order sent successfully!");
      // Optionally, reset form fields here
      setFormData({
        name: "",
        phone: "",  // Changed from email to phone
        gameTitle: "",
        platform: "",
        quantity: 1,
        address: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending order.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="6" md="8">
          <motion.h2
            className="form-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Order Your Game
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            className="order-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FormGroup>
              <Label for="name">Name</Label>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label> {/* Changed from Email to Phone */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Input
                  type="tel"  // Changed type from email to tel
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </FormGroup>
            <FormGroup>
              <Label for="gameTitle">Game Title</Label>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="gameTitle"
                  id="gameTitle"
                  placeholder="Enter the game title"
                  value={formData.gameTitle}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </FormGroup>
            <FormGroup>
              <Label for="platform">Platform</Label>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Input
                  type="select"
                  name="platform"
                  id="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Platform</option>
                  <option value="PC">PC</option>
                  <option value="PlayStation">PlayStation</option>
                </Input>
              </motion.div>
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Input
                  type="textarea"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </FormGroup>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button type="submit" color="primary" block>
                Submit Order
              </Button>
            </motion.div>
          </motion.form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default OrderGameForm;
