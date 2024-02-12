import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Form } from "antd";
import Navbars from "../Navbars";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useContext } from "react";
import { AppContext } from "../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const apiBaseUrl = 'http://localhost:4000/api/v1/profile/users'
const apiBaseUrl2 = 'http://localhost:4000/api/v2/profile/update'



export default function Myprofile() {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const { usersVal } = useContext(AppContext)

  const { id } = JSON.parse(sessionStorage.getItem("user"));
  const stringifiedPerson = sessionStorage.getItem("user");
  const [edit, setEdit] = useState(true);
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [bday, setbday] = useState("");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  const [users, setUsers] = React.useState(personAsObjectAgain);
  const [password, setPassoword] = useState("");
  const [details, setdetails] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    }

  }, [navigate]);

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    await axios
      .get(`${apiBaseUrl}/${id}`)
      .then((res) => {
        setdetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSaved = async (e, id) => {
    e.preventDefault();
    const updateStatus = {
      firstName: firstName || details.firstName,
      lastName: lastName || details.lastName,
      email: email || details.email,
      mobile: mobile || details.mobile,
      country: country || details.country,
      username: username || details.username,
      password: password || details.password,
      bday: bday || details.bday,
      // createdOn: new Date()
      // password: newPass,
    };
    let confirm = window.confirm("Are you sure you want to Edit");

    if (confirm) {
      try {
        const res = await axios.put(`${apiBaseUrl2}/${id}`, updateStatus);
        if (res.status === 200) {
          toast.warning("Updated Successfully");
          setEdit(true);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response, "error.response)");
          toast.error(`Error: ${error.response.data}`);
        } else {
          toast.error("An error occurred while processing your request.");
        }
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChange = (e) => {
    setAnchorEl(null);
    e.preventDefault();
    setEdit(false);
  };

  return (
    <div>
      <Navbars />

      <div
        style={{
          display: "flex",
          marginTop: "7rem",
          padding: "1rem",
          justifyContent: "center",
        }}
      >
        <ToastContainer />
        {/* {details.map((details) => ( */}
        <>
          <Card sx={{ maxWidth: 745 }} style={{ padding: "2rem" }}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={onChange}>Edit</MenuItem>
                  </Menu>
                </IconButton>
              }
              title="Profile"

            />
            <div style={{ marginTop: '-1rem', marginLeft: '2.5%' }}>
              <p>Last Update on: {moment(details.createdOn).format("DD/MM/YYYY")}</p>
            </div>

            <Form name="sign-up" className="sign-up mt-4">
              <div className="row">
                <div className="col-xl-6">
                  <Form.Item
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
                      style={{ fontSize: "1rem" }}
                      type="firstName"
                      disabled={edit}
                      onChange={(e) => setfirstName(e.target.value)}
                      className="form-control form-control-sm"
                      defaultValue={details.firstName}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl-6">
                  <Form.Item
                    label="LastName"
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
                      style={{ fontSize: "1rem" }}
                      type="lastName"
                      onChange={(e) => setlastName(e.target.value)}
                      disabled={edit}
                      className="form-control form-control-sm"
                      defaultValue={details.lastName}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl-6">
                  <Form.Item
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
                      style={{ fontSize: "1rem" }}
                      disabled={edit}
                      onChange={(e) => setUsername(e.target.value)}
                      defaultValue={details.username}
                      className="form-control form-control-sm"
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-6">
                  <Form.Item
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
                      disabled={edit}
                      style={{ fontSize: "1rem" }}
                      onChange={(e) => setmobile(e.target.value)}
                      className="form-control form-control-sm"
                      defaultValue={details.mobile}
                    />
                  </Form.Item>
                </div>


                <div className="row">
                  <div className="col-xl-6">
                    <Form.Item
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
                        onChange={(e) => setemail(e.target.value)}
                        disabled={edit}
                        style={{ fontSize: "1rem" }}
                        className="form-control form-control-sm"
                        defaultValue={details.email}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl">
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
                        selected={bday ? moment(bday, "YYYY-MM-DD").toDate() : null}
                        onChange={(date) => setbday(moment(date).format("YYYY-MM-DD"))}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={details.bday ? moment(details.bday).format("YYYY-MM-DD") : "Select Date"}
                        showMonthDropdown
                        showYearDropdown
                        disabled={edit}
                        dropdownMode="select"
                      />
                    </Form.Item>
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <h5>Personal Info</h5>
                {/* <div className="col-xl-6">
                  <Form.Item
                    className="mt-2"
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
                      disabled={edit}
                      style={{ fontSize: "1rem" }}
                      className="form-control form-control-sm"
                      defaultValue={details.role}
                    />
                  </Form.Item>
                </div> */}

                <div className="col-xl-6">
                  <Form.Item
                    className="mt-2"
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
                      style={{ fontSize: "1rem" }}
                      disabled={edit}
                      onChange={(e) => setcountry(e.target.value)}
                      className="form-control form-control-sm"
                      defaultValue={details.country}
                    />
                  </Form.Item>
                </div>

  

                {edit === false ? (
                  <div className="mt-4">


                    <Form.Item
                      className="mt-2"
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
                        type=""
                        name={password}
                        onChange={(e) => setPassoword(e.target.value)}
                      />             <button
                        onClick={(e) => onSaved(e, users.id)}
                        className="btn btn-primary btn-sm"
                      >
                        save
                      </button>
                    </Form.Item>



                  </div>
                ) : (
                  ""
                )}
              </div>
            </Form>
          </Card>
        </>
        {/* ))} */}
      </div>
    </div>
  );
}
