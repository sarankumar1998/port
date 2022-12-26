import React, { Component, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    let user = {
      name: name,
      email: email,
      username: username,
      password: password,
      status: true,
    };
    await axios.post(`http://localhost:4000/api/v2/register`, user).then(
      (res) => {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      },
      (err) => {
        if (err) {
          toast.warning("already User exists!");
        }
      }
    );
  };

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-3 col-lg-6 col-xl-7 mt-5">
        {/* <img src={companyLogo} width="110%" id="logo" alt="" /> */}
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div className="card mt-5">
          <ToastContainer />
          <div className="card-body bg-light">
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign Up</h2>
            </Grid>
            {/* start  */}
            <Form
              name="sign-up"
              className="sign-up"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="Name"
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
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="username"
                label="Username"
                className="mt-2"
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
                  className="form-control form-control-sm "
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                className="mt-2"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "9px", color: "red" }}>
                        Please input your Email!
                      </span>
                    ),
                  },
                ]}
              >
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                className="mt-2"
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "9px", color: "red" }}>
                        Please input your Password!
                      </span>
                    ),
                  },
                ]}
              >
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Item>

              <div className="d-grid mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-sm btn-primary"
                >
                  Sign up
                </Button>
              </div>
            </Form>

            {/* end */}

            {/* <div className="forgot-link md-5 d-flex justify-content-between align-items-center">
              <div>
                <Link
                  to="/recaptcha"
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  Reset Password
                </Link>
              </div>
              <div>
                <Link
                  to="/forgot"
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
            </div> */}
            <div className="text-center mt-2">
              <div style={{ fontSize: "11px" }}>
                Already do you have an account ?{" "}
                <span>
                  <a href="login" style={{ textDecoration: "none" }}>
                    Sign In
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
