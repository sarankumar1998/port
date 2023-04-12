import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from '@mui/icons-material/Settings';


function MyVerticallyCenteredModal(props) {
  const [details, setDetails] = useState({});
  useEffect(() => {
    let detailslist = props.sports.find((e) => e.id == props.setid);
    setDetails(detailslist);

  }, []);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: "700", color: "green" }}
          >
            {details.areazone}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <img
                src={details.images}
                alt=""
                style={{ width: "20rem", height: "20rem" }}
              />
              <div className="mt-4">
                <div className="row">
                  <div className="col-xl-1">
                    <LocationOnIcon />
                  </div>
                  <div className="col-xl-10">
                    <p >{details.location}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-1">
                    <AddCircleIcon />
                  </div>

                  <div className="col-xl mt-2" style={{ fontWeight: "600" }}>
                    <div style={{ lineHeight: "1px" }}>
                      <p >Ideal: {details.ideal}</p>
                      <p >Type: {details.type}</p>
                      <p >Size: {details.areasize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-3">
              <Card
                style={{ width: "20rem", height: "20rem" }}
                className="text-center"
              >
                <iframe src={details.map} width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </Card>
              <div className="mt-4">
                <div className="row">
                  <div className="col-xl-1">
                    <SettingsIcon />
                  </div>
                  <div className="col-xl-10">
                    <p style={{ fontWeight: "600" }}> Facilities:</p>
                    <p style={{ marginTop: '-1rem' }}>{details.facilites}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Dialog({ sports, setID }) {
  // console.log(sports, "oll");
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button
        className="btn btn-success btn-sm"
        onClick={() => setModalShow(true)}
      >
        Details
      </button>
      {/* {sports.price} */}
      <MyVerticallyCenteredModal
        setid={setID}
        show={modalShow}
        sports={sports}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
