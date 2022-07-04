// import React, { useState } from "react";
// import Axios from "axios";
// import { Routes, Route, useNavigate } from "react-router-dom";

// export const Registration = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     username: "",
//     password: "",
//     confirmpassword: "",
//   });
//   //   const navigate = useNavigate();
//   //   const toLogin = () => {
//   //     navigate("/api/auth/login");
//   //   };

//   const { name, username, email, password, confirmpassword } = user;
//   const register = async () => {
//     try {
//       await Axios.post("http://localhost:3001/user/register", {
//         name: name,
//         username: username,
//         email: email,
//         password: password,
//         confirmpassword: confirmpassword,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleSubmit = (e) => {
//     console.log("Submitted");
//     console.log(user);
//     e.preventDefault();
//   };
//   const handleChange = (e) => {
//     const fieldName = e.target.name;
//     setUser({ ...user, [fieldName]: e.target.value });
//   };

//   return (
//     <div>
//       <div className="form--container">
//         <div className="form--banner">
//           <h3>New User?</h3>
//           <h1>Sign Up Now</h1>
//         </div>
//         <div className="form--main">
//           <form action="" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               autoComplete="off"
//               className="form--input"
//               placeholder="name"
//               name="name"
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               className="form--input"
//               autoComplete="off"
//               placeholder="email"
//               name="email"
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               className="form--input"
//               autoComplete="off"
//               placeholder="username"
//               name="username"
//               onChange={handleChange}
//             />

//             <input
//               type="password"
//               className="form--input"
//               autoComplete="off"
//               placeholder="Password"
//               name="password"
//               required
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               className="form--input"
//               autoComplete="off"
//               placeholder="confirmpassword"
//               name="confirmpassword"
//               required
//               onChange={handleChange}
//             />
//           </form>
//           <button className="button-54" onClick={register}>
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
