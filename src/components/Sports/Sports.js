import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Badminton from "../../containers/Badminton";
import SportsCard from "../../containers/SportsCard";
import Navbars from "../Navbars";
import { useState } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Sports() {
  const [view, setView] = useState("");
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);

  const onFirst = () => {
    setView(first);
    setFirst(true);
    setSecond(false);
    setThird(false);
    setFour(false);
    setFive(false);
  };

  const onSecond = () => {
    setView("second");
    setFirst(false);
    setSecond(true);
    setThird(false);
    setFour(false);
    setFive(false);
  };

  const onThird = () => {
    setView("third");
    setFirst(false);
    setSecond(false);
    setThird(true);
    setFour(false);
    setFive(false);
  };

  const onFourth = () => {
    setView("third");
    setFirst(false);
    setSecond(false);
    setThird(false);
    setFour(true);
    setFive(false);
  };

  const onFifth = () => {
    setView("third");
    setFirst(false);
    setSecond(false);
    setThird(false);
    setFour(false);
    setFive(true);
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      <div style={{ margin: "2rem" }} className="row">
        <div className="col-xl-3">
          <Card
            sx={{ maxWidth: 300 }}
            style={{ background: "", height: "150%" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                Sport:
              </Typography>

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="first"
                    onClick={() => onFirst()}
                    control={<Radio />}
                    label="Turf"
                  />

                  <FormControlLabel
                    value="second"
                    onClick={() => onSecond()}
                    control={<Radio />}
                    label="Badminton"
                  />
                  <FormControlLabel
                    value="three"
                    onClick={() => onThird()}
                    control={<Radio />}
                    label="Tennis"
                  />
                  <FormControlLabel
                    value="four"
                    onClick={() => onFourth()}
                    control={<Radio />}
                    label="VolleyBall"
                  />
                  <FormControlLabel
                    value="five"
                    onClick={() => onFifth()}
                    control={<Radio />}
                    label="ThrowBall"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </div>

        <div className="col-xl">
          {first || second === true ? (
            ""
          ) : (
            <h6 className="text-center">
              <CardActions>
                <Button size="small">  Kindly search based on 'Sport' !</Button>
              </CardActions>

            </h6>
          )}
          <div>          {first && <SportsCard />}
            {second && <Badminton />}</div>
        </div>
      </div>
    </div>
  );
}
