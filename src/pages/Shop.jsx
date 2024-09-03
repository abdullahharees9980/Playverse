import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import ProductsList from '../components/UI/ProductsList';
import useGetData from '../custom-hooks/useGetData';
import { HashLoader } from "react-spinners";
import { motion } from 'framer-motion';

const Shop = () => {
  const { data: productsData, loading } = useGetData('gameproducts');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      // Extracting unique categories from products data
      const uniqueCategories = [...new Set(productsData.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [productsData]);

  const handleFilter = e => {
    const filterValue = e.target.value.toLowerCase();
    if (filterValue === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item => item.category.toLowerCase() === filterValue);
      setFilteredProducts(filtered);
    }
  };

  const handleSortBy = e => {
    const sortValue = e.target.value.toLowerCase();
    if (sortValue === 'ascending') {
      const sorted = [...filteredProducts].sort((a, b) => a.price - b.price);
      setFilteredProducts(sorted);
    } else if (sortValue === 'descending') {
      const sorted = [...filteredProducts].sort((a, b) => b.price - a.price);
      setFilteredProducts(sorted);
    } else {
      // Revert to original state
      setFilteredProducts(products);
    }
    setSortBy(sortValue);
  };

  const handleSearch = e => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm));
    setFilteredProducts(searchedProducts);
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Games' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <motion.div 
                className="search__box"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <input type="text" placeholder="Search......" onChange={handleSearch} />
                <span><i className="ri-search-eye-line"></i></span>
              </motion.div>
            </Col>
            <Col lg='3' md='6'>
              <motion.div 
                className="filter__widget"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <select onChange={handleFilter}>
                  <option value="all">All</option>
                  {categories.map(category => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
              </motion.div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <motion.div 
                className="filter__widget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <select onChange={handleSortBy}>
                  <option className='sortny'>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HashLoader loading={loading} size={40} color="#36d7b7" />
            </div>
            <ProductsList data={filteredProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
