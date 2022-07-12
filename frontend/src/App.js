import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./Component/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Component/Home";
import { Login } from "./Component/User/Login";
import { SignUp } from "./Component/User/SignUp";
import { Profile } from "./Component/User/Profile";
import { Blog } from "./Component/News/Blog";
import { Write } from "./Component/News/Write";
import { Users } from "./Component/User/Users";
import { MyBlog } from "./Component/News/MyBlog";
import Update from "./Component/User/Update";
import UpdateNews from "./Component/News/UpdateNews";
import { News } from "./Component/News/News";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* User */}
          <Route exact path="/user/login" element={<Login />} />

          <Route exact path="/user/register" element={<SignUp />} />
          <Route exact path={`/user/profile/:username`} element={<Profile />} />
          <Route exact path="/user/all" element={<Users />} />
          <Route exact path="/user/update/:id" element={<Update />} />

          {/* News */}
          <Route exact path="/news/all" element={<Blog />} />
          <Route exact path="/news/blog/:username" element={<MyBlog />} />
          <Route exact path="/news/write" element={<Write />} />
          <Route exact path="/news/update/:id" element={<UpdateNews />} />
          <Route exact path="/news/blog/id/:id" element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
