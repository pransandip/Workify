import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  position: "absolute",
  width: "450px",
  height: "250px",
};
const containerStyle = {
  position: "absolute",
  width: "450px",
  height: "250px",
};

const MapContainer = (props) => {
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [mapStyles, setMapStyles] = useState({
    position: "absolute",
    width: "450px",
    height: "250px",
  });
  const [containerStyle, setContainerStyle] = useState({
    position: "absolute",
    width: "450px",
    height: "250px",
  });
  useEffect(
    () => {
      setLocation(props.selectedAddress);
      setMapStyles(props.selectedMapStyles);
      setContainerStyle(props.selectedContainerStyle);
    },
    [props.selectedAddress],
    [props.selectedMapStyles],
    [props.selectedContainerStyle]
  );
  //console.log(props.selectedAddress, props);
  return (
    <Map
      google={props.google}
      zoom={10}
      containerStyle={containerStyle}
      style={mapStyles}
      center={{
        lat: location ? parseFloat(location.latitude) : 47.444,
        lng: location ? parseFloat(location.longitude) : -122.176,
      }}
    >
      <Marker
        position={{
          lat: location ? parseFloat(location.latitude) : 47.444,
          lng: location ? parseFloat(location.longitude) : -122.176,
        }}
      />
    </Map>
  );
};

export default React.memo(
  GoogleApiWrapper({
    apiKey: "AIzaSyCvp1OcXRtcgYbd7WnzMh-SPGzFbLlFOts",
  })(MapContainer)
);
