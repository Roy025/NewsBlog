import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ".././../index.css";
import getCurrentUser from "../auth.services/getCurrentUser";

import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Updateposts, setUpdateposts] = useState({
    title: "",
    body: "",
  });
  const { title, body } = Updateposts;
  const handleSubmit = (e) => {
    e.preventDefault();
    toast(Updateposts);
  };
  const handleChange = (e) => {
    const update = e.target.name;
    setUpdateposts({ ...Updateposts, [update]: e.target.value });
  };

  const update = async () => {
    try {
      await axios
        .put(
          `http://localhost:3001/news/update/${id}`,
          {
            title: title,
            body: body,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          console.log("response   ");
          console.log(response);
          console.log("response.data  ");
          console.log(response.data);

          if (response.data.message === "Updated Succesfully") {
            toast(response.data.message);
            cancel();
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
  const cancel = () => {
    const username = getCurrentUser();
    setTimeout(() => {
      navigate(`/news/blog/id/${id}`);
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
      <section className="pro-1">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0 row">
              <div className="card mb-3 pro-2 txt-color">
                <h1>Update News</h1>

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
                      onClick={update}
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

export default UpdateNews;
