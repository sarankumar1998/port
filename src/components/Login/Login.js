import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Grid, Paper, TextField, Button, Link, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../slice/LoginSlice";
import background from "../../assets/ship.jpg";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Fade } from "react-awesome-reveal";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = (event) => {
    event.preventDefault();
    const user = { username, password };
    dispatch(loginRequest({ ...user, navigate }));
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={10} className="login-paper">
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Grid>
          
          <form onSubmit={onFinish} className="login-form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="forgot" variant="body2" style={{ color: "grey", textDecoration: "none", marginBottom: "1rem", textAlign:"left" }}>
              Forgot password?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
            >
              Sign In
            </Button>
            <Grid container justifyContent="center" className="mt-4">
              <Grid item>
                <Link href="Signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

          </form>
          <ToastContainer />
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
