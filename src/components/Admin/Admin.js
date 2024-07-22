import { Box, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
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
import LoadingSpinner from "../Loader/LoadingSpinner";

const apiBaseUrl1 = process.env.REACT_APP_SERVER_V4 
const apiBaseUrl2 =  process.env.REACT_APP_API_BASE_URL + 'special/Obj';
const apiBaseUrl3 = process.env.REACT_APP_API_BASE_URL 

function Admin() {
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const [approval, setApproval] = useState(false);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState([]);
  const [reject, setReject] = useState(false);
  const [load, setLoad] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoad(true);
    try {
      const res = await axios.get(apiBaseUrl2);
      setAll(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };

  const handleDel = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        await axios.delete(`${apiBaseUrl3}${id}`);
        toast.error("Deleted Successfully");
        setAll(prevState => prevState.filter(item => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleApprove = async (id) => {
    setApproval(true);
    setReject(false);
    const updateStatus = {
      status: "Approved",
      Remarks: remarks,
    };
    let confirm = window.confirm("Are you sure you want to Approve?");
    if (confirm) {
      try {
        await axios.put(`http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/members/update/${id}`, updateStatus);
        toast.success("Approved Successfully");
        setAll(prevState => prevState.map(item => item.id === id ? { ...item, status: "Approved", Remarks: remarks } : item));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleReject = async (id) => {
    setReject(true);
    setApproval(false);
    const updateStatus = {
      status: "Rejected",
      Remarks: remarks,
    };
    let confirm = window.confirm("Are you sure you want to Reject?");
    if (confirm) {
      try {
        await axios.put(`http://ec2-44-204-186-150.compute-1.amazonaws.com/api/v1/members/update/${id}`, updateStatus);
        toast.error("Rejected Successfully");
        setAll(prevState => prevState.map(item => item.id === id ? { ...item, status: "Rejected", Remarks: remarks } : item));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sendEmail = async (id, mail, Remarks) => {
    console.log(id, mail, 'maill');
    setLoad(true);
    const user = { email: mail, text: Remarks };
    try {
      await axios.post(apiBaseUrl1, user);
      toast.success("Mail sent Successfully");
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };

  const filteredData = all.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container" style={{marginTop:'8rem'}}>
      {load ? (
        <LoadingSpinner message="Please wait while the mail is being sent" />
      ) : (
        <>
          <label>Search:</label>
          <input className="mb-2" onChange={(e) => setSearch(e.target.value)} />

          {all.length > 0 && (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 540 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Delete</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Approval</TableCell>
                      <TableCell>Mail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((el, index) => (
                      <TableRow hover key={index} sx={{ "&:last-child TableCell , &:last-child th": { border: 0 } }}>
                        <TableCell component="th">{el.id}</TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell style={{ width: "25rem" }}>{el.message}</TableCell>
                        <TableCell style={{ color: el.status === "Approved" ? 'green' : 'red' }}>{el.status}</TableCell>
                        <TableCell onClick={() => handleDel(el.id)}>
                          <DeleteIcon />
                        </TableCell>
                        <TableCell>
                          <TextArea
                            disabled={el.status === "Approved" || el.status === "Rejected"}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder={el.Remarks}
                          />
                        </TableCell>
                        <TableCell>
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={(e) => handleApprove(el.id)}
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
                              onClick={(e) => handleReject(el.id)}
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

                          </TableCell>
                        <TableCell>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => sendEmail(el.id, el.email, el.Remarks)}
                          >
                            Email
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="mt-3">
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Paper>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
