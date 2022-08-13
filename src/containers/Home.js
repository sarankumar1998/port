import React from "react";
import theme from "../assets/lap.jpg";
import "./Home.css";

export default function Home() {



  return (
    <div>
      <section>
        <img src={theme} width="100%" alt="" />
      </section>

      <div className="homecontent text-light">
        <h1>
          I'm,{" "}
          <span style={{ color: "rgb(209, 45, 94)", fontWeight: "600" }}>
            Saran Kumar.
          </span>
        </h1>

        <p>
          Web Developer and Desinger past one year, create a <br/> innovative UI
        </p>
        <p>  The website of web developer Raf Derolez is modern<br/> and 
          informative. It exhibits his unique personality, <br/> branding, and
          developing skills in a simple.</p>
          
          <div className="">
            <button id="btn">ReadMore</button>
          </div>
  
      </div>
    </div>
  );
}
