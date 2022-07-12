import React, { useEffect, useState } from "react";
import ".././../index.css";
import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser from "../auth.services/getCurrentUser";

export const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [objs, setObjs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/profile/${username}`, {
        headers: authHeader(),
      })
      .then((response) => {
        const object = response.data;
        setObjs(object.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const updateProfile = () => {
    setTimeout(() => {
      navigate(`/user/update/${objs.id}`);
    }, 3000);
  };

  const del = async () => {
    try {
      await axios
        .delete(`http://localhost:3001/user/delete/${username}`)
        .then((response) => {
          toast(response.data.status);
          setTimeout(() => {
            navigate("/");
          }, 3000);
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("username");
        });
    } catch (err) {
      toast(err);
    }
  };
  const arr = () => {
    if (objs.username === getCurrentUser()) {
      return (
         <div className="position-absolute bottom-0 end-0">
          <button
            className="zmdi zmdi-edit mr-3"
            onClick={updateProfile}
          >
          </button>
          <button
            className="zmdi zmdi-delete"
            onClick={del}
          >
          </button>
        </div>
      );
    }
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
      <section className="vh-100 pro-1">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3 pro-2">
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white pro-3">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5 pro-4"
                    />
                    <h4 className="name text-dark bold text-center">
                      {objs.name}
                    </h4>
                    <p className="text-muted">{objs.createdAt}</p>

                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div>{arr()}</div>
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <div className="mt-0 mb-4">
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>ID</h6>
                            <p className="text-muted">{objs.id}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>UserName</h6>
                            <p className="text-muted">{objs.username}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-0 mb-4">
                        <div className="row pt-1">
                          <div className="col-6 mb-3 font-weight-bold">
                            <h6>E-mail</h6>
                            <p className="text-muted">{objs.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <a
                              href={`/news/blog/${objs.username}`}
                              className="text-decoration-none"
                            >
                              <h6 className="bold txt-color">Posts</h6>
                            </a>
                          </div>
                        </div>
                      </div>
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
