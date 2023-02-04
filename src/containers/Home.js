import React, { useEffect, useState } from "react";
import theme from "../assets/lap.jpg";
import Navbars from "../components/Navbars";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import { Box, Card } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();


  const stringifiedPerson = sessionStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  const [users, setUsers] = useState(personAsObjectAgain);


  useEffect(() => {
    if (!!!sessionStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div style={{ marginTop: "5rem" }}>
   <Navbars />
      <div style={{ margin: "2rem" }} className="row g-2">
        <div className="col-xl-8">
          <div style={{ marginBottom: "-2rem" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
              <Card sx={{ maxWidth: 800 }} style={{ padding: ".5rem" }}>
                {users === null ? (
                  ""
                ) : (
                  <h4>
                    Hi, {""}
                    <span
                      style={{ color: "rgb(209, 45, 94)", fontWeight: "600" }}
                    >
                      {users.username}
                    </span>{" "}
                    <br />
                    Welcome Back!
                  </h4>
                )}
              </Card>
            </Box>
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
    </div>
  );
}
