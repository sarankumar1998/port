
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import Admin from "../components/Admin/Admin";



const apiBaseUrl = 'http://192.168.10.117:4000/api/v1/special/Obj'; // Replace with your IP address

function Msc({ }) {
  const [allData, setallData] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = JSON.parse(sessionStorage.getItem("user"));
  const [changeVendorId, setChangeVendorId] = useState(null)
  const [secData, setSecData] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    }
  }, [navigate]);



  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = (e) => {

    axios.get(`${apiBaseUrl}/${id}`)
      .then((res) => {
        setSecData(res.data);
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
      });

  }


  return (
    <div className="container mt-5">
      <Navbars />

      <div className="mt-3">
        {id !== 2 ? (
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Message</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Reason</th>
                </tr>
              </thead>
              {secData?.length > 0 ? load ? (
                "Loading...."
              ) : (
                <tbody>
                  {secData?.map((el, e) => {
                    return (
                      <tr key={e}>
                        <td className="text-center">{el.name}</td>
                        <td className="text-center">{el.message}</td>
                        <td className="text-center" style={{ color: el.status === "Approved" ? "green" : "red" }}>{el.status}</td>
                        <td className="text-center">{el.Remarks === null ? "-" : el.Remarks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : "No Records..."}
            </table>
          </Box>
        ) : <Admin />}
      </div>
    </div>
  );
}

export default Msc;
