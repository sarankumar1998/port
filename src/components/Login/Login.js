import React, { useEffect, useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import axios from "axios";
import { EyeTwoTone } from '@ant-design/icons';

const Login = () => {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const navigate = useNavigate();
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    let user = {
      username: username,
      password: password,
    };

    await axios.post(`http://localhost:4000/api/v2/login`, user).then(
      (res) => {
        toast.success("Successfully login");

        const UserData = {
          id: res.data.id
        }

        sessionStorage.setItem("user", JSON.stringify(UserData));
        console.log(res.data, "res");
        navigate("/home");
      },
      (err) => {
        if (err) {

          toast.error("please check your details and try again");
        }
      }
    );
  };

  return (
    <div className="row  justify-content-center align-items-center">
      <div className="col-md-3 col-lg-6 col-xl-7 mt-5">
      </div>
      <div className="col col-sm-5 col-md-4 col-lg-4">
        <div className="card mt-4 ">
          <div className="card-body bg-light">
            <ToastContainer />
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            {/* start */}
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
                  Don't have an account ?{" "}
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
            {/* end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
