import React, { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import axios from "axios";
import { TextField, Typography, Button } from "@mui/material";
import { DataContext } from "../context/DataProvider";

const activeIntial = {
  login: {
    view: "login",
  },
  signup: {
    view: "signup",
  },
};
const LoginScreen = ({ open, setDialogue }) => {
  const [signUpInputs, setInputsUp] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [signInInputs, setInputsIn] = useState({
    email: "",
    password: "",
  });
  const login =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png";

  const [account, setAccount] = useState(activeIntial.login);
  const { setAccount2 } = useContext(DataContext);
  const handleClose = () => {
    setDialogue(false);
    setAccount(activeIntial.login);
  };

  const toggleAccount = () => {
    setAccount(activeIntial.signup);
  };
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/signup", {
      firstName: signUpInputs.firstName,
      lastName: signUpInputs.lastName,
      userName: signUpInputs.userName,
      email: signUpInputs.email,
      password: signUpInputs.password,
      phoneNumber: signUpInputs.phoneNumber,
    });
    const data = await res.data;
    return data;
  };
  const handleChange = (e) => {
    setInputsUp((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (e) => {
    setInputsIn((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // user signup function

  const signUpuser = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) =>  data)
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => {
        handleClose();
      })
      .catch((error) => console.log(error));
    setAccount2(signUpInputs.firstName);
  };

  //sending request to the server for the login

  const LogIn = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email: signInInputs.email,
      password: signInInputs.password,
    });
    if (res.status === 202) {
      console.log("Login Successful");
    } else {
      console.log("Invalid credential from frontend");
    }
    const data = await res.data;
    //console.log(data);
    return data;
  };

  //user signin function

  const userLogin = () => {
    LogIn().then((data) => {
      //console.log("first name : ",data.data.firstName);
      localStorage.setItem('userId',data.data._id);
      setAccount2(data.data.firstName);
      handleClose();
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {account.view === "login" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "90vh",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Typography
                sx={{ fontStyle: "bold", color: "orange" }}
                variant="h2"
              >
                Login
              </Typography>
              <hr />
              <img
                sx={{ height: "30%", width: "30%" }}
                src={login}
                alt="LoginImage"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                autoComplete="email"
                onChange={handleChange2}
                type={"email"}
                required
                name="email"
                value={signInInputs.email}
                label="Enter the Email"
                variant="standard"
              />
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                type="password"
                name="password"
                onChange={handleChange2}
                value={signInInputs.password}
                label="Enter the Password"
                variant="standard"
              />

              <Button
                sx={{
                  textTransform: "none",
                  width: "40%",
                  marginBottom: "10px",
                  backgroundColor: "#FFA500",
                  color: "black",
                }}
                variant="outlined"
                onClick={userLogin}
              >
                Login
              </Button>

              <Button
                sx={{
                  textTransform: "none",
                  width: "40%",
                  marginBottom: "10px",
                  backgroundColor: "#FFA500",
                  color: "black",
                  marginBottom: "20px",
                }}
                variant="outlined"
              >
                Request OTP
              </Button>

              <Typography
                sx={{
                  cursor: "pointer",
                  color: "blueviolet",
                }}
                onClick={toggleAccount}
              >
                New to Flipkart? Create an account
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
              width: "90vh",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Typography
                sx={{ fontStyle: "bold", color: "orange" }}
                variant="h2"
              >
                SignUp
              </Typography>
              <hr />
              <img
                sx={{ height: "30%", width: "30%" }}
                src={login}
                alt="LoginImage"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                name="firstName"
                onChange={handleChange}
                value={signUpInputs.firstName}
                label="First Name"
                variant="standard"
              />
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                name="lastName"
                onChange={handleChange}
                value={signUpInputs.lastName}
                label="Last Name"
                variant="standard"
              />
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                name="userName"
                onChange={handleChange}
                value={signUpInputs.userName}
                label="User Name"
                variant="standard"
              />
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                autoComplete="email"
                onChange={handleChange}
                type={"email"}
                required
                name="email"
                value={signUpInputs.email}
                label="Enter the Email"
                variant="standard"
              />
              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                name="password"
                onChange={handleChange}
                type="password"
                value={signUpInputs.password}
                label="Password"
                variant="standard"
              />

              <TextField
                sx={{
                  marginBottom: "20px",
                }}
                required
                name="phoneNumber"
                onChange={handleChange}
                value={signUpInputs.phoneNumber}
                label="Enter The Phone Number"
                variant="standard"
              />

              <Button
                sx={{
                  textTransform: "none",
                  width: "40%",
                  marginBottom: "10px",
                  backgroundColor: "#FFA500",
                  color: "black",
                }}
                onClick={signUpuser}
                variant="outlined"
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default LoginScreen;
