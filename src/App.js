import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import mydata from "./data.json";
import { scaleLinear } from "d3-scale";
import Legend from "./Legend";
import legendItems from "./LegendItems.js";
function App() {
  const legendItemsReverse = [...legendItems].reverse();
  const [maxValue, setMaxvalue] = useState(1000);
  const findmaxValue = () => {
    let x = 0;
    mydata.val.forEach((v) => {
      if (v.data > x) {
        x = v.data;
      }
    });
    setMaxvalue(x);
    console.log(x);
  };

  useEffect(() => {
    findmaxValue();
  }, []);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 25]),
    [maxValue]
  );

  const popScale1 = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 1]),
    [maxValue]
  );

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mydata.val.map((v) => (
          <CircleMarker
            key={v.id}
            center={[v.lat, v.lng]}
            radius={popScale(v.data)}
            color="#0c022b"
            fillColor="#0c022b"
            opacity={popScale1(v.data)}
            fillOpacity={popScale1(v.data)}
          >
            <Popup>
              <div>{v.region}</div>
              <br />
              <div>{v.data}</div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="col">Data usuage-in Gigabyte</div>
      <Legend legendItems={legendItemsReverse} />
    </div>
  );
}

export default App;
