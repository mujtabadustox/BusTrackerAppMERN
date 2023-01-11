import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

import MapQuest from "../components/MapQuest";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polygon,
  Rectangle,
} from "react-leaflet";

import busIcon from "./bus.png";
import redIcon from "./2.png";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
}));

var abc;
var startCheck;
var reportCheck;

const Homepage = () => {
  const classes = useStyles();
  const [speed, setSpeed] = useState("");
  const [route, setRoute] = useState("");
  const [curRoute, setCurRoute] = useState("");
  const [curSpeed, setCurSpeed] = useState("");
  const [busCount, setBusCount] = useState("");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const startPressed = async () => {
    const response = await axios.get(
      `http://localhost:4000/vehicles/get-vehicles/${route}`
    );
    console.log(response.data);
    setData(response.data);
    setBusCount(response.data.length);
    setCurRoute(route);
    abc = 1;
    startCheck = 1;
    reportCheck = 0;
  };

  const reportPressed = async () => {
    const response1 = await axios.get(
      `http://localhost:4000/vehicles/get-data/${speed}/${route}`
    );

    setData(response1.data);
    setBusCount(response1.data.length);
    setCurRoute(route);
    setCurSpeed(speed);
    // console.log(response1.data);
    // setNewData(response1.data);

    startCheck = 0;
    reportCheck = 1;
  };

  const stopPressed = () => {};

  console.log(data);
  console.log(newData);

  return (
    <div className="container-fluid">
      <div>
        <h2>Map</h2>
        <MapContainer
          center={[41.8781, -87.6298]}
          zoom={5}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {startCheck == 1 &&
            data.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [45, 45],
                  popupAnchor: [2, -20],
                  iconUrl: busIcon,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  Bus Id: {item.vid} Speed: {item.speed} MPH {<br></br>} Time:{" "}
                  {item.tmstmp}
                </Popup>
              </Marker>
            ))}

          {reportCheck == 1 &&
            data.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [65, 65],
                  popupAnchor: [2, -20],
                  iconUrl: redIcon,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  Bus Id: {item.vid} Speed: {item.speed} MPH {<br></br>} Time:{" "}
                  {item.tmstmp}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <div>
        <div style={{ marginTop: 20 }}>
          <h2>Search/Report</h2>
          <p>
            You may put route first and enter Start button to view the Buses on
            that route (for e.g 20).
            <br></br>
            For additional information about the Buses, click on the Marker on
            the Map.
            <br></br>
            Then you may enter the Speed and click Report button to view the
            Buses exceeding that Speed.
          </p>
        </div>
        <div style={{ display: "flex", width: "50%", flexDirection: "row" }}>
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
          <Button onClick={startPressed}>Start</Button>
          <Button onClick={stopPressed}>Stop</Button>
          <Button onClick={reportPressed}>Report</Button>
        </div>
        {data.length > 0 && reportCheck === 1 && (
          <div className="text-center mt-5 mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
              Route {curRoute} number of buses exceeding speed greater than
              equal to {curSpeed} are {busCount}
            </label>
          </div>
        )}
        {data.length <= 0 && startCheck === 1 && (
          <div className="text-center mt-5 mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
              There are no Buses on Route:{curRoute}
            </label>
          </div>
        )}
        {data.length > 0 && startCheck === 1 && (
          <div className="text-center mt-5 mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
              Route {curRoute} number of buses on this route are {busCount}
            </label>
          </div>
        )}
        {data.length <= 0 && reportCheck === 1 && (
          <div className="text-center mt-5 mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
              There are no Buses on Route:{curRoute}
            </label>
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <h2>Bus Data</h2>
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Bus</b>
                </TableCell>
                <TableCell align="right">
                  <b>Route: {curRoute}</b>
                </TableCell>
                <TableCell align="right">
                  <b>Latitude</b>
                </TableCell>
                <TableCell align="right">
                  <b>Longitude</b>
                </TableCell>
                <TableCell align="right">
                  <b>Speed</b>
                </TableCell>
                <TableCell align="right">
                  <b>Dist</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.vid}
                  </TableCell>
                  <TableCell align="right">{item.rt}</TableCell>
                  <TableCell align="right">{item.lat}</TableCell>
                  <TableCell align="right">{item.lon}</TableCell>
                  <TableCell align="right">{item.speed}</TableCell>
                  <TableCell align="right">{item.pdist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default Homepage;
