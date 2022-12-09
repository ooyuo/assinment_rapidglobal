import { QueryClientProvider, useMutation, useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/Login.css";
import img from "../image/main.png";

import React from "react";

const ImageContainer = styled.div``;
const LoginContainer = styled.div`
  display: grid;
  height: 80%;
  width: 80%;
  height: 100vh;
`;

const TextLabel = styled.span`
  padding-right: 20px;
`;

const LoginButton = styled.button`
  margin-top: 50px;
  background: rgba(137, 201, 252, 255);
  width: 300px;
  padding: 20px;
  font-size: 20px;
  border: 1px solid lightgray;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const [clientId, setClientId] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientToken, setClientToken] = useState({});
  const navigate = useNavigate();
  const { isLoading, mutate: getClientToken } = useMutation(
    async () => {
      return await axios.post(
        `http://ec2-52-79-228-35.ap-northeast-2.compute.amazonaws.com:8002/api/v1/auth/login`,
        {
          name: clientId,
          password: clientPassword,
        },
      );
    },
    {
      onSuccess: (res) => {
        console.log(res.data);
        //console.log(setClientToken);
        navigate("/", { state: { clientToken: res.data } });
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  function getToken() {
    try {
      getClientToken();
    } catch (err) {
      console.log(JSON.stringify(err.response?.data));
    }
  }

  return (
    <>
      <LoginContainer>
        <InputContainer>
          <div className="login-container">
            <div className="login-element">
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Id"
                className="input-login"
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name</label>
            </div>
            <div className="login-element">
              <input
                type="text"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
                placeholder="Password"
                className="input-login"
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>

            <LoginButton className="btn-login" onClick={getToken}>
              Login
            </LoginButton>
          </div>
        </InputContainer>
      </LoginContainer>
    </>
  );
}

export default Login;
