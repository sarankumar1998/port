import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbars from "../components/Navbars";

function Msc() {
  const [det, setDet] = useState([]);
  const [all, setAll] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = JSON.parse(localStorage.getItem("user"));
  console.log(id, "ooo");

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

  return (
    <div className="container mt-5">
      <Navbars />
{id !== 2 ?      <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
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
              {det.map((el) => {
                return (
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.message}</td>
                    <td>{el.status}</td>
                    <td onClick={() => handleDel(el.id)}>
                      <DeleteOutlined />
                    </td>
                    <td onClick={() => handleEdit(el.id)}>
                      <EditOutlined />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </Box> : null
 }


  {all.length > 1 ?     <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
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
                    <td onClick={() => handleEdit(el.id)}>
                      <EditOutlined />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </Box> : null}
    </div>
  );
}

export default Msc;
