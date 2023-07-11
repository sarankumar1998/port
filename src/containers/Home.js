import React, { useEffect, useState } from "react";
import theme from "../assets/lap.jpg";
import Navbars from "../components/Navbars";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { Box, Card } from "@mui/material";

export default function Home() {
  const [data, setData] = useState(null);
  const [getData, setGetData] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/special/users/" + userInfo.id)
      .then((res) => {
        setGetData(res.data);
        console.log(getData);
      });
  }, [userInfo.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("user"));
        console.log(data, "tokyo");
        if (token) {
          const response = await axios.get("localhost:4000/api/v2/detail", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          console.log(data, "ok");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Navbars handleLogout={handleLogout} />

      <div style={{ margin: "2rem" }} className="row g-2">
        <div className="col-xl-8">
          <div style={{ marginBottom: "-2rem" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
              <Card sx={{ maxWidth: 800 }} style={{ padding: ".5rem" }}>
                <h4>
                  Hi,{" "}
                  <span
                    style={{
                      color: "rgb(209, 45, 94)",
                      fontWeight: "600",
                    }}
                  >
                    {getData.username}
                  </span>{" "}
                  <br />
                  Welcome Back!
                </h4>
              </Card>
            </Box>
          </div>

          <div>
            {/* Render the data */}
            {data && (
              <ul>
                {data.map((item) => (
                  <li key={item.id}>{item.location}</li>
                ))}
              </ul>
            )}
          </div>

          <Box component="main" sx={{ p: 6 }}>
            <Card sx={{ maxWidth: 800 }} style={{ padding: ".5rem" }}>
              <p className="p-3">
                The modern trend is towards the second option – with no formal
                welcome message or statement of purpose. However, when a site is
                complex, it becomes essential to explain to your users, in as
                few simple words as possible, what they can find on your site
                and how they can get started.
              </p>
            </Card>
          </Box>
        </div>

        <div className="col-xl">
          <Box component="main" sx={{ p: 6 }}>
            <Card sx={{ maxWidth: 450 }} style={{ padding: ".5rem" }}>
              <p>
                The modern trend is towards the second option – with no formal
                welcome message or statement of purpose. However, when a site is
                complex, it becomes essential to explain to your users, in as
                few simple words as possible, what they can find on your site
                and how they can get started. complex, it becomes essential to
                explain to your users, in as few simple words as possible, what
                they can find on your site and how they can get started.
              </p>
            </Card>
          </Box>
        </div>
      </div>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}
