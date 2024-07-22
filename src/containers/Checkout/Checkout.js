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
import { useEffect } from "react";

function Checkout() {
  const [value, onChange] = React.useState(new Date());
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(location);
  const [eChip, seteChip] = useState(0);

  const [alltime, setAllTime] = useState([]);
  console.log(alltime);

  var currentTime = new Date();

  const apiBaseUrl = process.env.REACT_APP_SPORTS_V3
  const apiBaseUrl2 = process.env.REACT_APP_SPORTS_UP_V3 

  var time = currentTime.getHours();

  const getTime = () => {
    axios.get(apiBaseUrl).then((res) => {
      setAllTime(res.data);
    });
  };

  useEffect(() => {
    getTime();
  }, []);

  const handleSave = async () => {
    console.log(eChip, "echip");
    let sessionValue = JSON.parse(sessionStorage.getItem("user"));

    const updateStatusSp = {
      status: "Closed",
      userId: sessionValue.id,
    };
    let confirm = window.confirm("Are you sure you want to Book the slot");

    if (confirm) {
      try {
        await axios.put(apiBaseUrl2 + eChip, updateStatusSp
        );
        console.log("done");
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    }
  };

  const handleChip = async (e, id) => {
    console.log(e, id, "event");
    seteChip(e, id);
    setIsActive(!isActive);
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "2%" }}
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
            <div className="col-xl-6">
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
                <Stack spacing={1}>
                  {alltime.map((e, i) => (
                    <div className="row">
                      <div className="col-xl">
                        {" "}
                        <Chip

                          label={e.name}
                          name={e.id}
                          disabled={
                            time >= e.timeId || e.status === "Closed"
                              ? true
                              : false
                          }
                          color="success"
                          style={{
                            backgroundColor: time >= e.timeId ? '' :
                              e.status === "opened"
                                ? ""
                                : e.status === "Closed"
                                  ? "red"
                                  : "orange",
                          }}
                          onClick={() => handleChip(e.id, i)}

                        />
                      </div>
                    </div>
                  ))}
                </Stack>
              </CardContent>
            </div>
          </div>
          <div className="text-center py-5">
            <button type="" className="btn  btn-dark btn-sm">
              Back
            </button>{" "}
            &nbsp;{" "}
            <button
              onClick={() => handleSave()}
              className="btn  btn-success btn-sm"
              type=""
            >
              Save
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Checkout;
