import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

import MapQuest from "./components/MapQuest";
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

function App() {
  const classes = useStyles();
  const [speed, setSpeed] = useState("");
  const [route, setRoute] = useState("");
  const [busCount, setBusCount] = useState("");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const startPressed = async () => {
    const response = await axios.get(
      `http://localhost:4000/vehicles/get-vehicles/${route}`
    );
    console.log(response.data);
    setData(response.data);
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
      Hello World!!
      <div>
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
                  Bus Id: {item.vid} Speed: {item.speed} MPH
                </Popup>
              </Marker>
            ))}

          {reportCheck == 1 &&
            data.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [45, 45],
                  popupAnchor: [2, -20],
                  iconUrl: redIcon,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  Bus Id: {item.vid} Speed: {item.speed} MPH
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <div>
        <div
          className="mt-5"
          style={{ display: "flex", width: "50%", flexDirection: "row" }}
        >
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
              Route {route} number of buses exceeding speed greater than equal
              to {speed} are {busCount}
            </label>
          </div>
        )}
        {data.length <= 0 && reportCheck === 1 && (
          <div className="text-center mt-5 mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
              There are no Buses on Route:{route}
            </label>
          </div>
        )}
        <h1>BUS DATA</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Bus</TableCell>
                <TableCell align="right">Route</TableCell>
                <TableCell align="right">Latitude</TableCell>
                <TableCell align="right">Longitude</TableCell>
                <TableCell align="right">Speed</TableCell>
                <TableCell align="right">Dist</TableCell>
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
}

export default App;
