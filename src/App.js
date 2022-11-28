import React from "react";
import { BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./pages/Login";
import Layout from './Layout/Main';

const App = () => {
  return (
    <Router>
          <Routes>
               <Route exact path="/" element={<Login />} />
          </Routes>
          <Layout>
            <Routes>
                <Route exact path="/login" element={<Login />} />
            </Routes>
          </Layout>
    </Router>
  );
};
export default App