import { Edit, EditOutlined } from "@material-ui/icons";
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Navbars from "../../components/Navbars";
import ModalDialog from "../../components/update/Modal";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Search from "antd/lib/transfer/search";
import TextArea from "antd/lib/input/TextArea";

function Admin({usersId}) {
 // CALL IT ONCE IN YOUR APP
 if (typeof window !== "undefined") {
    injectStyle();
  }

  const [Approval, setApproval] = useState(false);
  const [search, setSearch] = useState("");
  const [Reject, setReject] = useState(false);
  const [all, setAll] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [remarks, setremarks] = useState("");


  useEffect(() => {
    getProduct();
  }, []);
  

  const getProduct = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/`)
      .then((res) => {
        console.log(res)
        setAll(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  const onfilterchng = (e) => {
    console.log()
    const change = all.filter((el) => el.name.toLowerCase().includes(e.toLowerCase()))
    setSearch(change)
    setAll(change)
   }
  


  const handleDel = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      try {
        await axios.delete("http://localhost:4000/api/v1/member/remove/" + id);
        toast.error("Deleted Successfully");
          window.location.reload();
    
      } catch (err) {
        console.log(err);
      }
    }
  };


  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async (event, id) => {
    setApproval(true);
    setReject(false);
    console.log(event, id, "check");
    const updateStatus = {
      status: "Approved",
      Remarks:remarks,
     
    };
    let confirm = window.confirm("Are you sure you want to Approve");
    if(confirm){
    try {
      await axios.put(
        "http://localhost:4000/api/v1/members/update/" + id,
        updateStatus
      );
      toast.success("Approved Successfully");
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }}

  const handleReject = async (event,id) => {
    setReject(true);
    setApproval(false);
    // console.log(event, id, "check");
    const updateStatus = {
      status: "Rejected",
      Remarks:remarks,
      updatetimeByadmin:new Date()
    };
    let confirm = window.confirm("Are you sure you want to Reject");

    if(confirm){
    try {
      await axios.put(
        "http://localhost:4000/api/v1/members/update/" + id,updateStatus
      );
      toast.error("Rejected Successfully");
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }};

  return (
    <div className="container mt-3">
        {/* {usersId === undefined ? "" :  <Navbars />} */}
      <ToastContainer />
      <label>Search:</label>
        <input className="mb-2" onChange={(e) => onfilterchng(e.target.value)}/>

      {/* ADMIN */}
      {all.length > 1 ? (
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>

          <table class="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Reason</th>
                <th>Approval</th>
              </tr>
            </thead>
            {load ? (
              "Loading...."
            ) : (
              <tbody>
                
                {all.map((el, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{el.name}</td>
                      <td style={{width:'25rem'}}>{el.message}</td>
                      <td> {el.status} </td>
                      <td onClick={() => handleDel(el.id)}>
                        <DeleteIcon />
                      </td>
                      <td>
                        {" "}
                        <Edit
                          variant="contained"
                          color="primary"
                          onClick={handleOpen}
                        />
                        <ModalDialog open={open} handleClose={handleClose} />
                      </td>
                      <td><TextArea disabled={el.status === "Approved" || el.status === "Rejected"} onChange={(e) => setremarks(e.target.value)} placeholder={el.Remarks} /></td>
                      <td >
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={(e) => handleApprove(e, el.id)}
                            disabled={el.status === "Approved"}
                            style={{
                              display:
                                el.status === "Approved" ||
                                el.status === "Pending"
                                  ? "inline"
                                  : "none",
                            }}
                          >
                            <CheckOutlinedIcon />{" "}
                          </button>
                        
                        &nbsp;
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={(e) => handleReject(e, el.id)}
                            disabled={el.status === "Rejected"}
                            style={{
                              display:
                                el.status === "Rejected" ||
                                el.status === "Pending"
                                  ? "inline"
                                  : "none",
                            }}
                          >
                            {" "}
                            <ClearOutlinedIcon />{" "}
                          </button>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </Box>
      ) : null}
      {/* <div className="text-end mb-5">
        No data
      </div> */}
    </div>
  );
}

export default Admin;
