import { DeleteOutlined, Edit, EditOutlined } from "@material-ui/icons";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import Admin from "../components/Admin/Admin";
 

function Msc({}) {
  const [det, setDet] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = JSON.parse(localStorage.getItem("user")) ;
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
      .get(`http://localhost:4000/api/v1/special/Obj/${id}`)
      .then((res) => {
        setDet(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(det, "det");



  return (
    <div className="container mt-5">
      {id === null ? "" :  <Navbars />}
      <div style={{ marginTop: "5rem" }}></div>
      {id !== 2 ? (
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            {det.length > 0 ?   load ? (
              "Loading...."
            ) : (
              <tbody>
                {det.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.message}</td>
                      <td>{el.status}</td>
                      <td>{el.Remarks === null ? "-" : el.Remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : "No Records..."}
          </table>
        </Box>
      ) : <Admin />}
    </div>
  );
}

export default Msc;
