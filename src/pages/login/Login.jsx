import "./login.scss";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, clearToken } from "../../reducers/auth.reducer";

import { useLoginMutation } from "../../apiservices/authSlice";

const Login = () => {
  const [logIn, setLogIn] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //.....................SnackBar................................

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    setMessage("");
  };

  //.....................RTK QUERY................................

  const [login] = useLoginMutation();

  // const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleAction = (user, token) => {
    dispatch(setCredentials(user, token));
  };

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
    const { error, data } = await login(logIn);
    if (error) {
      console.log(error.data.message);
      setMessage(error.data.message);
      setState({ vertical: "top", horizontal: "center", open: true });
    } else if (data) {
      console.log(data);
      handleAction({ user: data.user, token: data.tokens.access.token });
      localStorage.setItem("mobile", data.user.number);
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh_token", data.tokens.refresh.token);
      navigate("/");
    } else {
      localStorage.clear();
    }
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

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        // message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
