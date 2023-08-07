import React, { useEffect, useState } from "react";
import moment from "moment";
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





  const [user, setUser] = useState(null);
  const [birthdayWish, setBirthdayWish] = useState("");

  useEffect(() => {
    // Replace 'loggedInUserId' with the actual logged-in user's ID
    const loggedInUserId = 123; // Change this to the correct user ID

    axios.get(`http://localhost:4000/api/v1/special/users/${userInfo.id}`)
      .then((res) => {
        const user = res.data[0];
        setUser(user);

        const today = new Date();
        const birthday = new Date(user.bday);

        if (
          user && // Ensure that user object is not null
          birthday.getDate() === today.getDate() &&
          birthday.getMonth() === today.getMonth()
        ) {
          setBirthdayWish(`Happy Birthday, ${user.firstName}! 🎉🎂`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/special/users/" + userInfo.id)
      .then((res) => {
        setGetData(res.data);
        console.log(getData);
      })


  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = JSON.parse(sessionStorage.getItem("user"));
  //       console.log(data, "tokyo");
  //       if (token) {
  //         const response = await axios.get("localhost:4000/api/v2/detail", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setData(response.data);
  //         console.log(data, "ok");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);


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
                    {getData.map((e) => {
                      return (
                        <> {e.username}</>
                      )
                    })}
                  </span>{" "}
                  <br />
                  Welcome Back!
                </h4>
              </Card>
            </Box>
          </div>


          <Box component="main" sx={{ p: 6 }}>
            <Card sx={{ maxWidth: 800 }} style={{ padding: ".5rem" }}>
              <div>
                <h1>Welcome to Your Home, {user ? user.firstName : "User"}!</h1>
                {birthdayWish && <p>{birthdayWish}</p>}
              </div>
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
