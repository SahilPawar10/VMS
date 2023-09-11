import "./login.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Authentication } from "../../api/visitor/apis";
import { json, useNavigate } from "react-router-dom";
const Login = () => {
  const [logIn, setLogIn] = useState();

  const navigate = useNavigate();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogIn((preveState) => ({
      ...preveState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Api Login");
    Authentication(logIn)
      .then((data) => {
        console.log(data.data.user);
        localStorage.setItem("mobile", data.data.user.number);
        localStorage.setItem("access_token", data.data.tokens.access.token);
        localStorage.setItem("refresh_token", data.data.tokens.refresh.token);
        console.log(data.data.tokens.access.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("user not found");
      });
  };

  return (
    <>
      <div className="div1">
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                type="number"
                placeholder="mobile no"
                className="input1"
                name="mobile"
                onChange={onChange}
              />
              <input
                type="password"
                placeholder="password"
                className="input1"
                name="password"
                onChange={onChange}
              />
              <button className="button1" onClick={handleFormSubmit}>
                login
              </button>
              <p className="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
