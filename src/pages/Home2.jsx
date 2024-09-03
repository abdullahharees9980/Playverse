import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "../styles/shop.css";
import "../styles/home.css";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";
import Services from "../services/Services";
import { HashLoader } from "react-spinners";

const Shop = () => {
  const { data: productsData, loading: productsLoading } =
    useGetData("gameproducts");
  const { data: sliderData, loading: sliderLoading } = useGetData("slider");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sWidth, setSWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setSWidth(window.innerWidth);
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
      setFilteredProducts(productsData);

      // Extracting unique categories from products data
      const uniqueCategories = [
        ...new Set(productsData.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [productsData]);

 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Helmet title="Shop">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HashLoader
          loading={productsLoading || sliderLoading}
          size={40}
          color="#36d7b7"
        />
      </div>

      <section className="slider-wrapper">
        <Slider {...sliderSettings} className="custom-slider">
          {sliderData.map((slider, index) => (
            <Link to="/shop" key={`slider${index}`} className="slick-slide">
              <div>
                { sWidth < 576 ? (
                  <img
                    src={slider.imgUrlMobile}
                    alt={`Slider ${index}`}
                    className="slick-slide-image img-fluid"
                  />
                ) : (
                  <img
                    src={slider.imgUrl}
                    alt={`Slider ${index}`}
                    className="slick-slide-image img-fluid"
                  />
                )}
              </div>
            </Link>
          ))}
        </Slider>
        <Services />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
            <center>
            <h1 className="games">GAMES</h1>
            </center>
              
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0 fade-in">
        <Container>
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HashLoader loading={productsLoading} size={40} color="#36d7b7" />
            </div>
            <ProductsList data={filteredProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
