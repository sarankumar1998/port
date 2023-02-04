import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const ClientMail = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [text, settext] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [resultText, setResultText] = useState("");

  const fileInput = useRef();

  const saveFile = ()=>{
      setFile(fileInput.current.files[0]);
      setFileName(fileInput.current.files[0].name)
  }

  const uploadFile = async ()=>{
      const formData = new FormData();
      formData.append('file',file );
      formData.append('fileName',fileName );

      try{
         const res =  await axios.post('http://localhost:4000/api/v6/upload',
              formData
          )
          setResultText(res.data.message)
          fileInput.current.value = "";
          setTimeout(()=>{
              setResultText("");
          },5000)
      }catch(ex){
          if(ex.response != undefined){
              setResultText(ex.response.data.message)
          }else{
              setResultText("Server Error!")
          }
          setTimeout(()=>{
              setResultText("");
          },5000)
      }


  }

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


  const paymentHandler = async (e) => {
    try {
        await axios.get("http://localhost:4000/api/v5/order");
      } catch (err) {
        console.log(err);
      }
    e.preventDefault();


    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "Your App Name",
      description: "Some Description",
      order_id: e.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url =    await axios.post("http://localhost:4000/api/v5/capture", paymentId);
         const captureResponse = await axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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

<div className="App">
<input type="file" ref={fileInput} onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
            {resultText?(<p>{resultText}</p>):null}
        </div>

<button onClick={paymentHandler}>Pay Now</button>

      
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
