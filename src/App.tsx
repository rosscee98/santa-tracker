import './App.css';
// import { findTimeUntilNextDestination } from './utils/findTimeUntilNextDestination';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { getDestinationInfo } from './utils/getDestinationInfo';
import { getLocationCoordinates } from './utils/getLocationCoordinates';
import { useEffect, useState } from 'react';

function App() {
  // const label = findTimeUntilNextDestination();
  // const { label, destinations } = await getDestinationInfo();
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  // const content = getLocationCoordinates("New York City");

  const [{ label, destinations }, setDestinationInfo] = useState({ label: "", destinations: [{ name: "", arrivalTime: new Date(), coordinates: [0, 0] as [number, number] }] });
  useEffect(() => {
    // const updateDestinationInfo = async () => {
    //   setDestinationInfo(await getDestinationInfo());
    // }
    const updateDestinationInfo = async () => {
      setDestinationInfo(await getDestinationInfo());
    }
    updateDestinationInfo();
  }, []);

  return (
    <div className="App">
      <p>{label}</p>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            geographies.map((geo) =>
              <Geography key={geo.rsmKey} geography={geo} fill="#bbe4f6" stroke="#FFF" strokeWidth={0.3} />
            )
          )}
        </Geographies>
        {/* {
          destinations.map(async ({ name }) => {
            const { latitude, longtitude } = await getLocationCoordinates(name);
            return (
              <Marker coordinates={[latitude, longtitude]}>
                <circle r={3} fill="#F53" />
                <text fontSize={8}>{name}</text>
              </Marker>
            )
          })
        } */}
        {destinations.map(({ name, coordinates }) => {
          return (
            <Marker coordinates={coordinates}>
              <circle r={3} fill="#F53" />
              <text fontSize={8}>{name}</text>
            </Marker>
          )
        })}
        {/* <Marker coordinates={[-74.006, 40.7128]}>
          <circle r={3} fill="#F53" />
          <text fontSize={8}>New York City</text>
        </Marker> */}
      </ComposableMap>
    </div>
  );
}

export default App;
