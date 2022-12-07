import React from "react";
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import EmailIcon from '@mui/icons-material/Email';

 function Footer () {
  return (
    <div>
      <footer className="text-center text-lg-start text-muted" style={{background:'#dcebf3'}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{background:'whitesmoke'}}>
          <div className="me-5 d-none d-lg-block">
            <span>Get connected vith us on social networks:</span>
          </div>
          <div>
            <a href="https://www.facebook.com/saran.kumar.9847867" className="me-4 text-reset">
             
            </a>
            <a href="https://www.instagram.com/sarankumar.apk/" className="me-4 text-reset">
            
            </a>
            <a href="https://www.linkedin.com/in/sarankumar-ramamoorthy-adikesavalu-0676441b0/" className="me-4 text-reset">
      
            </a>
            <a href="mailto: saranneumann13@gmail.com" className="me-4 text-reset">
          
            </a>
          </div>
        </section>
   
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
            
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>
             
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" className="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="/skills" className="text-reset">
                    Skills
                  </a>
                </p>
                <p>
                <a href="/about" className="text-reset">
                    About
                  </a>
                </p>
                <p>
                  <a href="/contact" className="text-reset">
                  Contact us
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> INDIA
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  saranneumann13@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 91 9080 611 322
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <div
          className="text-center p-4"
          style="background-color: rgba(0, 0, 0, 0.05);"
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div> */}
      </footer>
    </div>
  );
}

export default Footer
