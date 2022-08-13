import React from "react";
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import EmailIcon from '@mui/icons-material/Email';

 function Footer () {
  return (
    <div>
      <footer class="text-center text-lg-start text-muted" style={{background:'#dcebf3'}}>
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{background:'whitesmoke'}}>
          <div class="me-5 d-none d-lg-block">
            <span>Get connected vith us on social networks:</span>
          </div>
          <div>
            <a href="https://www.facebook.com/saran.kumar.9847867" class="me-4 text-reset">
             
            </a>
            <a href="https://www.instagram.com/sarankumar.apk/" class="me-4 text-reset">
            
            </a>
            <a href="https://www.linkedin.com/in/sarankumar-ramamoorthy-adikesavalu-0676441b0/" class="me-4 text-reset">
      
            </a>
            <a href="mailto: saranneumann13@gmail.com" class="me-4 text-reset">
          
            </a>
          </div>
        </section>
   
        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3"></i>Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
            
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" class="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Laravel
                  </a>
                </p>
              </div>
             
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" class="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="/skills" class="text-reset">
                    Skills
                  </a>
                </p>
                <p>
                <a href="/about" class="text-reset">
                    About
                  </a>
                </p>
                <p>
                  <a href="/contact" class="text-reset">
                  Contact us
                  </a>
                </p>
              </div>
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i class="fas fa-home me-3"></i> INDIA
                </p>
                <p>
                  <i class="fas fa-envelope me-3"></i>
                  saranneumann13@gmail.com
                </p>
                <p>
                  <i class="fas fa-phone me-3"></i> + 91 9080 611 322
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <div
          class="text-center p-4"
          style="background-color: rgba(0, 0, 0, 0.05);"
        >
          © 2021 Copyright:
          <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div> */}
      </footer>
    </div>
  );
}

export default Footer
