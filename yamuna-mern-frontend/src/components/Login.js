import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './index.css'
import { ButtonComponent } from './commonfiles/button';
import { TextInput } from './commonfiles/textinput';

export function hasWhiteSpace(input) {
  return input.indexOf(' ') >= 0;
}
export let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const Login = () => {
  const navigate = useNavigate();
  const [emailInput, setemailInput] = useState('');
  const [password, setPassword] = useState('');
  const [disableLoginButton, setdisableLoginButton] = useState(true);

  const handleLogin = async (e) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username: emailInput, password: password });
      console.log(response.data);
      localStorage.setItem('UserName', emailInput)
      navigate("/employee");

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  //onchange functions
  const onChangeEmail = (email) => {
    setemailInput(email);
    checkForValidFields(email, password);
  }

  const onChangepassword = (passwordtext) => {
    setPassword(passwordtext);
    checkForValidFields(emailInput, passwordtext);
  }

  // Validations
  const checkForValidFields = (email, password) => {
    let boolVal =
      (reg.test(email)) &&
      !hasWhiteSpace(email) &&
      password?.length > 0 &&
      email?.length > 0 &&
      !hasWhiteSpace(password);
    setdisableLoginButton(!boolVal);
  };
  return (


    <div className="loginscreencontainer">
      <div className="face-con">
        <h1 className="facebook-heading" style={{ fontFamily: 'serif', color: '#0062ff', fontSize: 45 }}>DEALSDRAY</h1>
      </div>
      <div className="loginscreencontainer2" style={{ width: '30%', height: '50%' }}>
        <h1 className="loginheading" >Log in to DEALSDRAY</h1>
        <TextInput
          heading='Email'
          type='text'
          placeholder='Enter email'
          value={emailInput}
          onchangefunction={onChangeEmail}
        />
        <TextInput
          heading='Password'
          type='text'
          placeholder='Enter password'
          value={password}
          onchangefunction={onChangepassword}
        />

        <br />
        <ButtonComponent
          title='Login'
          onClickFunction={handleLogin}
          isdisable={disableLoginButton}
        />




      </div>
    </div>
  );
};

export default Login;



{/* <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>User Name:</label>
          <input type="text" value={emailInput} onChange={(e) => setemailInput(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <input
                className="commontextinpustyle"
                onChange={(event) => onChangeEmail(event.target.value)}
                value={emailInput}
                type={'text'}
                placeholder={'Enter email'}
            />
            <input
                className="commontextinpustyle"
                onChange={(event) => onChangeEmail(event.target.value)}
                value={emailInput}
                type={'text'}
                placeholder={'Enter email'}
            />
        <button onClick={handleLogin} type="submit">Login</button>
      </form>
    </div> */}