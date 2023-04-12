
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import Admin from "../components/Admin/Admin";
 

function Msc({}) {
  const [allData, setallData] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = JSON.parse(sessionStorage.getItem("user")) ;
  const [changeVendorId, setChangeVendorId] = useState(null)
  const [secData, secSecData] = useState([]);
  console.log(secData, "ooo");

  const navigate = useNavigate();

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   getProductById();
  // }, []);

  const handleVendorIdChange = (e) => {
    setChangeVendorId(e.target.value)
  }


  const getProductById = async (e) => {
    if (e.key === "Enter") {
    await axios.get(`http://localhost:4000/api/v1/special/Obj/${changeVendorId}`)
      .then((res) => {
        setallData(res.data);
        setLoad(false);
      })
   
  }
else{
  
}

};
  console.log(secData, "det");

  useEffect(() => {
    if (allData) {
      secSecData(allData)
    }
  }, [allData])





  return (
    <div className="container mt-5">
<Navbars />

      <div style={{ marginTop: "5rem" }}><input type="text" onChange={handleVendorIdChange} onKeyDown={getProductById}/></div>
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
            {secData?.length > 0 ?   load ? (
              "Loading...."
            ) : (
              <tbody>
                {secData?.map((el,e) => {
                  return (
                    <tr key={e}>
                      <td>{el.name}</td>
                      <td>{el.message}</td>
                      <td style={{color: el.status === "Approved" ? "green" : "red"}}>{el.status}</td>
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
