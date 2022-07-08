import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ".././../index.css";
import getCurrentUser from "../auth.services/getCurrentUser";
export const Write = () => {
  const [posts, setPosts] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();
  const { title, body } = posts;
  const posted = async () => {
    try {
      await axios
        .post(
          "http://localhost:3001/news/post",
          {
            title: title,
            body: body,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          toast(response.data.success);
          if (response.data === "News Posted") {
            toast(response.data);
            cancel();
          } else if (response.data.success === false) {
            toast(response.data.message);
          }
        })
        .catch((err) => {
          toast(err);
        });
    } catch (err) {
      toast(err);
    }
  };
  const cancel = () => {
    const username = getCurrentUser();
    setTimeout(() => {
      navigate(`/news/blog/${username}`);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const post = e.target.name;
    setPosts({ ...posts, [post]: e.target.value });
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
      <section className="pro-1">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0 row">
              <div className="card mb-3 pro-2 txt-color">
                <h1>Post News</h1>

                <form action="" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control  mb-3"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      autoComplete="off"
                      placeholder="Description"
                      className="form-control  mb-3"
                      name="body"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-default mr-3"
                      onClick={posted}
                    >
                      Create
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
      </section>
    </>
  );
};
