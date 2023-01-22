import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Navbars from "../../components/Navbars";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link, useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Checkout.css";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout() {
  const [value, onChange] = React.useState(new Date());
  const [valueDay, onChangeDay] = useState("10:00");
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(location);

//   const [time, setTime] = useState('')



// const [time, setTime] = useState('')
var currentTime = new Date();
var time = currentTime.getHours()

console.log(time,'lof');

  const handleClick = () => {

//     var selectedTime = time;
//     var currentTime = new Date();
//     console.log(currentTime)
//     var selectedTimeStamp = (currentTime.getMonth() + 1) + "/" + currentTime.getDate() + "/" + currentTime.getFullYear() + " " + selectedTime;
//     var uservalue = new Date(selectedTimeStamp);
//     console.log("user Input", uservalue, "Current value", currentTime)
//     if (uservalue < currentTime) {
//    console.log(data.state.data.e.start);
//     }
//     else {
           
//     }




    setIsActive((isActive) => !isActive);

  };
 

    return (
      <div>
        <Navbars />


        <div
          style={{ display: "flex", justifyContent: "center", margin: "7rem" }}
        >
      
          <Card sx={{ maxWidth: "200%" }} style={{ background: "#f2f4f7" }}>
            <div className="row" style={{ marginTop: "3rem" }}>
              <div className="col-xl-5 container">
                <p style={{ fontWeight: "700", color: "green" }}>
                  {" "}
                  <EventNoteIcon /> {data.state.data.e.areazone}
                </p>
                <div>
                  <img src={data.state.data.e.images} />
                </div>
                <CardContent>
                  <div className="row">
                    <div className="col-xl-1">
                      <LocationOnIcon />
                    </div>
                    <div className="col-xl-10">
                      <h5 style={{ fontWeight: "600" }}>
                        {data.state.data.e.areaName}
                      </h5>
                      <p>{data.state.data.e.location}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-1">
                      <AddCircleIcon />
                    </div>

                    <div className="col-xl mt-2" style={{ fontWeight: "600" }}>
                      <div style={{ lineHeight: "1px" }}>
                        <p style={{}}>Ideal: {data.state.data.e.ideal}</p>
                        <p style={{}}>Type: {data.state.data.e.type}</p>
                        <p style={{}}>Size: {data.state.data.e.areasize}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="col-xl-5 ">
                <label style={{ fontSize: "20px", fontWeight: "600" }}>
                  Choose Date:
                </label>

                <div>
                  <DatePicker
                    minDate={new Date()}
                    onChange={onChange}
                    value={value}
                  />
                </div>
<p>{time}</p>
                <CardContent style={{ marginTop: "6rem" }}>
                  <label style={{ fontSize: "20px", fontWeight: "600" }}>
                    Pick a slot
                  </label>
                  <p style={{ fontStyle: "italic", color: "#a8a7a7" }}>
                    [ available = green; not-available = red; selected = amber ]
                  </p>
                  <Stack direction="row" spacing={1}>
                    <Chip
                    // disabled 
                      color="success"
                      style={{
                        backgroundColor: isActive
                          ? "salmon"
                          : "" || data.state.data.e.status === "opened"
                          ? ""
                          : "red",
                      }}
                      onClick={handleClick}
                      label={data.state.data.e.name}
                    />
                  </Stack>
                </CardContent>
              </div>
            </div>
<div className="text-center py-5"> 
<button type="" className="btn  btn-dark btn-sm">Back</button> &nbsp; <button  className="btn  btn-success btn-sm" type="">Save</button> 
</div>

          </Card>
        </div>
      </div>
    );
}

export default Checkout;
