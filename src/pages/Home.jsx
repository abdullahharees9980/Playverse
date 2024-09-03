import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import HashLoader from "react-spinners/HashLoader";
import { useSpring, animated } from "@react-spring/web";
import Helmet from "../components/Helmet/Helmet";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";
import "../styles/home.css";

const Home = () => {
  const { data: products, loading: productsLoading } = useGetData("products");
  const { data: sliderData, loading: sliderLoading } = useGetData("slider");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredTrendingProducts = products.filter(
        (item) => item.category.trim() === "Laptops"
      );
      const filteredBestSalesProducts = products.filter(
        (item) => item.category.trim() === "Tablets"
      );
      const filteredMobileProducts = products.filter(
        (item) => item.category.trim() === "Mobile Phones"
      );
      const filteredWirelessProducts = products.filter(
        (item) => item.category.trim() === "Wireless"
      );
      const filteredPopularProducts = products.filter(
        (item) => item.category.trim() === "Popular"
      );

      setTrendingProducts(filteredTrendingProducts);
      setBestSalesProducts(filteredBestSalesProducts);
      setMobileProducts(filteredMobileProducts);
      setWirelessProducts(filteredWirelessProducts);
      setPopularProducts(filteredPopularProducts);
    }
  }, [products]);

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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <Helmet title={"Home"}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <HashLoader loading={productsLoading || sliderLoading} size={40} color="#36d7b7" />
      </div>

      {/* Desktop Slider */}
      <animated.section style={fadeIn} className="slider_section desktop-slider">
        <Slider {...sliderSettings}>
          {sliderData.map((slider, index) => (
            <Link to="/shop" key={`slider${index}`}>
              <div>
                <img src={slider.imgUrl} alt={`Slider ${index}`} />
              </div>
            </Link>
          ))}
        </Slider>
      </animated.section>

      {/* Mobile Slider */}
      <animated.section style={fadeIn} className="slider_section mobile-slider">
        <Slider {...sliderSettings} slidesToShow={1} slidesToScroll={1}>
          {sliderData.map((slider, index) => (
            <Link to="/shop" key={`mobile-slider${index}`}>
              <div>
                <img src={slider.imgUrl} alt={`Mobile Slider ${index}`} />
              </div>
            </Link>
          ))}
        </Slider>
      </animated.section>

      <Services />

      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Mobile Phones</h2>
            </Col>
            {productsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HashLoader loading={productsLoading} size={40} color="#36d7b7" />
              </div>
            ) : (
              <animated.div style={fadeIn}>
                <ProductsList data={mobileProducts} />
              </animated.div>
            )}
          </Row>
        </Container>

        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Laptops</h2>
            </Col>
            {productsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HashLoader loading={productsLoading} size={40} color="#36d7b7" />
              </div>
            ) : (
              <animated.div style={fadeIn}>
                <ProductsList data={trendingProducts} />
              </animated.div>
            )}
          </Row>
        </Container>

        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Headphones</h2>
            </Col>
            {productsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HashLoader loading={productsLoading} size={40} color="#36d7b7" />
              </div>
            ) : (
              <animated.div style={fadeIn}>
                <ProductsList data={wirelessProducts} />
              </animated.div>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
