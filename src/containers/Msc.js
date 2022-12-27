import { DeleteOutlined, Edit, EditOutlined } from "@material-ui/icons";
import { Box } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import ModalDialog from "../components/update/Modal";
import Update from "../components/update/Update";

function Msc() {
  const [det, setDet] = useState([]);
  const [all, setAll] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = React.useState(false);
  const { id } = JSON.parse(localStorage.getItem("user"));
  console.log(id, "ooo");

  const navigate = useNavigate();

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getProductById();
    getProduct();
  }, []);

  const getProductById = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/${id}`)
      .then((res) => {
        setDet(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(det, "det");

  const getProduct = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/`)
      .then((res) => {
        if (id === 2) {
          setAll(res.data);
          setLoad(false);
        }
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
    // let confirm = window.confirm("Are you sure you want to delete");
    // if(confirm){
    try {
      await axios.put("http://localhost:4000/api/v1//members/update" + id);
      // toast.error("Deleted Successfully");
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

  return (
    <div className="container mt-5">
      <Navbars />
      <div style={{ marginTop: "5rem" }}></div>
      {id !== 2 ? (
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            {load ? (
              "Loading...."
            ) : (
              <tbody>
                {det.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.message}</td>
                      <td>{el.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </Box>
      ) : null}

      {all.length > 1 ? (
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {load ? (
              "Loading...."
            ) : (
              <tbody>
                {all.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.message}</td>
                      <td>{el.status}</td>
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
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </Box>
      ) : null}
    </div>
  );
}

export default Msc;
