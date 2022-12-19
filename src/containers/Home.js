import React, { useEffect, useState } from "react";
import theme from "../assets/lap.jpg";
import Navbars from "../components/Navbars";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";

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
    <div>
      {/* <Navbars /> */}
      <section>
        <img src={theme} width="100%" alt="" />
      </section>

      <div className="homecontent text-light">
        <h2 style={{ background: "white", color: "black" }}>
          Welcome {users.username} <br /> {users.name} <br /> {users.email}{" "}
          <br /> {users.mobile}{" "}
        </h2>
        <h1>
          I'm,{" "}
          <span style={{ color: "rgb(209, 45, 94)", fontWeight: "600" }}>
            Saran Kumar.
          </span>
        </h1>

        <p>
          Web Developer and Desinger past one year, create a <br /> innovative
          UI
        </p>
        <p>
          {" "}
          The website of web developer Raf Derolez is modern
          <br /> and informative. It exhibits his unique personality, <br />{" "}
          branding, and developing skills in a simple.
        </p>

        <div className="">
          <button id="btn">ReadMore</button>
        </div>
      </div>
    </div>
  );
}
