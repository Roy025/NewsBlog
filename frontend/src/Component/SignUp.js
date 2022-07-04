import { useState } from "react";
import React from "react";
import instance from "../Api/api";
import axios from "axios";

export const SignUp = () => {
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [signupStatus, setsignupStatus] = useState("");

  const { name, username, email, password, confirmpassword } = signupData;
  const signup = async () => {
    try {
      await axios
        .post(
          "http://localhost:3001/user/register",
          {
            name: name,
            username: username,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
          },
          { withCredentials: true }
        )
        .then((response) => {
          // console.log(response.data);
          setsignupStatus(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      instance.interceptors.response.use(undefined, (err) => {
        console.log(err);
      });
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log(signupData);
        console.log(signupData.username);
        console.log(err.request);
        console.log(err.response);
      } else {
        // Anything else
        console.log("Error", err.message);
      }
    }
  };
  const handleSubmit = (e) => {
    console.log("Submitted");
    console.log(signupData);
    e.preventDefault();
  };
  const handleChange = (e) => {
    const fieldName = e.target.name;
    setsignupData({ ...signupData, [fieldName]: e.target.value });
  };

  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://www.futurefund.com/wp-content/uploads/2021/11/Future_Fund-2021-Website_Assets_Automatic_Registration.png"
                      className="col-12 pic"
                      alt="Sample photo"
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase fw-bold">Register</h3>

                      <form action="" onSubmit={handleSubmit}>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-account"></i>
                            </div>
                            <input
                              className="form-control"
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Name"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-email"></i>
                            </div>
                            <input
                              className="form-control"
                              id="email"
                              name="email"
                              type="email"
                              placeholder="E-mail"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-face"></i>
                            </div>
                            <input
                              className="form-control"
                              id="username"
                              name="username"
                              type="username"
                              placeholder="Username"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-lock"></i>
                            </div>
                            <input
                              className="form-control"
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-lock"></i>
                            </div>
                            <input
                              className="form-control"
                              id="confirmpassword"
                              name="confirmpassword"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-md-grid justify-content-md-end">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={signup}
                          >
                            Register
                          </button>
                          <p className="forgot-password text-right">
                            Already registered? <a href="/login">Login</a>{" "}
                          </p>
                          <h1 className="msg">{signupStatus}</h1>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
