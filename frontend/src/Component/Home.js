import Button from "react-bootstrap/Button";
import React from "react";
import '../index.css'
import { GiNewspaper } from "react-icons/gi";

export const Home = () => {
  return (
    <>
      <section className="masthead d-flex align-items-center bg-text position-absolute top-50 start-50 translate-middle">
            <div className="container px-4 px-lg-5 text-center">
              <div className="name">
              <GiNewspaper className="logo" />
              <h1>NewsBlog</h1>
            </div>
                
            </div>
        </section>
    </>
  );
};
