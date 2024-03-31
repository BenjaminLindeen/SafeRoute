import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 44.9733,
  lng: -93.2277,
};

const CrimeMap = ({ data }) => {
  const [selectedCrime, setSelectedCrime] = useState(null);

  console.log("CrimeMap rendered with data:", data);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        {data.map((crime) => (
          <Marker
            key={`${crime.Latitude}-${crime.Longitude}`} // assuming this combination is unique
            position={{ lat: crime.Latitude, lng: crime.Longitude }}
            onClick={() => setSelectedCrime(crime)}
          />
        ))}

        {selectedCrime && (
          <InfoWindow
            position={{
              lat: selectedCrime.Latitude,
              lng: selectedCrime.Longitude,
            }}
            onCloseClick={() => setSelectedCrime(null)}
          >
            <div>
              <h2>Incident Location: {selectedCrime["Incident Location"]}</h2>
              <p>Severity Score: {selectedCrime["Total Severity Score"]}</p>
              <p>Crime Count: {selectedCrime["Crime Count"]}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default React.memo(CrimeMap, areEqual);
