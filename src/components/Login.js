import React, {useState} from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.div`
  margin-bottom: 20px;
  display: flex;
  font-size: 3rem;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  max-width: 1080px;
  width: 100%;
  color: purple;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
`;

const InputBox = styled.input`
  display: flex;
  font-size: 24px;
  height: 40px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
  color: purple;
  margin: 5px;
  padding: 0 10px;
`;

const LoginButton = styled.button`
  font-size: 1.5rem;
  max-width: 200px;
  width: 100%;
  height: 50px;
  color: purple;
  margin: 5px;
  font-weight: bold;
  background-color: thistle;
  border: 2px solid black;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(username)
    console.log(password)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <MainWrapper>
      <Logo>HotZone</Logo>
      <InputWrapper>
        <InputBox value={username} placeholder="username" onChange={handleUsernameChange}/>
        <InputBox value={password} placeholder="password" onChange={handlePasswordChange} type="password"/>
        <LoginButton onClick={login}>login</LoginButton>
      </InputWrapper>
    </MainWrapper>
  );
};

export default Login;