import { Card, CardHeader } from "@mui/material";
import React from "react";
import Navbars from "../../components/Navbars";
export default function Cart({ addCart, items }) {
  return (
    <div>
      <div className="container">
   
          <>
            <div className="row">
              <div className="col-xl-4">
     
                <Card style={{ background: "" }}>
                {items.map((e, ind) => (
                  <>
                  <CardHeader title={e.name} />
                  <CardHeader subheader={e.price} />
                  <img src={e.src} />

                  <div className="py-3 text-center">
                    {!e.inCart && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addCart(ind)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {e.inCart && <p>Added!</p>}
                  </div>
                  </>
                      ))}
                      
                </Card>

                    
              </div>
            </div>
          </>

      </div>
    </div>
  );
}
