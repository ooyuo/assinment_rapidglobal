import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import ProductList from "./ProductList";

const HomeContainer = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginButton = styled.button`
  background: none;
  width: 250px;
  font-size: 35px;
  border: 1px sloid lightblue;
  border: 1px solid lightblue;
  padding: 20px;
  color: gray;
  font-weight: lighter;
  text-decoration-line: none;

  &:hover {
    cursor: pointer;
    background-color: aliceblue;
  }
`;

function Home() {
  const location = useLocation();

  return (
    <>
      <HomeContainer>
        {!location.state ? <Login /> : <ProductList />}
      </HomeContainer>
    </>
  );
}

export default Home;
