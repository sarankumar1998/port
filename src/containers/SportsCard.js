import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import Dialog from "../components/Dialog/Dialog";
import "./Cricket.css";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Link, useLocation } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import LoadingSpinner from "../components/Loader/LoadingSpinner";



const theme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 20,
  },
});

const apiBaseUrl = 'http://192.168.10.117:4000/api/v3/getsports'; // Replace with your IP address


export default function SportsCard() {
  const location = useLocation();
  const [sports, getSports] = useState([]);
  const [load, setLoad] = useState(true);
  console.log(sports.mainslotId, "oooo");

  React.useEffect(() => {
    getSport();
  }, []);

  const getSport = () => {
    axios.get(apiBaseUrl).then((res) => {
      getSports(res.data);
      console.log(res.data, "rrr")
      setLoad(false);
    });
  };

  return (

    <>


      {load ?
        // <Box sx={{ display:'end' }}>
        <LoadingSpinner />
        // </Box>
        : (<>
          <div className="row">
            <h6 style={{ fontWeight: "600", marginLeft:"1rem" }}>{sports.length} Result Found</h6>
            <ThemeProvider theme={theme}>
              {sports.map((e) => (
                <>

                  <div className="col-xl-4 col-md-6 mr-2 mt-4">

                    <Card sx={{ width: "300px", height: '100%' }} className="Card">
                      {load ? (
                        <Skeleton variant="rectangular" sx={{ width: "300px", height: '100%' }} />
                      ) :
                        <>
                          <CardMedia sx={{ height: 200 }} image={e.images} />
                          <CardContent>
                            <div className="row">
                              <div className="col-xl-9" style={{ color: '#03fc77' }}>
                                <AccessTimeFilledIcon />
                              </div>
                              <div className="col-xl">
                                <p> ₹{e.price} </p>
                              </div>
                            </div>

                            <Typography gutterBottom variant="h6" component="div">
                              {e.areazone.split(" - ")}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Dialog sports={sports} setID={e.id} /> &nbsp;
                            <Link to={"/checkout"} state={{ data: { e } }} >
                              <button className="btn  btn-success btn-sm"> Play Now</button>
                            </Link>
                          </CardActions></>
                      }
                    </Card>
                  </div>

                </>
              ))}
            </ThemeProvider>
          </div>
        </>)}
    </>
  );
}
