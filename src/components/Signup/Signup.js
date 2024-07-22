import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_USERS_SERVER + '/register';

const Signup = () => {
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    let user = {
      email,
      username,
      password,
      dob,
      country,
      mobile,
      createdOn: new Date()
    };

    try {
      const response = await axios.post(apiBaseUrl, user);
      if (response.status === 200) {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card mt-5" style={{ width: "30rem" }}>
        <ToastContainer />
        <div className="card-body bg-light">
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <Form
            name="sign-up"
            className="sign-up mt-4"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="row">
              <div className="col-xl-6">
                <Form.Item
                  name="username"
                  label="Username"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Required!" }
                  ]}
                >
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-xl-6">
                <Form.Item
                  name="mobile"
                  label="Mobile"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Required!" }
                  ]}
                >
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-xl-12">
                <Form.Item
                  name="email"
                  label="Email"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Required!"  }
                  ]}
                >
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-xl-6">
                <Form.Item
                  name="country"
                  label="Country"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Required!" }
                  ]}
                >
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-xl-6">
                <Form.Item
                  name="dob"
                  label="DOB"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Required!" }
                  ]}
                >
                  <DatePicker
                    selected={dob ? moment(dob, "YYYY-MM-DD").toDate() : null}
                    onChange={(date) => setDob(moment(date).format("YYYY-MM-DD"))}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="form-control form-control-sm"
                  />
                </Form.Item>
              </div>
              <div className="col-xl-12">
                <Form.Item
                  name="password"
                  label="Password"
                  className="mt-2"
                  rules={[
                    { required: true, message:"Required!" }
                  ]}
                >
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="d-grid mt-4">
              <Button type="primary" htmlType="submit" className="btn btn-sm btn-primary">
                Sign up
              </Button>
            </div>
          </Form>
          <div className="text-center mt-2">
            <div style={{ fontSize: "11px" }}>
              Already have an account?{" "}
              <a href="login" style={{ textDecoration: "none" }}>
                    Sign In
                  </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
