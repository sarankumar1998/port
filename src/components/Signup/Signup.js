import React, { Component, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"; // Import the moment library
import axios from "axios";

const Signup = () => {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState("");
  const [bday, setBday] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("");


  let nombres = ["Ivan", "Dragmon", "Guilmon", "Voz Rasposa", "Omar"];

  // const [role, setrole] = useState(nombres);
  // console.log(role);

  // const handleChange = (e) => {
  //        setrole(e.target.value)
  // }

  const onFinish = async () => {
    let user = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      address: address,
      bday: bday,
      mobile: mobile,
      email: email,
      username: username,
      password: password,
      status: true,
      createdOn: new Date()
    };
    try {
      const response = await axios.post(`http://localhost:4000/api/v2/register`, user);
      if (response.status === 200) {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response, "error.response)");
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
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
              className="sign-up mt-4"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className="row">
                <div className="col-xl-6">
                  <Form.Item
                    name="name"
                    label="FirstName"
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
                      value={firstName}
                      onChange={(event) => setfirstName(event.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl-6">
                  <Form.Item
                    name="lastname"
                    label="LastName"
                    className=""
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
                      value={lastName}
                      onChange={(event) => setlastName(event.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl-6">
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
                      type="username"
                      id="form3Example3"
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
                      type="number"

                      className="form-control form-control-sm"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                    />
                  </Form.Item>
                </div>


                <div className="col-xl">
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
                </div>
              </div>

              <div className="mt-4">
                <h5>Personal Info</h5>
                <div className="col-xl-6">
                  {/* <select value={role} onChange={handleChange}>
          {nombres.map((n,e) => (
            <option key={e} >{n}</option>
          ))}
        </select> */}
                  {/* <Form.Item
                  className="mt-2"
                  name="role"
                  label="Role"
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
                    type="role"
                          className="form-control form-control-sm"
                    value={role}
                    onChange={(event) => setrole(event.target.value)}
                  />
                </Form.Item> */}
                </div>

                <div className="row">
                  <div className="col-xl-6">
                    <Form.Item
                      className="mt-2"
                      name="country"
                      label="Country"
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
                        type="country"
                        className="form-control form-control-sm"
                        value={country}
                        onChange={(event) => setcountry(event.target.value)}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-1 col-md" >
                    <Form.Item
                      className="mt-2"
                      name="bday"
                      label="DOB"
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
                      <DatePicker
                        style={{ width: "2rem" }}
                        selected={bday ? moment(bday, "YYYY-MM-DD").toDate() : null}
                        onChange={(date) => setBday(moment(date).format("YYYY-MM-DD"))}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Date"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-xl-6">
                  <Form.Item
                    className="mt-2"
                    name="address"
                    label="Address"
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
                    <textArea

                      type="text"
                      className="form-control form-control-sm"
                      value={address}
                      name="address"
                      onChange={(event) => setaddress(event.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-6">
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
                </div>
              </div>



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
