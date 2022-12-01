import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import { getAPI } from "././API";
import {
  EditOutlined, DeleteOutlined
} from '@ant-design/icons';


export default function News() {
  const [details, setDetails] = useState([]);
  const [load, setLoad] = useState(true);
  const [timer, setTimer] = useState(0)
  const [dis, setdis] = useState(true)


  useEffect(() => {
    GetSpecial();
  }, []);

  const GetSpecial = () => {
    getAPI.GetSpecialApi().then((res) => {
      setLoad(true);
      setDetails(res.data);
      setLoad(false);
    });
  };


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(timer => timer + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  
  useEffect(() => {
    // if (timer !== 0) {
   const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    // }
    return () => clearInterval(interval);
  }, []);
 


  return (
    <div className="mt-5">
      <div className="text-center">
      <button className="btn btn-info" type="" disabled={dis}>Payment here</button>

      </div>
      <div className="text-center">
      {timer}
  
      </div>
      {load ? (
        <Spinner />
      ) : (
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Message</th>
            <th scope="col">Mobile</th>
            <th scope="col">Status</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {details.map((el) => (
            <tr>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.message}</td>
              <td>{el.mobile}</td>
            <td > {el.status > 0 ? "paid" : "Not Paid"}</td>
              <td><EditOutlined /></td>
              <td><DeleteOutlined /></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
