import React from "react";
import { useEffect, useState } from "react";
import ".././../index.css";
import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import getCurrentUser from "../auth.services/getCurrentUser";

export const MyBlog = () => {
  const navigate = useNavigate();

  const { username } = useParams();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    myblog();
  }, []);
  const myblog = async () => {
    axios
      .get(`http://localhost:3001/news/blog/${username}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        const obj = response.data;
        console.log(obj.data);
        if (obj.data === "No Posts Yet.") {
          setposts([]);
        } else setposts(obj.data);
        console.log(posts);
      })
      .catch((err) => console.log(err));
  };
  const del = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:3001/news/delete/${id}`, {
          headers: authHeader(),
        })
        .then((response) => {
          toast(response.data.status);
          myblog();
        })
        .catch((err) => {
          toast(err);
        });
    } catch (err) {
      toast(err);
    }
  };
  if (!posts.length)
    return (
      <div className="text-center font-italic txt-color">
        <h1>No Posts Yet.</h1>
      </div>
    );
  const button = (id) => {
    if (username === getCurrentUser()) {
      return (
        <div>
          <button
            className="btn-update"
            onClick={() => navigate(`/news/update/${id}`)}
          >
            Update
          </button>
          <button
            className="btn-delete"
            onClick={() => {
              del(id);
            }}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const arr = posts.map((post, index) => {
    return (
      <tr key={post.id}>
        <th scope="row">{post.id}</th>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td>{post.updatedAt}</td>
        <td>{button(post.id)}</td>
      </tr>
    );
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <h1 className="text-center text-sm-center txt-color mb-4">
          {posts[0].username}
        </h1>
        <div className="container-fluid">
          <table className="table table-striped table-responsive-sm text-center table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
                <th scope="col">Date</th>
                <th>Button</th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
