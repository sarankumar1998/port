// import { Badge, IconButton } from "@mui/material";
// import React, { useState } from "react";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import "./AddCart.css";
// import { Offcanvas } from "react-bootstrap";


import styled from "styled-components";

export const Overlay = styled.div`
  background-color: rgba(128, 128, 128, 0.5);
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: ${({ open }) => (open ? "block" : "none")};
`;

