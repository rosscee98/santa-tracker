import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import './App.css';
import { findTimeUntilNextDestination } from './utils/findTimeUntilNextDestination';
import locationsJson from './utils/locations.json';

function App() {
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  const label = findTimeUntilNextDestination();
  const locations = Object.entries(locationsJson);

  return (
    <div className="App">
      <p>{label}</p>
      <ComposableMap projection="geoMercator" width={1000}>
        <Geographies geography={geoUrl}>
          {
            ({ geographies }) => (
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#bbe4f6" stroke="#FFF" strokeWidth={0.3} />
              ))
            )
          }
        </Geographies>
        {
          locations.map(([name, { lat, lng }]) => (
            <Marker key={name} coordinates={[lng, lat]}>
              <circle r={3} fill="#F53" />
              <text fontSize={8}>{name}</text>
            </Marker>
          ))
        }
        <Line coordinates={locations.map((location) => [location[1].lng, location[1].lat])} stroke="#f00216" strokeWidth={0.7} />
      </ComposableMap>
    </div>
  );
}

export default App;
