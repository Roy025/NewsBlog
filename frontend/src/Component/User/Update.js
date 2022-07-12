import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ".././../index.css";
import getCurrentUser from "../auth.services/getCurrentUser";

import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateData, setupdateData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    oldpassword: "",
    message: "",
  });
  const { name, username, email, password, oldpassword, message } = updateData;
  const handleSubmit = (e) => {
    e.preventDefault();
    toast(updateData);
  };
  const handleChange = (e) => {
    const update = e.target.name;
    setupdateData({ ...updateData, [update]: e.target.value });
  };
  const update = async () => {
    try {
      await axios
        .put(
          `http://localhost:3001/user/update/${id}`,
          {
            name: name,
            username: username,
            email: email,
            password: password,
            oldpassword: oldpassword,
            message: message,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          console.log("response   ");
          console.log(response);
          console.log("response.data  ");
          console.log(response.data.username);
          const use = response.data.username;

          if (response.data.message === "Updated Successfully") {
            localStorage.setItem("username", use);
            toast(response.data.message);
            setTimeout(() => {
              navigate(`/user/profile/${use}`);
            }, 3000);
          } else {
            toast(response.data.error);
          }
        })
        .catch((err) => {
          toast("err" + err);
          toast("Error   " + err.request.response);
        });
    } catch (err) {
      if (err.response) {
        toast("Error", err.message);
      }
    }
  };
  const use = getCurrentUser();
  const cancel = () => {
    setTimeout(() => {
      navigate(`/user/profile/${use}`);
    }, 3000);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-80">
          <div className="row d-flex h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0 d-flex align-items-center justify-content-center">
                  <div className="col-xl-6 ">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase fw-bold italic">
                        Update Info
                      </h3>

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
                              required
                              id="email"
                              name="email"
                              type="text"
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
                        {/* <div className="mb-4 form-group">
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
                        </div> */}
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-lock"></i>
                            </div>
                            <input
                              className="form-control"
                              id="oldpassword"
                              name="oldpassword"
                              type="password"
                              placeholder="Old Password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-md-flex justify-content-md-end">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={update}
                          >
                            Update
                          </button>
                          <button className="btn" onClick={cancel}>
                            Cancel
                          </button>
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

export default Update;
