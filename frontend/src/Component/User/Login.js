import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [alert, setAlert] = useState(null);

  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { username, password } = loginData;
  const login = async () => {
    try {
      await axios
        .post("http://localhost:3001/user/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.error);
          localStorage.setItem("accesstoken", response.data.token);
          localStorage.setItem("username", response.data.username);

          if (response.data.success === false) {
            toast(response.data.message);
            setAlert(response.data.message);
          } else if (response.data.status === "Logged In") {
            toast(response.data.status);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            toast(response.data.error);
          }
        })
        .catch((err) => {
          toast(err);
        });
    } catch (err) {
      toast(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const log = e.target.name;
    setloginData({ ...loginData, [log]: e.target.value });
  };
  return (
    <>
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-grid justify-content-center">
                    <img
                      src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
                      alt="Sample photo"
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase fw-bold">LogIn</h3>

                      <form onSubmit={handleSubmit}>
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

                        <div className="d-md-grid justify-content-md-end">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={login}
                          >
                            Login
                          </button>
                          <p className="forgot-password text-right mt-2">
                            Don't have an account?
                            <a href="/user/register">Register </a>
                          </p>
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
