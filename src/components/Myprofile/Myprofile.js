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

export default function Myprofile() {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const stringifiedPerson = sessionStorage.getItem("user");
  const [edit, setEdit] = useState(true);
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");

  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  const [users, setUsers] = React.useState(personAsObjectAgain);
  const [newPass, setNewPass] = useState("");
  const [det, setDet] = useState({});
  console.log(det, "okl");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { id } = JSON.parse(sessionStorage.getItem("user"));
  console.log(id, "ooo");

  const navigate = useNavigate();
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
      .get(`http://localhost:4000/api/v1/special/users/${id}`)
      .then((res) => {
        setDet(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSaved = async (e, id) => {
    console.log(e, id, "ss");
    e.preventDefault();
    if (users.password === newPass) {
      toast.error("Check Your ");

      const updateStatus = {
        firstName: firstName || det.firstName,
        lastName: lastName || det.lastName,
        email: email || det.email,
        mobile: mobile || det.mobile,
        country: country || det.country,
        address: address || det.address,
        username: username || det.username,
        createdOn: new Date()
        // password: newPass,
      };
      let confirm = window.confirm("Are you sure you want to Edit");

      if (confirm) {
        try {
          await axios.put(
            "http://localhost:4000/api/v2/profile/update/" + id,
            updateStatus
          );
          toast.warning("Updated Successfully");
          setEdit(true);
        } catch (err) {
          console.log("err");
        }
      }
    } else {
      toast.error("Check Your password");
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
        {/* {det.map((det) => ( */}
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
            <div style={{marginTop:'-1rem',marginLeft:'2.5%'}}>
              <p>last update on:{moment(det.createdOn).format("DD/MM/YYYY")}</p>
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
                      defaultValue={det.firstName}
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
                      defaultValue={det.lastName}
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
                      defaultValue={det.username}
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
                      defaultValue={det.mobile}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl">
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
                      defaultValue={det.email}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="mt-4">
                <h5>Personal Info</h5>
                <div className="col-xl-6">
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
                      defaultValue={det.role}
                    />
                  </Form.Item>
                </div>

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
                      defaultValue={det.country}
                    />
                  </Form.Item>
                </div>

                <div className="col-xl">
                  <Form.Item
                    className="mt-2"
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
                    <input
                      style={{ fontSize: "1rem" }}
                      disabled={edit}
                      onChange={(e) => setaddress(e.target.value)}
                      className="form-control form-control-sm"
                      defaultValue={det.address}
                    />
                  </Form.Item>
                </div>
                {edit === false ? (
                  <div className="mt-4">
                    <input
                      type=""
                      name={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    &nbsp;
                    <button
                      onClick={(e) => onSaved(e, users.id)}
                      className="btn  btn-primary btn-sm"
                    >
                      save
                    </button>
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