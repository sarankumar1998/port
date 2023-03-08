import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic3 from "../assets/web.jpg";
import Navbars from "../components/Navbars";

export default function About({usersId}) {
  console.log(usersId, 'checkkkkkkkkkk');
  const navigate  = useNavigate()

  useEffect(() => {
    if (!!!sessionStorage.getItem("user")) {
      navigate("/login");
    }
    
  }, [navigate]);

  return (
    <div className="container">
 <Navbars />
      <section>
          <div className="row">
            <div className="col-sm-9 col-md-8 col-xl-5">
              <img src={pic3} width="70%" alt="" />
            </div>
            <div className="col-sm col-md mt-5">
              <h2>Hello! <br /> I'm <span style={{ color: "#0275d8" }}>Saran K SATAN</span> </h2>
              <h3 style={{ color: "gray" }}>Web Developer</h3>
              <p> <span>I</span>
                am the admin of this page, Saran Kumar. To know about me in a nutshell, I am tech wizard and always
                had my sprits high in and around computers, software to be specific,
                <br /><br /> On researching about how to make a profession from my interest and passion, I exposed
                myself to various fields to find the right fit for me, that’s how I found building of websites
                spiked my interest, thanks to my curiosity in surfing through the web. Furthermore, deciding a
                career on website building came with a plethora of opportunities, I narrowed down all the option to
                two primary options of choosing between a front end developer or back end developer, I finally
                landed myself in front end developing.
                With a lot of hussle and no handsout with sheer hardwork,<br /><br /> I have self-financed in educating
                me about this “Front end developing”. As a first step out of million steps, is this website. I have
                a long way to go.
                Small progress is still progress. Open to be placed, trained, coached and also be a good team
                player.
              </p>
              <a href="../../assets/cv/resumesarannew-pdf.pdf" className="btn btn-primary">download cv</a>
            </div>
        </div>
      </section>


      {/* <Carousel>
        <Carousel.Item interval={500}>
          <a href="/msc">
            <img
              className="d-block w-100"
              src={pic2}
              height="320vh"
              alt="First slide"
              style={{ opacity: 0.9 }}
            />
          </a>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            height="320vh"
            src={pic1}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic3}
            height="320vh"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </div>
  );
}


