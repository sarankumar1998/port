import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Navbars from "../../components/Navbars";
import MockApi from "./dummy";
import { CardHeader } from "@mui/material";
import Cart from "../Cart/Cart";
import AddCart from "../AddCart/AddCart";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 3405,
    maxHeight: 4080,
  },
}));

export default function Product() {
  const classes = useStyles();
  const [Data, setData] = useState(MockApi);
  const [pushCart, setPushCart] = useState([]);

  const addCart = (e) => {
    console.log(e,'eree');

    setData((state) =>state.map((item, num) => {
        if (e === num) {
          console.log(e,num, 'ere');
          setPushCart([
            ...pushCart,
            { name: item.name, price: item.price, quantity: item.quantity },
          ]);

          return { ...item, inCart: true };
        }
        return item;
      })
    );
  };

const dam = (a,d) => {
let c = a+d
console.log(c);
}

dam(876,98)

  
  const increment = {
    inCart: i => {
      setData(state =>
        state.map((item, o) => {
          if (i === o && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    },
    inItems: i => {
      setData(state =>
        state.map((item, o) => {
          if (o === i && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    }
  };


  return (
    <div>
      <Navbars cart={pushCart}/>
      <div style={{ marginTop: "10rem" }} className="text-end ml-3">
      <AddCart pushCart={pushCart} increment={increment.inItems} />
      </div>
      <div style={{ marginTop: "10rem" }}>
        <h4 className="text-center" style={{ fontWeight: "600" }}>
          Shopping time
        </h4>
                  <div className="py-3 ">
                    <Cart items={Data} addCart={addCart} className={classes.root} />
                  </div>
           

    </div>
    
    </div>
  );
}
