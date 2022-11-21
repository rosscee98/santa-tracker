import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import './App.css';
import { findTimeUntilNextDestination } from './utils/findTimeUntilNextDestination';
import locations from './utils/locations.json';

function App() {
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const label = findTimeUntilNextDestination();

  return (
    <div className="App">
      <p>{label}</p>
      <ComposableMap>
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
          Object.entries(locations).map(([name, { lat, lng }]) => (
            <Marker key={name} coordinates={[lng, lat]}>
              <circle r={3} fill="#F53" />
              <text fontSize={8}>{name}</text>
            </Marker>
          ))
        }
      </ComposableMap>
    </div>
  );
}

export default App;
