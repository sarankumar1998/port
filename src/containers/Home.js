import React, { useState, useEffect } from "react";
import Navbars from "../components/Navbars";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Card } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    axios.get(`http://localhost:4000/api/v1/special/users/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, [navigate]);


  return (
    <div style={{ marginTop: "5rem" }}>
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
         {user.username}
                  </span>{" "}
                  <br />
                  Welcome Back!
                </h4>
              </Card>
            </Box>
          </div>
          <Box component="main" sx={{ p: 6 }}>
            <Card sx={{ maxWidth: 800 }} style={{ padding: ".5rem" }}>
              {/* Render user data here */}
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
                and how they can get started.
              </p>
            </Card>
          </Box>
        </div>
      </div>
    </div>
  );
}
