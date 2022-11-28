import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import { getAPI } from "././API";

export default function News() {
  const [details, setDetails] = useState([]);
  const [load, setLoad] = useState(true);

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



  return (
    <div className="mt-5">
      <p> okkk {details.name}</p>
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
              <td><i class="bi bi-pencil-fill"></i></td>
              <td>{el.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
