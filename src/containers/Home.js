import React, { useEffect, useState } from "react";
import theme from "../assets/lap.jpg";
import Navbars from "../components/Navbars";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import { Box, Card } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  const stringifiedPerson = localStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  console.log(personAsObjectAgain);
  const [users, setUsers] = useState(personAsObjectAgain);

  useEffect(() => {
    if (!!!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ marginTop: "7rem" }}>
      <Navbars />
      {/* <section>
        <img src={theme} width="100%" alt="" />
      </section> */}
      <div style={{ margin: "3rem" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <Card  sx={{ maxWidth: 500 }}>
            {users === null ? (
              ""
            ) : (
              <h4>Hi, {''}
                <span style={{ color: "rgb(209, 45, 94)", fontWeight: "600" }}>
                {users.username}
                </span> <br/>
                Welcome Back!
              </h4>
            )}
          </Card>
        </Box>
      </div>
    </div>
  );
}
