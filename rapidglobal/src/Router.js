import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./routers/Home";
import Login from "./routers/Login";
import ModalForProduct from "./routers/ModalForProduct";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/:productId" element={<ModalForProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
