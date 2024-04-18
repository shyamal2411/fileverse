import React from "react";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Authentication/Signup";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import FileUpload from "./components/FileUpload/FileUpload";
import FileList from "./components/FileRetrieve/FileList";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/filelist" element={<FileList />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
