
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Admin from "../components/Admin/Admin";



const apiBaseUrl =  process.env.REACT_APP_API_BASE_URL + '/special/Obj'

function ClientForm({ }) {
  const [load, setLoad] = useState(true);
  const [secData, setSecData] = useState([]);

  const token = sessionStorage.getItem("token");

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userId = decodedToken.id;

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = (e) => {

    axios.get(`${apiBaseUrl}/${userId}`)
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
      <div className="mt-3">
        {userId !== 2 ? (
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

export default ClientForm;
