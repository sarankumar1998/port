import React, { useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Avatar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import axios from "axios";
import "./Login.css";
import { EyeTwoTone } from '@ant-design/icons';
import bgg from "../../assets/bgg.jpg";

const Login = () => {
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const navigate = useNavigate();
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiBaseUrl = process.env.REACT_APP_USERS_SERVER+'/login';

  const onFinish = () => {
    const user = {
      username: username,
      password: password,
    };

    axios
      .post(apiBaseUrl, user)
      .then((response) => {
        console.log("Server response:", response.data);

        if (response.status === 200) {
          toast.success("Successfully logged in");

          const token = response.data.token;
          sessionStorage.setItem("token", token);
          console.log(`token`, token);
          navigate("/home");
        } else {
          console.error("Unexpected response:", response.status, response.data);
          toast.error("An unexpected error occurred. Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.status, error.response.data);
          toast.error("An error occurred. Please check your details and try again.");
        } else {
          console.error("Error:", error);
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-xl-7">
          <img
            src={bgg}
            alt=""
            style={{height:"80vh"}}
            className="login-image"
          />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-5">
          <div className="login-card">
            <ToastContainer />
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  className="mt-4"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control form-control-sm"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="mt-3"
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                    type="password"
                    id="form3Example4"
                    iconrender={<EyeTwoTone />}
                    class="form-control form-control-sm"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Item>

                <a
                                        href="forgot"
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </a>

                <div className="d-grid mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn-primary btn-sm"
                    onClick={navigate}
                  >
                    Sign In
                  </Button>
                </div>

                <div className="text-center mt-2">
                  <div style={{ fontSize: "11px" }}>
                    Don't have an account?{" "}
                    <span>
                      <a
                        href="Signup"
                        style={{ textDecoration: "none", fontSize: "13px" }}
                      >
                        Sign up
                      </a>
                    </span>
                  </div>
                </div>
              </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
