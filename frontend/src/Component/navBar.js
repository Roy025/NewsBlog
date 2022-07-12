import React from "react";
import { useState, useEffect } from "react";

import "../index.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import getCurrentUser from "./auth.services/getCurrentUser";
import { GiNewspaper } from "react-icons/gi";
import { Link, Navigate, useNavigate } from "react-router-dom";
export const NavBar = () => {
   const navigate = useNavigate();
  const currentUser = getCurrentUser();
 const logOut = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("username");
    navigate('/');
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
              {currentUser ? (
                <div className="navbar-nav ms-auto">
                <Nav.Link
                  eventKey="1"
                  as={Link}
                  to={`user/profile/${currentUser}`}
                >
                  Profile
                </Nav.Link>
                <Nav.Link eventKey="2" as={Link} to="/news/all">
                  Blog
                </Nav.Link>
                <Nav.Link eventKey="3" as={Link} to="/user/all">
                  Users
                </Nav.Link>
                <Nav.Link eventKey="4" as={Link} to="/news/write">
                  Write
                </Nav.Link> 
                <Nav.Link eventKey="5" as={Link} to="/" onClick={logOut}>
                  Logout
                </Nav.Link>
                </div>
              ) : (
                <div className="d-flex">
                  <Nav.Link eventKey="6" as={Link} to="/user/register">
                    SignUp
                  </Nav.Link>
                  <Nav.Link eventKey="7" as={Link} to="/user/login">
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
