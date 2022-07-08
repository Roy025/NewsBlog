import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3001/user/all";
export const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const obj = response.data;
        console.log(obj.data);
        setUsers(obj.data);
        console.log(users);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = users.map((user, index) => {
    return (
      <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>
          {" "}
          <button
            className="btn-update"
            onClick={() => navigate(`/user/profile/${user.username}`)}
          >
            Profile
          </button>
        </td>
      </tr>
    );
  });
  if (!users.length)
    return (
      <div className="text-center font-italic txt-color">
        <h1>No Users Yet.</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-center text-sm-center txt-color mb-4">Users</h1>
      <div className="container-fluid">
        <table className="table table-striped table-responsive-sm text-center table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">UsersName</th>
              <th scope="col">button</th>
            </tr>
          </thead>
          <tbody>{arr}</tbody>
        </table>
      </div>
    </div>
  );
};
