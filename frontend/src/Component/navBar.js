import React from "react";

import "../index.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { GiNewspaper } from "react-icons/gi";
import { Link } from "react-router-dom";
export const NavBar = () => {
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
              <Nav.Link eventKey="1" as={Link} to="/user/">
                Home
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/user/profile">
                Profile
              </Nav.Link>
              <Nav.Link eventKey="3" as={Link} to="/user/all">
                Blog
              </Nav.Link>
              <Nav.Link eventKey="4" as={Link} to="/user/write">
                Write
              </Nav.Link>
              <Nav.Link eventKey="5" as={Link} to="/user/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    // <nav className="navbar-con">
    //   <div className="name">
    //     <GiNewspaper className="logo" />
    //     <h3>NewsBlog</h3>
    //   </div>

    //   <ul className="nav-links">
    //     <Link to="/home">
    //       <li>Home</li>
    //     </Link>
    //     <Link to="/profile">
    //       <li>Profile</li>
    //     </Link>
    //     <Link to="/blog">
    //       <li>Blog</li>
    //     </Link>

    //     <Link to="/Wite">
    //       <li>Write</li>
    //     </Link>
    //     <Link to="/login">
    //       <li>Login</li>
    //     </Link>
    //   </ul>
    // </nav>
  );
};
