import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./Component/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Component/Home";
import { Login } from "./Component/Login";
import { SignUp } from "./Component/SignUp";
import { Profile } from "./Component/Profile";
import { Blog } from "./Component/Blog";
import { Write } from "./Component/Write";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/" element={<Home />} />
          <Route exact path="/user/register" element={<SignUp />} />
          <Route exact path="/user/profile" element={<Profile />} />
          <Route exact path="/user/write" element={<Write />} />
          <Route exact path="/user/all" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
