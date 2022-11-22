import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import './App.css';
import { getLocationData } from './utils/getLocationData';

function App() {
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  const { locations, currentPosition, summary } = getLocationData();

  return (
    <div className="App">
      <p>{summary}</p>
      <ComposableMap projection="geoEqualEarth" width={1000}>
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
          locations.map(({ name, coords }) => (
            <Marker key={name} coordinates={coords}>
              <circle r={3} fill="#F53" />
              <text fontSize={8}>{name}</text>
            </Marker>
          ))
        }
        <Marker coordinates={currentPosition}>
          <circle r={4} fill="#000" />
          <text fontSize={10}>Santa</text>
        </Marker>
        <Line coordinates={locations.map(({ coords }) => coords)} stroke="#f00216" strokeWidth={0.7} />
      </ComposableMap>
    </div>
  );
}

export default App;
