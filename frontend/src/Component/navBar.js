import React from "react";
import { useState, useEffect } from "react";

import "../index.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import getCurrentUser from "./auth.services/getCurrentUser";
import { GiNewspaper } from "react-icons/gi";
import { Link } from "react-router-dom";
export const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    console.log(user);
  }, []);
  const logOut = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("username");
    console.log("Logged Out");
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        bg="color"
        variant="dark"
        sticky="top"
        expand="sm"
      >
        <Container className="navbar-con">
          <Navbar.Brand href="/">
            <div className="name">
              <GiNewspaper className="logo" />
              <h3>NewsBlog</h3>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-links ms-auto">
              <Nav.Link eventKey="1" as={Link} to="/">
                Home
              </Nav.Link>
              {currentUser && (
                <Nav.Link
                  eventKey="2"
                  as={Link}
                  to={`user/profile/${currentUser}`}
                >
                  Profile
                </Nav.Link>
              )}
              {currentUser && (
                <Nav.Link eventKey="3" as={Link} to="/news/all">
                  Blog
                </Nav.Link>
              )}
              {currentUser && (
                <Nav.Link eventKey="4" as={Link} to="/news/myblog">
                  MyBlog
                </Nav.Link>
              )}
              {currentUser && (
                <Nav.Link eventKey="5" as={Link} to="/user/all">
                  Users
                </Nav.Link>
              )}
              {currentUser && (
                <Nav.Link eventKey="6" as={Link} to="/news/write">
                  Write
                </Nav.Link>
              )}
              {currentUser ? (
                <div className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                <div className="d-flex">
                  <Nav.Link eventKey="7" as={Link} to="/user/register">
                    SignUp
                  </Nav.Link>
                  <Nav.Link eventKey="8" as={Link} to="/user/login">
                    Login
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
