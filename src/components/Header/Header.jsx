import React, { useRef, useEffect, useState } from "react";
import logoImage from "../UI/Screenshot 2024-08-19 171422.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import useAuth from "../../custom-hooks/useAuth";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { userActions } from "../../redux/slices/userSlice";
import { cartActions } from "../../redux/slices/cartSlice";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Import arrow icons

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "Shop",
    display: "Games",
  },
  {
    path: "ordergames",
    display: "Order Games",
  },
  
];

const Header = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const uid = useSelector((state) => state.user.uid);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userActions.deleteUser({}));
        dispatch(cartActions.clearCart({}));
        toast.success("Logged Out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  // Function to navigate to the previous page
  const navigateLeft = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to navigate to the next page
  const navigateRight = () => {
    navigate(1); // Go forward to the next page
  };

  return (
    <header className="header" ref={headerRef}>
      <div style = {{ 'background' : '#000000', margin : 0, padding : '20px', width : '100%'}}>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <div>
                <h1>
                  <Link to={"./home2"}>
                    <img src={logoImage} alt="Logo" />
                  </Link>
                </h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              {/* Left Arrow Icon */}
              <div className="nav_arrow" onClick={navigateLeft}>
                <RiArrowLeftSLine size={24} />
              </div>

              {/* Profile Dropdown Placeholder */}
              <div className="profile">
                {/* Profile Dropdown logic */}
              </div>

              {/* Right Arrow Icon */}
              <div className="nav_arrow" onClick={navigateRight}>
                <RiArrowRightSLine size={24} />
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </header>
  );
};

export default Header;
