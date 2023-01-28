import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const ClientMail = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [text, settext] = useState("");

  let sessionValue = JSON.parse(sessionStorage.getItem("user"));

  const sendEmail = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      text: text,
    };

    try {
      await axios.post("http://localhost:4000/api/v4/register", user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {show ? (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          Your Email Succesfully Send
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <h2>Send Email With React & NodeJs</h2>
          <img
            src="/gmail.png"
            alt="gmail img"
            className="mx-3"
            style={{ width: "50px" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Form className="mt-2 col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Your text</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={text}
                onChange={(e) => settext(e.target.value)}
                placeholder="Enter text"
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={sendEmail}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ClientMail;
