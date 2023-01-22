import { Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./AddCart.css";
import { Offcanvas } from "react-bootstrap";

import Btn from "../Btn/Btn";
// import IconButton from "@mui/material/IconButton";

export default function AddCart({ pushCart,increment }) {
  const cartPriceTotal = pushCart.reduce((acc, item) => acc + item.price, 0);


  const [show, setShow] = useState(false);

const[count, setCount] = useState(0)
  const handleCloseCanva = () => setShow(false);
  const handleShowCanva = () => setShow(true);




  return (
    <div className="stick">
      <div className="stick">hello</div>{" "}
      <IconButton color="inherit">
        <Badge color="primary" badgeContent={pushCart.length} showZero>

        </Badge>
        <ShoppingCartIcon onClick={handleShowCanva} />
      </IconButton>
      <Offcanvas
        style={{ marginTop: "14rem" ,width:'30rem'}}
        show={show}
        placement={"end"}
        onHide={handleCloseCanva}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
        {pushCart.length > 0 ?
          <div>

          
            <h5 style={{ fontWeight: "600" }}>
              Items : {pushCart.length} | Total Price : {pushCart.price}
            </h5> 

            {pushCart.map((e,i) => (
              <>
           <div className="row">
            <div className="col-xl-8">
            <li>
                  {e.name} {""} | {e.price} {""} x {e.quantity}{" ==>"}  ${(e.price * e.quantity)}
                </li>
            </div>

            <div className="col-xl">
              <Btn  increment={() => increment(i)}
       />
            </div>

           </div>
                <hr/>
              </>
            ))}

            <h5 className="mt-3" style={{ fontWeight: 900 }}>
              Sub total: $ {cartPriceTotal}
            </h5>
          
          </div>
           :  <p className="text-center" style={{fontWeight:'900'}}>Cart is empty!!</p> }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
