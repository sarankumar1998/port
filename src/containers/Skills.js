import React from "react";
import html from "../assets/htm.png";
import css from "../assets/css.png";
import react from "../assets/react.png";
import exp from "../assets/nod.png";
import boot from "../assets/boot.png";
import mysql from "../assets/mysql.png";

function Skills() {
  return (
    <div>
       <div classNameName="bg">
      <div classNameName="container">
        <div classNameName="row justify-content-center ">
          <div classNameName=" col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card firstrow shadow">
              <div classNameName="card-body text-center">
                <img
                  src={html}
                  className="card-img-top"
                  style={{ height: "50%", width: "85%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div classNameName="col-sm-6 col-md-4 col-lg-3  mt-4">
            <div className="card firstrow shadow">
              <div classNameName="card-body text-center">
                <img
                  src={css}
                  className="card-img-top"
                  style={{ height: "50%", width: "60%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div classNameName="col-sm-6 col-md-4 col-lg-3  mt-4">
            <div className="card firstrow shadow">
              <div classNameName="card-body text-center">
                <img
                  src={react}
                  className="card-img-top"
                  style={{ height: "50%", width: "66%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
        {/* second row starts */}
        <div classNameName="row justify-content-center">
          <div classNameName=" col-sm-6 col-md-4 col-lg-3 mt-5">
            <div className="card shadow">
              <div classNameName="card-body text-center">
                <img
                  src={boot}
                  className="card-img-top"
                  style={{ height: "50%", width: "90%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div classNameName="col-sm-6 col-md-4 col-lg-3 mt-5">
            <div classNameName="card shadow">
              <div classNameName="card-body text-center">
                <img
                  src={exp}
                  classNameName="card-img-top"
                  style={{ height: "30%", width: "84%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div classNameName="col-sm-6 col-md-6 col-lg-3 mt-5 mb-5">
            <div classNameName="card shadow">
              <div classNameName="card-body text-center">
                <img
                  src={mysql}
                  classNameName="card-img-top"
                  style={{ height: "30%", width: "84%" }}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
      <div classNameName="row justify-content-center container">
        <div classNameName="col col-sm-9 col-md-9 col-lg-8 mt-5">
          <p>
            Innovation is a creative, dynamic process that can't be fully
            encapsulated in a series of how-to steps. Instead, innovation is a
            repertoire of skills in creatively monitoring and understanding user
            needs and developing web structures to meet those needs.
            <br />
            <br />
            Because the
            World Wide Web is dynamic, highly enmeshed, competitive, and often a
            continuously available, global service, developing a web never stops.
            The information space in which a web operates constantly changes, and,
            possibly, the domain information of a web changes. The amount that a
            web changes depends on users' needs, the nature of the domain
            information, and other factors such as the growth of competitive webs.
            The key to approaching this need for continuous development is to keep
            all web-development processes operating. After plans are made for a
            web, those plans should be reevaluated and adjusted to new conditions.
            People working on the planning, analysis, design, implementation, and
            promotion of a web need to communicate with each other, work together
            to accomplish many tasks, and continuously strive to improve the web
            for the good of the user.
          </p>
        </div>
      </div>
    </div>



  );
}

export default Skills;
