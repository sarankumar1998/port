import React, { useState,useEffect } from "react";
import { Form} from "antd";
import axios from "axios";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import './FormData.css'
import DatePicker from "react-date-picker";



const FormsData = ({userId}) => {


 // CALL IT ONCE IN YOUR APP
 if (typeof window !== "undefined") {
  injectStyle();
}
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState();
  console.log(date,'datee');



  const apiBaseUrl = 'http://localhost:4000/api/v1//members';


  const onFinish = async () => {
    let user = {
      name: name,
      email: email,
      mobile: mobile,
      message: message,
      status:'Pending',
      tm: date,
      userId: userId
    }
  

    await axios.post(apiBaseUrl, user)
    .then((res) => {
        form.resetFields()
        // sessionStorage.setItem('usersss', JSON.stringify(res.data));
        toast.success("Sent Successfully");
      },
 
      (err) => {
        if (err) {
          toast.error("Try Again");
        }
    
      }
    );


  };
  // SetLoadData(false)

  return (
    <>  
    <div className="row justify-content-center mb-5">
      <div className="col-md-8 col-lg-6">
        <div className="card mt-5">
        <ToastContainer />
          <div className="card-body bg-light">
            <div className="text-center">
              <p>
              Please drop us details below and we will <br/> get in touch soon!
                 
              </p>
            </div>
            {/* start  */}
            <Form
            form={form}
              name="sign-up"
              className="sign-up"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "13px", color: "red" }}>
                        Required!
                      </span>
                    ),
                  },
                ]}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="email"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "13px", color: "red" }}>
                        Please input your Email!
                      </span>
                    ),
                  },
                ]}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="mobile"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "13px", color: "red" }}>
                        Required!
                      </span>
                    ),
                  },
                ]}
              >
                <input
                  type="number"
                  placeholder="Mobile"
                  className="form-control form-control-sm"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="message"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: (
                      <span style={{ fontSize: "13px", color: "red" }}>
                        Required!
                      </span>
                    ),
                  },
                ]}
              >
                <textArea
        
                  type="text"
                  placeholder="Message"
                  className="form-control form-control-sm"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Form.Item>
              {/* <div>
                <input                
                type="date"
                onChange={e => setDate(e.target.value)}
                />
              </div> */}

              <div className="mt-4">
                <button
                  type="primary"
                  htmlType="submit"
                  id="btn"
                >
                  Send
                </button>
              </div>
              {/* {loadData ? <Spinner/> : null} */}
            </Form>
     
          </div>
        </div>
      </div>
    </div>  
    </>
  );
};

export default FormsData;
