import React, { useEffect, useState } from "react";
import ".././../index.css";
import axios from "axios";
import authHeader from "../auth.services/authHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser from "../auth.services/getCurrentUser";


export const News = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [objs, setObjs] = useState([]);
  useEffect(() => {

    axios
      .get(`http://localhost:3001/news/blog/id/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        const object = response.data;
        setObjs(object.data);
        console.log(objs)
      })
      .catch((err) => console.log(err));
  }, []);const del = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:3001/news/delete/${id}`, {
          headers: authHeader(),
        })
        .then((response) => {
          toast(response.data.status);
          setTimeout(() => {navigate(`/news/blog/${objs.username}`);}, 3000);
        })
        .catch((err) => {
          toast(err);
        });
    } catch (err) {
      toast(err);
    }
  };
  const button = (id) => {
    if (objs.username === getCurrentUser()) {
      return (
        <div>
          <button
            className="zmdi zmdi-edit mr-3"
            onClick={() => navigate(`/news/update/${id}`)}
          >
          </button>
          <button
            className="zmdi zmdi-delete"
            onClick={() => {
              del(id);
            }}
          >
          </button>
        </div>
      );
    }
  };
  return (
    <section className="py-5 pro-1">
    <div className="container ">
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <header className="text-center pb-5">
                    <h1 className="h2">{objs.title}</h1>
                </header>
            </div>
        </div>


        <div className="row">
            <div className="col-lg-6 mx-auto">
                <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
       <div className="position-absolute top-0 end-0">{button(objs.id)}</div>
                    <div className="blockquote-custom-icon bg-info shadow-sm"><i className="zmdi zmdi-quote text-white"></i></div>
                    <p className="mb-0 mt-2 font-italic">{objs.body}</p>
                    <footer><p className="blockquote-footer pt-4 mt-4 border-top italic">{objs.username}</p>
                    </footer>
                </blockquote>

            </div>
        </div>
    </div>
</section>
  )
}
