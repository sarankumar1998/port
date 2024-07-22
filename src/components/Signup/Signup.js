import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Paper, Avatar,Link,Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import background from "../../assets/seaship.jpg";
import "./Signup.css";

const apiBaseUrl = process.env.REACT_APP_USERS_SERVER + "/register";

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
      createdOn: new Date(),
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
    <div className="signup-container" style={{ backgroundImage: `url(${background})` }}>
      <Paper elevation={10} className="signup-paper">
        <ToastContainer />
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <Form
          name="sign-up"
          className="signup-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Required!" }]}
              >
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[{ required: true, message: "Required!" }]}
              >
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </Form.Item>
            </Grid>
            <Grid item xs={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Required!" }]}
              >
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: "Required!" }]}
              >
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Item
                name="dob"
                label="DOB"
                rules={[{ required: true, message: "Required!" }]}
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
            </Grid>
            <Grid item xs={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Required!" }]}
              >
                <input
                  type="password"
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Item>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
            >
                Sign up
                </Button>
            </Grid>
        </Form>
        <Grid container justifyContent="center" className="mt-4">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Signup;
