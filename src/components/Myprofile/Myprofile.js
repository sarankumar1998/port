import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Form, Button } from "antd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbars from "../Navbars";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Myprofile() {
  const [expanded, setExpanded] = React.useState(false);


  const stringifiedPerson = sessionStorage.getItem("user");
  const [isBlue, setIsBlue] = React.useState(false)
  console.log(isBlue,'bbbbb');
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  console.log(personAsObjectAgain);
  const [users, setUsers] = React.useState(personAsObjectAgain);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbars />

      <div
        style={{ display: "flex", marginTop: "7rem", padding:'1rem', justifyContent: "center" }}
      >
        <Card sx={{ maxWidth: 745 }} style={{padding:'2rem'}}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Edit Profile"
            subheader={moment(users.createdOn).format("DD/MM/YYYY")} 
          />

          <Form name="sign-up" className="sign-up mt-4">
            <div className="row">
              <div className="col-xl-6">
                <Form.Item
                  label="FirstName"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                  disabled
                    className="form-control form-control-sm"
                    placeholder={users.firstName}
                  />
                </Form.Item>
              </div>

              <div className="col-xl-6">
                <Form.Item
                  label="LastName"
                  className=""
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                   disabled
                   className="form-control form-control-sm"
                   placeholder={users.lastName}
                  />
                </Form.Item>
              </div>

              <div className="col-xl-6">
                <Form.Item
                  label="Username"
                  className="mt-2"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                    type="username"
                    disabled
                    className="form-control form-control-sm"
                    placeholder={users.username}
                  />
                </Form.Item>
              </div>
              <div className="col-xl-6">
                <Form.Item
                  label="Mobile"
                  className="mt-2"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                 disabled
                 className="form-control form-control-sm"
                 placeholder={users.mobile}
                  />
                </Form.Item>
              </div>

              <div className="col-xl">
                <Form.Item
                  label="Email"
                  className="mt-2"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Please input your Email!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                 disabled
                 className="form-control form-control-sm"
                 placeholder={users.email}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="mt-4">
              <h5>Personal Info</h5>
              <div className="col-xl-6">
                <Form.Item
                  className="mt-2"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                disabled
                className="form-control form-control-sm"
                placeholder={users.role}
                  />
                </Form.Item>
              </div>

              <div className="col-xl-6">
                <Form.Item
                  className="mt-2"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                disabled
                className="form-control form-control-sm"
                placeholder={users.country}
                  />
                </Form.Item>
              </div>

              <div className="col-xl">
                <Form.Item
                  className="mt-2"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Required!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                  disabled
                  className="form-control form-control-sm"
                  placeholder={users.address}
                  />
                </Form.Item>
              </div>
              {/* <div className="col-xl-6">
                <Form.Item
                  className="mt-2"
         
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "9px", color: "red" }}>
                          Please input your Password!
                        </span>
                      ),
                    },
                  ]}
                >
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-sm"
                    placeholder=''
                  />
                </Form.Item>
              </div> */}
            </div>
          </Form>

          <CardActions disableSpacing>
            <IconButton    onClick={() => setIsBlue(!isBlue)} aria-label="add to favorites">
              <FavoriteIcon style={{color:   isBlue ? 'red' : 'grey'} }  />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}
