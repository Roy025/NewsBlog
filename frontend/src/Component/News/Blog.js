import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = "http://localhost:3001/news/all";

export const Blog = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setposts(response.data);
        console.log(posts);
      })
      .catch((err) => console.log(err));
  }, []);
  const arr = posts.map((post, index) => {
    return (
      
      <tr key={post.id}>
        <th scope="row">{post.id}</th>
        <td>{post.title}</td>
        <td>{post.updatedAt}</td>
        <td><button
            className="btn-update"
            onClick={() => navigate(`/news/blog/id/${post.id}`)}
          >View</button></td>
        </tr>
    );
  });
  if (!posts.length)
    return (
      <div className="text-center font-italic txt-color">
        <h1>No Posts Yet.</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-center text-sm-center txt-color mb-4">Posts</h1>
      <div className="container-fluid">
        <table className="table table-striped table-responsive-sm text-center table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Created At</th>

            </tr>
          </thead>
          <tbody>{arr}</tbody>
        </table>
      </div>
    </div>
  );
};
