import { DeleteOutlined, Edit, EditOutlined } from "@material-ui/icons";
import { Box } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../../components/Navbars";
import ModalDialog from "../../components/update/Modal";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Approval } from "@mui/icons-material";

function Admin(id) {
  const [approval, setApproval] = useState(false);
  const [Reject, setReject] = useState(false);
  const [all, setAll] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = React.useState(false);
  //   const [edit, setEdit] = useState({
  //     status:"Approved"
  //   })

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/`)
      .then((res) => {
        // if (id === 2) {
        setAll(res.data);
        setLoad(false);
        // }
      })
      .catch((err) => console.log(err));
  };
  console.log(all, "ookk");

  const handleDel = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      try {
        await axios.delete("http://localhost:4000/api/v1/member/remove/" + id);
        // toast.error("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put("http://localhost:4000/api/v1/members/update" + id);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
    // }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = (event, id) => {
    setApproval(true);
    setReject(false);
    console.log(approval, "ooo");
    console.log(event, id, "check");
  };

  const handleReject = () => {
    setReject(true);
    setApproval(false);
    console.log(Reject, "fail");
  };

  return (
    <div className="container mt-5">
      <Navbars />
      <div style={{ marginTop: "5rem" }}></div>
      {/* ADMIN */}
      {all.length > 1 ? (
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <table class="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Approval</th>
              </tr>
            </thead>
            {load ? (
              "Loading...."
            ) : (
              <tbody>
                {all.map((el, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{el.name}</td>
                      <td>{el.message}</td>
                      <td>
                        {" "}
                        {el.status === "Pending"
                          ? approval
                            ? "Approved"
                            : Reject
                            ? "Rejected"
                            : el.status
                          : null}{" "}
                      </td>
                      <td onClick={() => handleDel(el.id)}>
                        <DeleteOutlined />
                      </td>
                      <td>
                        {" "}
                        <Edit
                          variant="contained"
                          color="primary"
                          onClick={handleOpen}
                        />
                        <ModalDialog open={open} handleClose={handleClose} />
                      </td>
                      <td>
                        {" "}
                        {Reject === false ? (
                          el.status === "Pending" ? (
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={(e) => handleApprove(e, index)}
                            >
                              <CheckOutlinedIcon />{" "}
                            </button>
                          ) : null
                        ) : null}{" "}
                        &nbsp;
                        {approval === false ? (
                          el.status === "Pending" ? (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={handleReject}
                            >
                              {" "}
                              <ClearOutlinedIcon />{" "}
                            </button>
                          ) : null
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </Box>
      ) : null}
      <div className="text-end mb-5">
        <button className="btn btn-primary" onClick={(e) => handleEdit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Admin;
