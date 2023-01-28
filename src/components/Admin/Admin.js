import { Edit, EditOutlined } from "@material-ui/icons";
import { Box, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import ModalDialog from "../../components/update/Modal";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextArea from "antd/lib/input/TextArea";
import Table from "@mui/material/Table";
import { Form } from "react-bootstrap";

function Admin({ usersId }) {
  // CALL IT ONCE IN YOUR APP
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const [Approval, setApproval] = useState(false);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState([]);
  const [Reject, setReject] = useState(false);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [remarks, setremarks] = useState("");

  const [email, setEmail] = useState("");
  const mailObj = all.values((el) => el);
  console.log(mailObj);

  const sendEmail = async (e) => {
    e.preventDefault();
    let user = {
      email: mailObj.email,
      // text: mailObj.Remarks,
    };

    try {
      await axios.post("http://localhost:4000/api/v4/register", user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/`)
      .then((res) => {
        console.log(res);
        setAll(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  const bySearch = (all, search) => {
    if (search) {
      return all.name.toLowerCase().includes(search.toLowerCase());
    } else return all;
  };

  const filteredList = (all, search) => {
    return all.filter((all) => bySearch(all, search));
  };

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
      Remarks: remarks,
    };
    let confirm = window.confirm("Are you sure you want to Approve");
    if (confirm) {
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
    }
  };

  const handleReject = async (event, id) => {
    setReject(true);
    setApproval(false);
    // console.log(event, id, "check");
    const updateStatus = {
      status: "Rejected",
      Remarks: remarks,
      updatetimeByadmin: new Date(),
    };
    let confirm = window.confirm("Are you sure you want to Reject");

    if (confirm) {
      try {
        await axios.put(
          "http://localhost:4000/api/v1/members/update/" + id,
          updateStatus
        );
        toast.error("Rejected Successfully");
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container mt-3">
      {/* {usersId === undefined ? "" :  <Navbars />} */}
      <ToastContainer />
      <label>Search:</label>
      <input className="mb-2" onChange={(e) => setSearch(e.target.value)} />

      {/* ADMIN */}
      {all.length > 1 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Approval</TableCell>
                </TableRow>
              </TableHead>
              {load ? (
                "Loading...."
              ) : (
                <TableBody>
                  {filteredList(all, search).map((el, index) => {
                    return (
                      <TableRow
                        hover
                        key={index}
                        sx={{
                          "&:last-child TableCell , &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th">{el.name}</TableCell>
                        <TableCell style={{ width: "25rem" }}>
                          {el.message}
                        </TableCell>
                        <TableCell> {el.status} </TableCell>
                        <TableCell onClick={() => handleDel(el.id)}>
                          <DeleteIcon />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Edit
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                          />
                          <ModalDialog open={open} handleClose={handleClose} />
                        </TableCell>
                        <TableCell>
                          <TextArea
                            disabled={
                              el.status === "Approved" ||
                              el.status === "Rejected"
                            }
                            onChange={(e) => setremarks(e.target.value)}
                            placeholder={el.Remarks}
                          />
                        </TableCell>
                        <TableCell>
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
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={sendEmail}
                          >
                            Email
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* <hr> */}
          <div className="text-end" style={{ padding: "1rem" }}>
            <button type="" className="btn btn-sm btn-primary ">
              Save
            </button>
          </div>
          <div className="mt-3">
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={all.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      ) : null}
    </div>
  );
}

export default Admin;
